import express from "express";
const route = express.Router();

import authToken from "../middleware/auth-middleware.js";

import { updateReportEmail, updateReportSubscription } from "../controllers/user.js";


route.patch('/update-report-email-address', authToken, updateReportEmail);

route.patch('/update-report-subsciption', authToken, updateReportSubscription);


export default route;