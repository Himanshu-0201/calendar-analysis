
import { google } from 'googleapis';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI_SUCC_SIGN_IN, scopes } from '../config.js';




export const signInFun = async (req, res) => {


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

    } catch (error) {

        // handle error
        console.log("failed to create clinet");
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

        });

    } catch (error) {
        console.log("failed to create URL");

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




// below function is used to revoke google token

// export const signOutFun = async (req, res) => {

//     const token = req.session.access_token;

//     if (!token) {
//         return res.send("Invalid token");
//     }

//     try {


//         const credentials = await getCredentials();

//         const YOUR_CLIENT_ID = credentials.client_id;
//         const YOUR_CLIENT_SECRET = credentials.client_secret;
//         const YOUR_REDIRECT_URL = "http://localhost:3000/succ-sign-out"; // Updated URI

//         const oauth2Client = new google.auth.OAuth2(
//             YOUR_CLIENT_ID,
//             YOUR_CLIENT_SECRET,
//             YOUR_REDIRECT_URL
//         );

//         const token = req.session.access_token;

//         // Revoke the access token
//         await oauth2Client.revokeToken(token);

//         // Clear the session data (important for signing out)
//         req.session.destroy((err) => {
//             if (err) {
//                 console.error("Error clearing session: ", err);
//                 return res.status(500).send("Sign-out failed.");
//             }

//             // Redirect to a sign-out success page or home page
//             res.redirect('/succ-sign-out');
//         });


//     } catch (error) {

//         console.log(error);

//     }

// }