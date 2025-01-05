

import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import User from '../models/User.js';
import schedule from 'node-schedule';
dotenv.config();


const sendEmails = async () => {

    const entries = await User.find();

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


    entries.forEach(async (entry) => {

        const user_email = entry.email;

        const mailOptions = {
            from: sender_email,
            to: user_email,
            subject: 'Weekly Report of Google Calendar Analysis',
            text: "This email is sent to you  for the testing purpose, If you received this email Kindly reply to the same mail which is used to sent this email, Thanks"
        }

        transporter.sendMail(mailOptions, (err, info) => {

            if (err) {
                const error = new Error(err);
                throw error;
            }
            else {
                // console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: 'Email sent: ' + info.response });
            }
        })

    });

}



export const emailScheduler = async () => {
    schedule.scheduleJob({ dayOfWeek: 0, hour: 10, minute: 0 }, sendEmails);
}
