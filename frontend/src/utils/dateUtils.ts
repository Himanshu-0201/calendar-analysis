
import { UserEvent } from "../models/utilsModels.ts";

export const splitTimeTillCurrentTime = (userEvents: UserEvent[]) : UserEvent[]=> {

    let updatedUserEvents : UserEvent[] = [];
    const currTime = new Date();

    userEvents.forEach(event => {

        const endTime = new Date(event.end);
        const startTime = new Date(event.start);

        const end = new Date(Math.min(endTime.getTime(), currTime.getTime())).toISOString();
        const start = new Date(Math.min(startTime.getTime(), currTime.getTime())).toISOString();

        if (start != end) {
            updatedUserEvents.push({
                ...event,
                start,
                end
            })
        }

    });

    return updatedUserEvents;

}