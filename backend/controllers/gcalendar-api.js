

import { google } from "googleapis";

const calendar = google.calendar("v3");

import { join } from 'path';
import { cwd } from 'process';
import User from "../models/User.js";

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI_SUCC_SIGN_IN } from "../config.js";


const CREDENTIALS_PATH = join(cwd(), 'credentials.json');


const initializeOAuthClient = async (user_access_token) => {


    const client_id = CLIENT_ID;
    const client_secret = CLIENT_SECRET;
    const succ_sign_in_url = REDIRECT_URI_SUCC_SIGN_IN;


    // Initialize OAuth2 client with the loaded credentials
    const oauth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        succ_sign_in_url
    );


    // Load token from tokens.json
    let access_token = user_access_token;

    if (!access_token) return false;


    try {

        // token = JSON.parse(await fs.readFile(TOKEN_PATH, 'utf-8'));

        // Set OAuth2 credentials
        oauth2Client.setCredentials({
            access_token: access_token,
            // refresh_token: refresh_token,
            // expiry_date: token.expiry_date
        });


    } catch (error) {
        console.error('Error reading token:', err);
        throw new Error('Token not found or invalid');
    }



    return oauth2Client;
};



// these is no need to create event for this application so you can eliminate this 
export const createEvent = async (req, res) => {


    // need to access token from the req here, (queury) 
    const auth = await initializeOAuthClient(req);
    if (!auth) {
        res.send("token doesn't exits or invalid");
    }


     
    const event = {

        "summary": "Google I/O 2015",
        "description": "A chance to hear more about Google's developer products.",
        "start": {
            "dateTime": "2024-10-21T17:00:00+05:30",
            "timeZone": "Asia/Kolkata"
        },
        "end": {
            "dateTime": "2024-10-21T18:00:00+05:30",
            "timeZone": "Asia/Kolkata"
        }
    }

    calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: event
    }, (error, event) => {

        if (error) {
            console.log(error);
            res.send("Failed to create event");
            return;
        }
        else {
            res.send("event created succussfully");
        }

    });

};


export const readEvents = async (req, res) => {


    // need to access token from the req here, (queury) 

    const auth = await initializeOAuthClient(req);

    if (!auth) {
        return res.send("token doesn't exits or invalid");
    }

    const calendar = google.calendar({ version: 'v3', auth });


    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Start of the day
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // End of the day

    const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: todayStart.toISOString(),
        timeMax: todayEnd.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    });

    const items = response.data.items;

    const userEvents = items.map((item) => {

        const title = item.summary;
        const start = item.start.dateTime;
        const end = item.end.dateTime;

        return {
            title: title,
            start: start,
            end: end
        }
    });


    const eventsArray = [];

    userEvents.forEach(event => {
        const startTime = new Date(event.start);
        const endTime = new Date(event.end);
        const duration = (endTime - startTime) / 1000 / 60; // duration in minutes

        // Check if the title already exists in the eventsArray
        const existingEntry = eventsArray.find(entry => entry.title === event.title);

        if (existingEntry) {
            // If it exists, add the duration
            existingEntry.duration += duration;
        } else {
            // If it doesn't exist, create a new entry
            eventsArray.push({ title: event.title, duration });
        }

    });

    console.log(eventsArray);

    res.send(eventsArray);
}


export const dayCalendarData = async (req, res) => {


    const userEmail = req.user.email;

    // console.log(userEmail);

    const user = await User.findOne({ email: userEmail });
    const access_token = user.accessToken;



    // need to access token from the req here, (queury) 
    const auth = await initializeOAuthClient(access_token);

    // console.log(auth);
    if (!auth) {
        return res.json({ error: "google access token expired or something else" });
    }


    const calendar = google.calendar({ version: 'v3', auth });


    // set code for the requested date
    const date = req.query.date;


    const currDateStartTime = !date ? new Date() : new Date(date);
    currDateStartTime.setHours(0, 0, 0, 0);

    const currDateEndTime = !date ? new Date() : new Date(date);
    currDateEndTime.setHours(23, 59, 59, 999);



    const startDayTime = currDateStartTime; //  set it according to user
    const endDayTime = currDateEndTime; // set it according to user



    try {

        const response = await calendar.events.list({
            calendarId: 'primary', // you need to tell which calendar do you want to access, primary or secondary 
            timeMin: startDayTime.toISOString(),
            timeMax: endDayTime.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const items = response.data.items;

        const userEvents = items.map((item) => {

            const title = item.summary;
            const start = item.start.dateTime;
            const end = item.end.dateTime;

            return {
                title: title,
                start: start,
                end: end
            }
        });


        const eventsArray = [];

        userEvents.forEach(event => {
            const startTime = new Date(event.start);
            const endTime = new Date(event.end);
            const duration = (endTime - startTime) / 1000 / 60; // duration in minutes

            // Normalize the event title by trimming and converting it to lowercase
            const normalizedTitle = event.title.trim().toLowerCase();

            // Check if the title already exists in the eventsArray
            const existingEntry = eventsArray.find(entry => entry.title === normalizedTitle);

            if (existingEntry) {
                // If it exists, add the duration
                existingEntry.duration += duration;
            } else {
                // If it doesn't exist, create a new entry
                eventsArray.push({ title: normalizedTitle, duration });
            }


        });

        // console.log(user);

        return res.json({ userName: user.username, events: eventsArray });

    } catch (error) {
        console.log(error);
        console.log("access denied or perameter missing !");
    }


}

export const weekEventsData = (req, res) => {
    res.send("Here will be weekly data publish soon");
}


