

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { events } from '../../data/eventsData.ts';

import { UserEvent } from '../../models/UserEventsModels.ts';

interface DayEventsState {
    events: UserEvent[];
    currDate: string;
}

const currDate = new Date();

const initialState: DayEventsState = {
    events: events,
    currDate: currDate.toISOString(),
};

export const dayEventsSlice = createSlice({
    name: 'dayEvents',
    initialState,
    reducers: {

        updateDay: (state, action) => {
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
export const { updateDay, updateEvents} = dayEventsSlice.actions;

// Export reducer
export default dayEventsSlice.reducer;
