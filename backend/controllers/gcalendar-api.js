

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
            const normalizedTitle = event.title.toLowerCase().replace(/\s+/g, ' ').trim();;

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


        return res.json({ userName: user.username, events: eventsArray });

    } catch (error) {
        console.log(error);
        console.log("access denied or perameter missing !");
    }


}

export const weekEventsData = (req, res) => {
    res.send("Here will be weekly data publish soon");
}


