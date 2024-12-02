import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';

import gCalendarRoute from './routes/gcalendar-api.js';
import authRoute from "./routes/auth-route.js";
import testRoute from "./routes/test-route.js";

import session from 'express-session';
import cookieParser from 'cookie-parser';

import { HOST_PORT, mongoDBUrl } from './config.js';

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
      callback(new Error("Not allowed by CORS"));
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

// 



app.use(testRoute);
// app.use(authRoute);
// app.use(gCalendarRoute);
setInterval(() => {


  const now = new Date();

  // Format the time components
  const hours = now.getHours(); // Local hours (0-23)
  const minutes = now.getMinutes(); // Local minutes (0-59)
  const seconds = now.getSeconds(); // Local seconds (0-59)

  // Format the time into a readable string
  const localTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;


  console.log("Time is ", localTime);

}, 5000)


const port = HOST_PORT;


mongoose.connect(mongoDBUrl)
  .then(() => {
    app.listen(port, () => {
      console.log("server has activate st port : " + port);
    });
  })
  .catch(error => {
    console.log(error);
    console.log("unable to connect mongoDB server")
  });
