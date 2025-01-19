

import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import User from '../models/User.js';
import schedule from 'node-schedule';
import { generateTimeReport } from './report/genReport.js';

dotenv.config();


export const sendEmails = async (req, res) => {


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

    // const userReportBufferContent = await report();

    const users = await User.find({});



    users.forEach(async (user) => {

        const isUserSubscribed = user.reportSubscription;

        if (isUserSubscribed === false) return;

        
        const userName = user.username;
        const userSubscriptionEmail = user.reportSubscriptionEmail;
        const userEmail = user.email;

        const userReportBufferContent = await generateTimeReport(userEmail);



        const mailOptions = {
            from: sender_email,
            to: userSubscriptionEmail,
            subject: 'Weekly Report of Google Calendar Analysis ',
            text: `Hi ${userName}, Please find your weekly report attached.`,
            attachments: [
                {
                    filename: "weekly_report.pdf", // Name of the file in the
                    content: userReportBufferContent,  // The file content as a buffer
                },
            ],
        }

        console.log("email sent");

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

    })


}



export const emailScheduler = async () => {
    schedule.scheduleJob({ dayOfWeek: 0, hour: 10, minute: 0 }, sendEmails);
}
