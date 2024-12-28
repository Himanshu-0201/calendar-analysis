
import express from "express";
const route = express.Router();

import {EmailSendController} from "../controllers/email.js";


route.get('/email-send', EmailSendController);


export default route;