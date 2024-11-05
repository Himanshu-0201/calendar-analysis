import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true,
}



export const firstTimeLoaderSlice = createSlice({

    name : 'firstTimeLoader',
    initialState,
    reducers : {

        updateLoadingState : (state, action)=>{
            state.isLoading = action.payload.isLoading;
        }
    }    

});



export const {updateLoadingState} = firstTimeLoaderSlice.actions;

export default firstTimeLoaderSlice.reducer;