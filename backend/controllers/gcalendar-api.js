

import { google } from "googleapis";

const calendar = google.calendar("v3");

import { join } from 'path';
import { cwd } from 'process';
import User from "../models/User.js";

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI_SUCC_SIGN_IN } from "../config.js";
import { isTimeStringUTC } from "../utils/TimeUtil.js";


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




export const dayCalendarData = async (req, res, next) => {


    const userEmail = req.user.email;


    try {

        const user = await User.findOne({ email: userEmail });
        const access_token = user.accessToken;

        const auth = await initializeOAuthClient(access_token);

        if (!auth) {
            const error = new Error("google access token expired or something else");
            error.statusCode = 403;
            throw error;
        }


        const calendar = google.calendar({ version: 'v3', auth });

        const start = req.query.start;
        const end = req.query.end;

        if(!end || !start){
            const error = new Error("start or end are missing");
            error.status = 400;
            throw error;
        }

        if(isTimeStringUTC(start) === false || isTimeStringUTC(end) === false){
            const error = new Error("start or end time zone is not in UTC formate");
            error.status = 422;
            throw error;
        }


        const startTime = new Date(start);
        const endTime = new Date(end);


        try {

            const response = await calendar.events.list({
                calendarId: 'primary', // you need to tell which calendar do you want to access, primary or secondary 
                timeMin: startTime.toISOString(),
                timeMax: endTime.toISOString(),
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


            return res.json({ userName: user.username, events: userEvents });

        } catch (err) {
            const error = new Error(err);
            error.statusCode = 403;
            throw error;
        }


    } catch (error) {
        next(error);
    }

}

export const weekEventsCalendarData = async (req, res, next) => {

    const userEmail = "nagar.himanshu.1802@gmail.com";  // extract it by request


    try {


        const user = await User.findOne({ email: userEmail });
        const access_token = user.accessToken;


        const auth = await initializeOAuthClient(access_token);

        if (!auth) {
            const error = new Error("google access token expired or something else");
            error.statusCode = 403;
            throw error;
        }


        const date = new Date() // extract it from the request

        const dayOfWeek = date.getDay();

        const startWeekDay = new Date(date);
        startWeekDay.setDate(startWeekDay.getDate() - dayOfWeek + 1);

        const endWeekDay = new Date(date);
        endWeekDay.setDate(startWeekDay.getDate() + 6);

        const startWeekTime = startWeekDay;
        startWeekTime.setHours(0, 0, 0, 0);

        const endWeekTime = endWeekDay;
        endWeekTime.setHours(23, 59, 59, 999);


        const calendar = google.calendar({ version: 'v3', auth });


        try {

            const response = await calendar.events.list({
                calendarId: 'primary', // you need to tell which calendar do you want to access, primary or secondary 
                timeMin: startWeekTime.toISOString(),
                timeMax: endWeekTime.toISOString(),
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

            return res.json({ userName: user.username, events: userEvents });


        } catch (err) {
            const error = new Error(err);
            error.statusCode = 403;
            throw error;
        }

    } catch (error) {
        next(error);
    }
    
}


