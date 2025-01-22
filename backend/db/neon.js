import { neon } from "@neondatabase/serverless";

import dotenv from "dotenv";
dotenv.config();

export const neonSQL = neon(process.env.NEON_DATABASE_URL);


// table name is event,

// event_name, email_id, important, urgent