import { neon } from "@neondatabase/serverless";

import dotenv from "dotenv";
dotenv.config();


let neonSQL;

try {

    neonSQL = neon(process.env.NEON_DATABASE_URL);

} catch (error) {
    throw error;
}

export {neonSQL};

// table name is event,

// event_name, email_id, important, urgent