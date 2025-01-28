

import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import User from '../models/User.js';
import schedule from 'node-schedule';
import PDFDocument from "pdfkit";
import { generateTimeReport } from './report/genReport.js';

import { defineDate, formateDate } from './report/utils.js';

import { getReportData } from './report/report-data.js';

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

        const isUserSubscribed = user.reportSubscriptionStatue;

        if (isUserSubscribed === false) return;


        const userName = user.username;
        const userSubscriptionEmail = user.reportSubscriptionEmail;
        const userEmail = user.email;

        const userReportBufferContent = await generateTimeReport(userEmail, userName);



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
    schedule.scheduleJob({ hour: 10, minute: 0 }, sendEmails);
}



// test email

const username = "Himanshu Nagar"; // make it soft code
const left_margin = 15;

export const testReport = async (req, res) => {

    const userEmail = req.user.email;


    const { firstDateOfWeek, lastDateOfWeek } = defineDate();

    const { updatedEventsList: reportData, totalRegisterTime } = await getReportData(userEmail, firstDateOfWeek, lastDateOfWeek);

    const formatedFirstWeekDate = formateDate(firstDateOfWeek);
    const formatedLasteWeekDate = formateDate(lastDateOfWeek);

    const weekStr = `( ${formatedFirstWeekDate} - ${formatedLasteWeekDate} )`;



    const doc = new PDFDocument({
        size: 'A4',       // Page size
        margins: {        // Custom margins
            top: 20,      // Top margin of 10px
            left: left_margin,     // Left margin
            right: 50,    // Right margin
            bottom: 50,   // Bottom margin
        },
    });



    // Set the response headers to indicate a PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="generated.pdf"'); // Use 'attachment' for download

    // Pipe the PDF to the response
    doc.pipe(res);



    doc.fontSize(45).fillColor('#1967c6').text('Weekly Time Report', { align: 'left' });

    doc.font('Helvetica').fontSize(16).fillColor('black').text(`Name - ${username}`, { align: 'left' });

    doc.fontSize(12).text(`Week - ${weekStr}`, { align: 'left' });

    doc.moveDown(0.5); 
    doc.fontSize(12).text(`Total time register :  ${totalRegisterTime}`, { align: 'left' });

    if (reportData.length === 0) {

        doc.moveDown(3); // Move down 6 lines
        doc.fontSize(14).fillColor('red').text("No data available for the selected week.", { align: 'left', margin: 20 });
        doc.end();

        return;
    }

    // const totalTimeRegister = reportData.reduce((acc, curr) => acc + curr.totalTimeSpend, 0);



    let isTableHeader = true;



    function drawCell(x, y, width, height, text) {
        // Set the background color and border color 
        if (isTableHeader) {
            doc.rect(x, y, width, height).fillAndStroke('#1967c6', '#b3b3b3').stroke(); // Set the text color and font 
            doc.fillColor('white').fontSize(12);
        }
        else {
            doc.rect(x, y, width, height).fillAndStroke('#FFFFFF', '#b3b3b3').stroke(); // Set the text color and font  
            doc.fillColor('black').fontSize(12);
        }


        // Calculate text width and height 
        const textWidth = doc.widthOfString(text);
        const textHeight = doc.heightOfString(text);
        // Calculate positions to center the text 
        const textX = x + (width - textWidth) / 2;
        const textY = y + (height - textHeight) / 2;

        // Draw the text 
        doc.text(text, textX, textY, { width: width - 10, height: height - 10 });
    }

    // Table headers 
    const tableTop = 150; const tableLeft = left_margin; const rowHeight = 20; const colWidth = 150;

    drawCell(tableLeft, tableTop, colWidth, rowHeight, 'Task Name');
    drawCell(tableLeft + colWidth, tableTop, colWidth, rowHeight, 'Per day time spent');
    drawCell(tableLeft + 2 * colWidth, tableTop, colWidth, rowHeight, 'Total time spent');

    // drew table header, now each cell bg color should be white
    isTableHeader = false;


    reportData.forEach((data, index) => {

        const i = index + 1;
        const eventName = data.eventName;
        const perDaySentTime = data.perDayTimeSpend;
        const totalTimeSpent = data.totalTimeSpend;


        const yPos = tableTop + (i) * rowHeight;
        drawCell(tableLeft, yPos, colWidth, rowHeight, eventName);
        drawCell(tableLeft + colWidth, yPos, colWidth, rowHeight, `${perDaySentTime}`);
        drawCell(tableLeft + 2 * colWidth, yPos, colWidth, rowHeight, `${totalTimeSpent}`);

    })

    doc.end();


}
