import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from '../features/userInfoSlice/userInfoSlice';
import  firstTimeLoaderSlice  from '../features/firstTimeLoaderSlice';

export default configureStore({
    reducer: {
        userInfo : userInfoSlice,
        firstTimeLoader : firstTimeLoaderSlice
    },
});