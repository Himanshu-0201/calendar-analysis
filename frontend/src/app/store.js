import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from '../features/userInfoSlice/userInfoSlice';

export default configureStore({
    reducer: {
        userInfo : userInfoSlice,
    },
});