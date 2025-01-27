import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: "Default name",
    isSignedIn: false,
    userEmail:  "abc@xyz.com",
    reportSubscriptionEmail : "abc@xyz.com",
    eventsShowTillCurrentTime : false,
    reportSubscriptionStatue : false
}


export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {


        updateUserInfo : (state, action) => {

            const updatedName = action.payload.name;
            const updatedIsSignedIn = action.payload.isSignedIn;
            const updatedEventsShowTillCurrentTime = action.payload.eventsShowTillCurrentTime;
            const updatedUserEmail = action.payload.userEmail;
            const updatedReportSubscriptionEmail = action.payload.reportSubscriptionEmail;
            const updatedReportSubscriptionStatue = action.payload.reportSubscriptionStatue;

            return {
                ...state,

                name: updatedName,
                isSignedIn: updatedIsSignedIn,
                eventsShowTillCurrentTime : updatedEventsShowTillCurrentTime,
                userEmail : updatedUserEmail,
                reportSubscriptionEmail : updatedReportSubscriptionEmail,
                reportSubscriptionStatue : updatedReportSubscriptionStatue
            }

        },

        userSingOut: (state) => {
            return initialState;
        },
        updateEventsShowTillCurrentTime : (state, action) => {
            state.eventsShowTillCurrentTime = action.payload.eventsShowTillCurrentTime;
        },

        updateUserSettings : (state, action) => {
            const reportSubscriptionEmail = action.payload.reportSubscriptionEmail;
            const reportSubscriptionStatue = action.payload.reportSubscriptionStatue;

            return {
                ...state,
                reportSubscriptionEmail,
                reportSubscriptionStatue
            }
        }
    }
});


export const {userSingOut, updateEventsShowTillCurrentTime , updateUserInfo, updateUserSettings} = userInfoSlice.actions;

export default userInfoSlice.reducer;

