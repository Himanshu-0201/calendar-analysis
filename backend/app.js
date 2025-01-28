import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';

import gCalendarRoute from './routes/gcalendar-api.js';
import authRoute from "./routes/auth-route.js";
import userRoute from "./routes/user-route.js";
import eventsRoute from "./routes/events-route.js";
import testApi from "./routes/test-api.js";

import session from 'express-session';
import cookieParser from 'cookie-parser';

import { HOST_PORT, mongoDBUrl, allowedOrigins} from './config.js';
import handleError from './Errors/Error.js';

import { emailScheduler } from './services/emailScheduler.js';

const app = express();

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
  methods: "GET,POST,DELETE,PUT,PATCH",
  credentials: true,
  exposedHeaders: 'Content-Disposition'
}));


// cookies parse
app.use(cookieParser());


// Middleware to parse JSON request bodies
app.use(express.json())

app.use(testApi);
app.use(authRoute);
app.use(gCalendarRoute);
app.use(eventsRoute);
app.use(userRoute);

// handle error for cors
app.use(handleError);


const port = HOST_PORT;


mongoose.connect(mongoDBUrl)
  .then(() => {

    // comment below code  in prod or run locally through versel

    app.listen(port, () => {
      emailScheduler();
      console.log("server has activate st port : " + port);
      console.log("emails seduled");
    });

  })
  .catch(error => {
    const mongoError = new Error("unable to connect server to the mongoDB");
    mongoError.status = 500;
    mongoError.details = error; 
    handleError(mongoError, null, null, null);

  });


// export default app;