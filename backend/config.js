
import dotenv from "dotenv";
dotenv.config();


// export const HOST_PORT = 8000;
export const HOST_PORT = process.env.PORT;

// export const mongoDBUrl = "mongodb+srv://nagarhimanshu1802:P5T4HTsDucDHD3u1@cluster0.hw9ya.mongodb.net/"
export const mongoDBUrl = process.env.MONGO_DB_URL;



//  google auth credentials
export const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// redirect urls
export const  REDIRECT_URI_SUCC_SIGN_IN = "http://localhost:8000/succ-sign-in";
export const REDIRECT_URI_ROOT = "http://localhost:3000";
export const FAILED_AUTH = "http://localhost:3000/access-denied";

// not used so far
export const REDIRECT_URI_SUCC_SIGN_OUT="http://localhost:8000/succ-sign-out"
export const REDIRECT_URI_LOCAL='http://localhost'




// also place these uri in .env file
export const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/calendar'];