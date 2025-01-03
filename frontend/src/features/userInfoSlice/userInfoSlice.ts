
import { createSlice } from "@reduxjs/toolkit";

import { events } from "../../data/eventsData.ts";
import { act } from "react";

const currDate = new Date();

const initialState = {
    name: "Default name",
    events: events,
    currDate: currDate.toISOString(),
    isSignedIn: false,
    eventsShowTillCurrentTime : false,
}


export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {


        updateUser: (state, action) => {

            const { name, events, currDate , eventsShowTillCurrentTime} = action.payload;

            return {
                name, events, currDate,  eventsShowTillCurrentTime, isSignedIn : true
            }
        },

        updateUserInfo : (state, action) => {

            const updatedName = action.payload.name;
            const updatedIsSignedIn = action.payload.isSignedIn;
            const updatedEventsShowTillCurrentTime = action.payload.eventsShowTillCurrentTime;

            return {
                ...state,
                name: updatedName,
                isSignedIn: updatedIsSignedIn,
                eventsShowTillCurrentTime : updatedEventsShowTillCurrentTime
            }

        },

        updateEvents: (state, actions) => {
            state.events = actions.payload.events;
        },

        updateCurrDate: (state, actions) => {
            state.currDate = actions.payload.currDate;
        },

        userSingOut: (state) => {
            return initialState;
        },
        updateEventsShowTillCurrentTime : (state, action) => {
            state.eventsShowTillCurrentTime = action.payload.eventsShowTillCurrentTime;
        }
    }
});


export const { updateEvents, updateCurrDate, updateUser, userSingOut, updateEventsShowTillCurrentTime , updateUserInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;

