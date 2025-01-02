import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from '../features/userInfoSlice/userInfoSlice.ts';

const store = configureStore({
    reducer: {
        userInfo: userInfoSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
