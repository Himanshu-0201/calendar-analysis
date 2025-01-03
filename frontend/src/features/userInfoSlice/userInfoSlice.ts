import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: "Default name",
    isSignedIn: false,
    eventsShowTillCurrentTime : false,
}


export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {


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

        userSingOut: (state) => {
            return initialState;
        },
        updateEventsShowTillCurrentTime : (state, action) => {
            state.eventsShowTillCurrentTime = action.payload.eventsShowTillCurrentTime;
        }
    }
});


export const {userSingOut, updateEventsShowTillCurrentTime , updateUserInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;

