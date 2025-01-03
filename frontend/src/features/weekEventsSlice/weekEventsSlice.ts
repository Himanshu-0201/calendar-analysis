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

        updateWeek: (state, action : PayloadAction<{events : UserEvent[], currDate : string}>) => {
            const {events, currDate } = action.payload;
            return {
                 events, currDate
            }
        },
        updateEvents: (state, action : PayloadAction<{events: UserEvent[]}>) => {
            state.events = action.payload.events;
        },
        updateCurrDate : (state, action : PayloadAction<string>) => {
            state.currDate = action.payload;
        }
    }
});

// Export actions
export const { updateWeek, updateEvents, updateCurrDate} = weekEventsSlice.actions;

// Export reducer
export default weekEventsSlice.reducer;
