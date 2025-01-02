import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { events } from '../../data/eventsData.ts';

import { UserEvent } from '../../models/UserEventsModels.ts';

interface WeekEventsState {
    events: UserEvent[];
    currDate: string;
}

const currDate = new Date();

const initialState: WeekEventsState = {
    events: events,
    currDate: currDate.toISOString(),
};

export const weekEventsSlice = createSlice({
    name: 'weekEvents',
    initialState,
    reducers: {

        updateWeek: (state, action) => {
            const {events, currDate } = action.payload;
            return {
                 events, currDate
            }
        },
        updateEvents: (state, action) => {
            state.events = action.payload.events;
        },
    }
});

// Export actions
export const { updateWeek, updateEvents} = weekEventsSlice.actions;

// Export reducer
export default weekEventsSlice.reducer;
