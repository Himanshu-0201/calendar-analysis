import PDFDocument from "pdfkit";

import { getReportData } from "./report-data.js";
import { defineDate, formateDate } from "./utils.js";




const username = "Himanshu Nagar";
const left_margin = 15;


export const generateTimeReport = async (useremail) => {


    const { firstDateOfWeek, lastDateOfWeek } = defineDate();

    const reportData = await getReportData(useremail, firstDateOfWeek, lastDateOfWeek);

    const formatedFirstWeekDate = formateDate(firstDateOfWeek);
    const formatedLasteWeekDate = formateDate(lastDateOfWeek);

    const weekStr = `( ${formatedFirstWeekDate} - ${formatedLasteWeekDate} )`;



    return new Promise((resolve, rejects) => {


        const doc = new PDFDocument({
            size: 'A4',       // Page size
            margins: {        // Custom margins
                top: 20,      // Top margin of 10px
                left: left_margin,     // Left margin
                right: 50,    // Right margin
                bottom: 50,   // Bottom margin
            },
        });

        const pdfBuffer = [];

        doc.on('data', (chunk) => pdfBuffer.push(chunk)); // Collect PDF data

        doc.on('end', () => {
            const finalPDFBufferContent = Buffer.concat(pdfBuffer); // Concatenate the buffer
            resolve(finalPDFBufferContent)// Return the final PDF buffer (works in an async function)
        })


        doc.fontSize(45).fillColor('#1967c6').text('Weekly Time Report', { align: 'left' });

        doc.font('Helvetica').fontSize(16).fillColor('black').text(`Name - ${username}`, { align: 'left' });

        doc.fontSize(12).text(`Week - ${weekStr}`, { align: 'left' });

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
    });


};

