
import { createSlice } from "@reduxjs/toolkit";

import { events } from "../../data/eventsData";

const currDate = new Date();

const initialState = {
    name: "Default name",
    events: events,
    currDate: currDate.toISOString(),
    isSignedIn: false,
    allTimeSpend: "10 hr 15 min",
}


export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {


        updateUser: (state, action) => {

            const { name, events, currDate, allTimeSpend } = action.payload;

            return {
                name, events, currDate, allTimeSpend, isSignedIn : true
            }
        },

        unpdateEvents: (state, actions) => {
            state.events = actions.payload.events;
        },

        updateCurrDate: (state, actions) => {
            state.currDate = actions.payload.currDate;
        },

        userSingOut: (state) => {
            return initialState;
        }
    }
});


export const { unpdateEvents, updateCurrDate, updateUser, userSingOut } = userInfoSlice.actions;

export default userInfoSlice.reducer;

