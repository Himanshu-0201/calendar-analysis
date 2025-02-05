import { google } from "googleapis";
import User from "../models/User.js";
import { isTimeStringUTC, findMinTime, findMaxTime } from "../utils/time-util.js";
import { initializeOAuthClient, isAccessTokenExpire } from "../utils/google-api-util.js";
import { getAcessTokenFromRefreshToken } from "../utils/google-api-util.js";
import { neonSQL } from "../db/neon.js";

import { normalizedTitleFunction } from "../utils/general-utils.js";


const fetchDataFromGoogleCalendar = async (auth, start, end) => {


    if (!auth) {
        const error = new Error("google access token expired or something else");
        error.statusCode = 403;
        throw error;
    }


    const calendar = google.calendar({ version: 'v3', auth });

    const startTime = new Date(start);
    const endTime = new Date(end);

    try {

        const fields = 'items(summary,start,end)';
        const response = await calendar.events.list({
            calendarId: 'primary', // you need to tell which calendar do you want to access, primary or secondary 
            timeMin: startTime.toISOString(),
            timeMax: endTime.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
            timeZone: 'UTC',
            fields
        });

        const items = response.data.items;
        // console.log(items);

        return items;

    } catch (err) {

        const error = new Error("failed to fetch data from google calendar");
        error.statusCode = 403;
        throw error
    }


};

const processDataWithNeon = async (items, userEmail, start, end) => {

    const startTime = new Date(start);
    const endTime = new Date(end);

    try {

        const userEvents = await Promise.all(items.map(async (item) => {

            let title = item.summary;
            const start = item.start.dateTime;
            const end = item.end.dateTime;
            let isImportant = true;
            let isUrgent = false;

            const query = 'SELECT important, urgent FROM EVENTS WHERE email_id = $1 and event_name = $2';

            if (!title) {
                title = "No title";
            }


            const params = [userEmail, normalizedTitleFunction(title)];


            // Parallelize the database call to reduce the api call timing.
            const neonPromise = neonSQL(query, params).then(response => {
                if (response && response.length > 0) {
                    const { important: IsEventImportant, urgent: IsEventUrgent } = response[0];
                    isImportant = IsEventImportant;
                    isUrgent = IsEventUrgent;
                }
            });

            // Wait for the result from neonSQL after finishing the mapping
            await neonPromise;


            const updatedEventStartTime = findMaxTime(startTime, start);
            const updatedEventEndTime = findMinTime(endTime, end);


            return {
                title: title,
                start: updatedEventStartTime,
                end: updatedEventEndTime,
                isImportant: isImportant,
                isUrgent: isUrgent
            };

        }));

        return userEvents;

    } catch (err) {

        const error = new Error("failed to process data with neon");
        error.statusCode = 403;
        throw error;
    }


};


export const dayCalendarData = async (req, res, next) => {


    const userEmail = req.user.email;


    try {

        const user = await User.findOne({ email: userEmail });
        let access_token = user.accessToken;
        const refresh_token = user.refreshToken;
        const expiry_date = user.expireDate;
        const reportSubscriptionEmail = user.reportSubscriptionEmail;
        const reportSubscriptionStatue = user.reportSubscriptionStatue;


        let auth = await initializeOAuthClient(access_token, refresh_token, expiry_date);


        if (isAccessTokenExpire(expiry_date) === true) {

            const response = await getAcessTokenFromRefreshToken(refresh_token);
            const new_access_token = response.data.access_token;
            access_token = new_access_token;
            const curr_time = Date.now();
            const expiresIn = response.data.expires_in;
            const new_expire_date = curr_time + expiresIn;
            const updatedUser = await User.updateMany({ email: userEmail }, { $set: { accessToken: new_access_token, expireDate: new_expire_date } });


            auth.setCredentials({
                access_token: new_access_token,
                refresh_token: refresh_token,
                expiry_date: new_expire_date,
            });


        }



        const start = req.query.start;
        const end = req.query.end;

        if (!end || !start) {
            const error = new Error("start or end are missing");
            error.status = 400;
            throw error;
        }

        if (isTimeStringUTC(start) === false || isTimeStringUTC(end) === false) {
            const error = new Error("start or end time zone is not in UTC formate");
            error.status = 422;
            throw error;
        }

        console.log("start ", new Date());
        const items = await fetchDataFromGoogleCalendar(auth, start, end);
        console.log("goole ", new Date());
        const processedEvents = await processDataWithNeon(items, userEmail, start, end);
        console.log("nean ", new Date());


        return res.json({ userName: user.username, userEmail, reportSubscriptionEmail, events: processedEvents, reportSubscriptionStatue });

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


