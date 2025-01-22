
import express from "express";
const route = express.Router();

import authToken from "../middleware/auth-middleware.js"
import { updateUserEventsDetails } from "../controllers/events.js";


route.post('/update-event-details', authToken, updateUserEventsDetails);


export default route;