import { neon } from "@neondatabase/serverless";

import dotenv from "dotenv";
import handleErrorWithoutApiCall from "../Errors/ErrorWithoutApiCall.js";
dotenv.config();


let neonSQL;

try {

    neonSQL = neon(process.env.NEON_DATABASE_URL);

} catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    error.message = "failed to connect with neon database";
    handleErrorWithoutApiCall(error);
}

export {neonSQL};

// table name is event,

// event_name, email_id, important, urgent