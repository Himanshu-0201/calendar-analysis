
import { google } from 'googleapis';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI_SUCC_SIGN_IN, scopes } from '../config.js';




export const signInFun = async (req, res, next) => {


    const YOUR_CLIENT_ID = CLIENT_ID;
    const YOUR_CLIENT_SECRET = CLIENT_SECRET;
    const YOUR_REDIRECT_URL = REDIRECT_URI_SUCC_SIGN_IN;


    let oauth2Client;

    try {

        oauth2Client = new google.auth.OAuth2(
            YOUR_CLIENT_ID,
            YOUR_CLIENT_SECRET,
            YOUR_REDIRECT_URL
        );

    } catch (err) {

        const error = new Error(err);
        error.message = "invaild query parameter";
        error.status = 403;
        return next(error);

    }


    let authorizationUrl
    try {

        // Generate a url that asks permissions for the Drive activity scope
        authorizationUrl = oauth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'offline',
            /** Pass in the scopes array defined above.
              * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
            scope: scopes,
            // Enable incremental authorization. Recommended as a best practice.
            include_granted_scopes: true,
            prompt: 'consent', // Forces the consent screen to show

        });

    } catch (err) {
        const error = new Error(err);
        error.message = "invaild query parameter";
        error.status = 403;
        return next(error);
    }



    res.redirect(authorizationUrl);
}



// below function is the reovke jwt token for user


export const signOutFun = (req, res) => {


    res.clearCookie('token', {
        path: '/',                       // Explicitly match root path
        httpOnly: true,                  // Matches `httpOnly` setting
        // secure: process.env.NODE_ENV === 'production', // Match secure flag in production
    });

    res.status(200).send({ message: 'Successfully signed out.' });
}

