import express from 'express';
import { appendXML } from 'pdfkit';
const route = express.Router();

app.get('/favicon.ico', (req, res) => res.status(204).json({ message: "No favicon, error handled by express js" }));

export default route;