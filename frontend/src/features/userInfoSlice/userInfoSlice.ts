
import { createSlice } from "@reduxjs/toolkit";

interface UserInfoStateType {
    username: string;
    isSingedIn: boolean;
    eventShowTillCurrentTime: boolean;
}

const initialState : UserInfoStateType = {
    username : "default",
    isSingedIn : false,
    eventShowTillCurrentTime : false,
}

const userInfoSlice = createSlice({
    name : "userInfo",
    initialState,
    reducers : {

        setUserInfo : (state, action) => { 
            const {username, isSingedIn, eventShowTillCurrentTime} = action.payload;
            return {username, isSingedIn, eventShowTillCurrentTime};
        },
        setUserSignOut : (state) => {
            return initialState;
        },
        setEventShowTillCurrentTime : (state, action) => {
            state.eventShowTillCurrentTime = action.payload;
        },
    }

});


export const { setUserInfo, setUserSignOut, setEventShowTillCurrentTime } = userInfoSlice.actions;

export default userInfoSlice.reducer;