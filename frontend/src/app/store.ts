import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from '../features/userInfoSlice/userInfoSlice.ts';
// import weekEventsSlice from '../features/weekEventsSlice/WeekEventsSlice.ts';
import weekEventsSlice from '../features/weekEventsSlice/weekEventsSlice.ts';
import dayEventsSlice from '../features/dayEventsSlice/dayEventsSlice.ts';

const store = configureStore({
    reducer: {
        userInfo: userInfoSlice,
        weekEvents: weekEventsSlice,
        dayEvents: dayEventsSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
