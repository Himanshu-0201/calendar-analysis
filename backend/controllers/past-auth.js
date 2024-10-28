
import { google } from 'googleapis';

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../models/User.js';
import { CLIENT_ID, CLIENT_SECRET, FAILED_AUTH, REDIRECT_URI_ROOT, REDIRECT_URI_SUCC_SIGN_IN } from '../config.js';
dotenv.config();






export const succussfullySignIn = async (req, res) => {
    


    const  YOUR_CLIENT_ID = CLIENT_ID;
    const YOUR_CLIENT_SECRET = CLIENT_SECRET;

    const YOUR_REDIRECT_URL = REDIRECT_URI_SUCC_SIGN_IN;


    const oauth2Client = new google.auth.OAuth2(
        YOUR_CLIENT_ID,
        YOUR_CLIENT_SECRET,
        YOUR_REDIRECT_URL
    );


    const { code } = req.query;



    if (!code) {
        return res.redirect(FAILED_AUTH);
    }


    try {

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);


        // Use the access token to get user information
        const userInfoResponse = await oauth2Client.request({
            url: 'https://www.googleapis.com/oauth2/v3/userinfo',
            headers: {
                Authorization: `Bearer ${tokens.access_token}`
            }
        });

        // User info
        const userInfo = userInfoResponse.data;
        const userEmail = userInfo.email;
        const userName = userInfo.name;

        const access_token = tokens.access_token;
        const refresh_token = tokens.refresh_token || "himanshu";



        try {

            let user = await User.findOne({ email : userEmail });

            if (!user) {

                user = new User({
                    username: userName,
                    email: userEmail,
                    accessToken: access_token,
                    refreshToken: refresh_token
                })

                const respons = await user.save();

            }
            else {

                const updatedUser = await User.findOneAndUpdate({ email : userEmail },
                    {
                        $set: {
                            accessToken: access_token,
                            refreshToken: refresh_token
                        }
                    },
                    { new: true }
                );


            }

        } catch (error) {
            console.log(error);
        }


        try {
            // Generate JWT token
            const jwtToken = jwt.sign(
                { email: userEmail }, // // Payload
                process.env.JWT_SECRET, // Secret key
                { expiresIn: '1h' } // Token expiration
            );


            res.cookie('token', jwtToken, {
                httpOnly: true, // Makes cookie inaccessible via JavaScript
                // secure: process.env.NODE_ENV === 'production', // Secure flag for HTTPS
                maxAge: 60 * 60 * 1000 // 1 hour expiry
            });

            const redirectUrl = REDIRECT_URI_ROOT;
            res.redirect(redirectUrl);


        } catch (error) {
            console.log("problem to crate jwt token");
        }

    } catch (error) {
        console.error('Error retrieving user info:', error);
        res.status(500).send('Error retrieving user info');
    }


}
