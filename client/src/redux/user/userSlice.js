import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateAvatar:(state,action)=>{
            state.currentUser.avatar=action.payload;
        }
    }
});

export const {signInStart,signInFailure,signInSuccess,updateAvatar}=userSlice.actions;
export default userSlice.reducer;