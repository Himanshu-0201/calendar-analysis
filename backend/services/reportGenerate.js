
import PDFDocument from "pdfkit";
import fs from "fs";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { rejects } from "assert";
dotenv.config();


export const report = async () => {

    return new Promise((resolve, rejects) => {

        const doc = new PDFDocument();
        const pdfBuffer = [];

        doc.on('data', (chunk) => pdfBuffer.push(chunk)); // Collect PDF data

        doc.on('end', () => {
            const finalPDFBufferContent = Buffer.concat(pdfBuffer); // Concatenate the buffer
            resolve(finalPDFBufferContent)// Return the final PDF buffer (works in an async function)
        })


        doc.fontSize(25).text('This is the PDF attached to your email.', 100, 100);
        doc.rect(100, 150, 200, 100)  // x, y, width, height
            .fill('green')  // Fill color
        // Draw a circle
        doc.circle(300, 300, 50)  // x, y, radius
            .fill('red');  // Fill color

        // Draw a line
        doc.moveTo(100, 500)  // Start point
            .lineTo(500, 500)  // End point
            .stroke();  // Draw the line 

        doc.end();
    })
}