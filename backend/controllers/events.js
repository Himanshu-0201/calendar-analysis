import { neonSQL } from "../db/neon.js";


export const updateUserEventsDetails = async (req, res) => { 

    const userEmail = req.user.email;
    const eventsList = req.body.eventsList; // here only data come which updated;

    try {
 
        const query = "INSERT INTO events (email_id, event_name, important, urgent) VALUES ($1, $2, $3, $4) ON CONFLICT (email_id, event_name) DO UPDATE SET important = EXCLUDED.important, urgent = EXCLUDED.urgent";

        for(const event of eventsList){
            await neonSQL(query, [userEmail, event.event_name, event.isImportant, event.isUrgent]);
        }

        return res.status(200).json({ message: "all events details updated succussfully" });

    } catch (error) {
        throw new Error(error)
    }

};

