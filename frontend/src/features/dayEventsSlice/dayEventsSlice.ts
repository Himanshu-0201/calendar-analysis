

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

        updateDay: (state, action : PayloadAction<{events : UserEvent[], currDate : string}>) => {
            const {events, currDate } = action.payload;
            return {
                 events, currDate
            }
        },
        updateEvents: (state, action : PayloadAction<{events : UserEvent[]}>) => {
            state.events = action.payload.events;
        },

        updateCurrDate : (state, action : PayloadAction<string>) => {
            state.currDate = action.payload;
        },

        clearData : (state) => {
            return initialState
        }
    }
});

// Export actions
export const { updateDay, updateEvents, updateCurrDate, clearData} = dayEventsSlice.actions;

// Export reducer
export default dayEventsSlice.reducer;
