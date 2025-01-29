import dotenv from "dotenv";
import { admin_email } from "../config.js";
import nodemailer from 'nodemailer';

dotenv.config();



export const errorMail = (errorMessage) => {

    const sender_email = process.env.EMAIL_ADDRESS;
    const app_pass = process.env.APP_PASSWORD;

    const transporter = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: sender_email,
                pass: app_pass
            }
        }
    );



    const mailOptions = {
        from: sender_email,
        to: admin_email,
        subject: 'Error in Google Calendar Analysis',
        text: `Hi, There is an error in the Google Calendar Analysis server. Error message is : ${errorMessage}`,

    }

    transporter.sendMail(mailOptions, (err, info) => {

        if (err) {
            const error = new Error(err);
            throw error;
        }
        else {
            // console.log('Email sent: ' + info.response);
            if (res) {
                return res.status(200).json({ message: 'Email sent: ' + info.response });
            }
            else {
                return "mail sent to everyone";
            }
        }
    })

}