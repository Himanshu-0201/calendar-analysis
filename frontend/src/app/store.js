import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from '../features/userInfoSlice/userInfoSlice';
import  weekEventsSlice  from '../features/WeekEventsSlice/WeekEventsSlice.ts';

export default configureStore({
    reducer: {
        userInfo : userInfoSlice,
        weekEvents : weekEventsSlice
    },
});