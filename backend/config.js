
import dotenv from "dotenv";
dotenv.config();


// export const HOST_PORT = 8000;
export const HOST_PORT = process.env.PORT;

export const mongoDBUrl = process.env.MONGO_DB_URL;



//  google auth credentials
export const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// redirect urls

const BACKEND_URL = process.env.BACKEND_REDIRECT_URL;
const FRONTEND_URL = process.env.FRONTEND_REDIRECT_URL;

// export const  REDIRECT_URI_SUCC_SIGN_IN = "http://localhost:8000/succ-sign-in";
export const REDIRECT_URI_SUCC_SIGN_IN = `${BACKEND_URL}/succ-sign-in`;

// export const REDIRECT_URI_ROOT = "http://localhost:3000";
export const REDIRECT_URI_ROOT = FRONTEND_URL;


// export const FAILED_AUTH = "http://localhost:3000/access-denied";
export const FAILED_AUTH = `${FRONTEND_URL}/access-denied`;


// not used so far
// export const REDIRECT_URI_SUCC_SIGN_OUT="http://localhost:8000/succ-sign-out"

export const REDIRECT_URI_SUCC_SIGN_OUT = `${BACKEND_URL}/succ-sign-out`;

export const REDIRECT_URI_LOCAL = 'http://localhost'




// also place these uri in .env file
export const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/calendar'];


export const allowedOrigins = [
    "http://localhost:3000",
    "https://google-calendar-analysis.onrender.com",
    "https://google-calendar-analysis.vercel.app"
];

// to generate access token

export const google_access_token_gererate_uri = "https://oauth2.googleapis.com/token";



// admin email

export const admin_email = process.env.EMAIL_ADDRESS;