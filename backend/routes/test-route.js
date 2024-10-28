

import express from "express";
import { testServer, testSingIn } from "../controllers/test.js";
import { Test } from "../controllers/test.js";
import  authToken  from "../middleware/auth-middleware.js"

const route = express.Router();




route.get('/', testServer);

route.get('/test', authToken , Test);

route.get("/test/sign-in", testSingIn);


export default route;