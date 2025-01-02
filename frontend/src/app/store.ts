import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from '../features/userInfoSlice/userInfoSlice.ts';
import weekEventsSlice from '../features/WeekEventsSlice/WeekEventsSlice.ts';

const store =  configureStore({
    reducer: {
        userInfo: userInfoSlice,
        weekEvents: weekEventsSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;