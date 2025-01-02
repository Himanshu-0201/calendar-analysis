import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from '../features/userInfoSlice/userInfoSlice.ts';
// import weekEventsSlice from '../features/weekEventsSlice/WeekEventsSlice.ts';
import weekEventsSlice from '../features/weekEventsSlice/weekEventsSlice.ts';

const store = configureStore({
    reducer: {
        userInfo: userInfoSlice,
        weekEvents : weekEventsSlice
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
