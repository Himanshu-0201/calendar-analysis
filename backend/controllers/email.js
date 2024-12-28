

import nodemailer from 'nodemailer';

import dotenv from "dotenv";
dotenv.config();

export const EmailSendController = (req, res) => {


    const user_email = process.env.EMAIL_ADDRESS;
    const app_pass = process.env.APP_PASSWORD;

    console.log(user_email);
    console.log(app_pass);

    const transporter = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: user_email,
                pass: app_pass
            }
        }
    );


    const mailOptions = {
        from: user_email,
        to: 'writetomailhimanshu@gmail.com',
        subject: 'Used Tablet accoun',
        text: 'That was easy!'
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
}