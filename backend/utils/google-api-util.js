
import { CLIENT_ID, CLIENT_SECRET, google_access_token_gererate_uri, REDIRECT_URI_SUCC_SIGN_IN } from "../config.js";
import { google } from "googleapis";

import axios from "axios";


export const initializeOAuthClient = async (user_access_token, refresh_token, expiry_in) => {


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

    if (!access_token) {
        throw new Error('Token not found or invalid');
    }


    try {

        const expiry_date = expiry_in;

        // Set OAuth2 credentials
        oauth2Client.setCredentials({
            access_token: access_token,
            expiry_date: expiry_in,
            refresh_token: refresh_token,
            // expiry_date: token.expiry_date
        });


    } catch (error) {
        console.error('Error reading token:', err);
        throw new Error('Token not found or invalid');
    }



    return oauth2Client;
};


export const getAcessTokenFromRefreshToken = async (refresh_token) => {


    try {

        const response = await axios.post(google_access_token_gererate_uri, {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: refresh_token,
            grant_type: 'refresh_token',

        });

        return response;

    } catch (error) {
        throw error;
    }

}