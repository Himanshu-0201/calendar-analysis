
import { signInFun, signOutFun } from "../controllers/auth.js";

import express from "express";
import { succussfullySignIn } from "../controllers/past-auth.js";

const route = express.Router();

route.get('/auth/sign-in', signInFun);
route.post('/auth/sign-out', signOutFun);

route.get('/succ-sign-in', succussfullySignIn);


export default route;