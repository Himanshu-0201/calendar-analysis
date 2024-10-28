
import express from "express";

import { dayCalendarData, } from "../controllers/gcalendar-api.js";
import authToken from "../middleware/auth-middleware.js";


const route = express.Router();

route.get('/get-day-events', authToken , dayCalendarData); // use can change end points later



export default route;