import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';

import gCalendarRoute from './routes/gcalendar-api.js';
import authRoute from "./routes/auth-route.js";
import testRoute from "./routes/test-route.js";

import session from 'express-session';
import cookieParser from 'cookie-parser';

import { HOST_PORT, mongoDBUrl } from './config.js';
import handleError from './Errors/Error.js';

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://google-calendar-analysis.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {

    if (allowedOrigins.includes(origin) || !origin) {
      // Allow the request if the origin is in the allowedOrigins array or if there's no origin (for non-browser requests)
      callback(null, true);
    } else {
      // Reject the request if the origin is not allowed
      const error = new Error("You are not allowed to access this server");
      error.status = 403;
      callback(error);
    }
  },
  methods: "GET,POST,DELETE,PUT",
  credentials: true,
  exposedHeaders: 'Content-Disposition'
}));


// cookies parse
app.use(cookieParser());

// Session middleware setup
app.use(session({
  secret: 'your-secret-key',  // Replace with a strong, secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }   // Set 'secure: true' in production when using HTTPS
}));




app.use(testRoute);
app.use(authRoute);
app.use(gCalendarRoute);

// handle error for cors
app.use(handleError);


const port = HOST_PORT;


mongoose.connect(mongoDBUrl)
  .then(() => {
    app.listen(port, () => {
      console.log("server has activate st port : " + port);
    });
  })
  .catch(error => {
    // console.log(error);
    // console.log("unable to connect mongoDB server")

    const mongoError = new Error("unable to connect server to the mongoDB");
    mongoError.status = 500;
    mongoError.details = error; 
    handleError(mongoError, null, null, null);

  });
