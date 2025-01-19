

import express from "express";
import { testServer, testSingIn } from "../controllers/test.js";
import { Test } from "../controllers/test.js";
import authToken from "../middleware/auth-middleware.js"
import { sendEmails } from "../services/emailScheduler.js";

const route = express.Router();




route.get('/', testServer);

route.get('/gen-pdf', sendEmails);

route.get("/test/sign-in", testSingIn);



export default route;