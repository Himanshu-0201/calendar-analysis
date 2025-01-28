import express from "express";
import { sendEmails, testReport } from "../services/emailScheduler.js";
import authToken from "../middleware/auth-middleware.js";
const route = express.Router();






route.get('/test-api', authToken, testReport);

route.get('/test-email', sendEmails);

export default route;