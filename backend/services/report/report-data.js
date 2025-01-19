import { initializeOAuthClient } from "../../utils/google-api-util.js";
import User from "../../models/User.js";
import { google } from "googleapis";

import { getAcessTokenFromRefreshToken } from "../../utils/google-api-util.js";
import { isTimeStringUTC } from "../../utils/time-util.js";
import { updateEventsList } from "./utils.js";




const getDataFromGoogleApi = async (userEmail, start, end) => {


    try {

        const user = await User.findOne({ email: userEmail });
        let access_token = user.accessToken;
        const refresh_token = user.refreshToken;
        const expiry_date = user.expireDate;

        let auth = await initializeOAuthClient(access_token, refresh_token, expiry_date);


        // when access token expire, it generate new token and save it in the data base

        if (auth.isTokenExpiring() === true) {

            const response = await getAcessTokenFromRefreshToken(refresh_token);
            const new_access_token = response.data.access_token;
            access_token = new_access_token;
            const curr_time = Date.now();
            const expiresIn = response.data.expires_in;
            const new_expire_date = curr_time + expiresIn;
            const updatedUser = await User.updateMany({ email: userEmail }, { $set: { accessToken: new_access_token, expireDate: new_expire_date } });

            auth = await initializeOAuthClient(new_access_token, refresh_token, new_expire_date);

        }

        if (!auth) {
            const error = new Error("google access token expired or something else");
            error.statusCode = 403;
            throw error;
        }

        const calendar = google.calendar({ version: 'v3', auth });


        if (isTimeStringUTC(start) === false || isTimeStringUTC(end) === false) {
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


            return userEvents;



        } catch (err) {

            console.log(err);
            const error = new Error(err);
            error.statusCode = 403;
            throw error;
        }


    } catch (error) {


        throw error;

    }

}


export const getReportData = async (userEmail, start, end)=>{

    const eventsList = await getDataFromGoogleApi(userEmail, start, end);
    const updatedEventsList = updateEventsList(eventsList);

    return updatedEventsList;
}