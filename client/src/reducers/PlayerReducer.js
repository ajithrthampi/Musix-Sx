import { createSlice } from "@reduxjs/toolkit";

const initialValue ={album:"Ray Of Light", artist:"Madonna", genre:"Pop", id:"26YUXUHZEX2CjhbiQtkE", imageurl:"https://firebasestorage.googleapis.com/v0/b/musicsx-df35a.appspot.com/o/Images%2F%20%26%7BDate.now()%7D-images%20(3).jpg?alt=media&token=9fb6c5e3-f97d-4e7e-86f4-108f8e15e175", musicUrl:"https://firebasestorage.googleapis.com/v0/b/musicsx-df35a.appspot.com/o/Musics%2F%20%26%7BDate.now()%7D-Frozen_320(PagalWorld).mp3?alt=media&token=bfe28a86-0c53-43a0-97e3-ea4371190381", song : "Frozen", 
isPlaying: false,
showSidebar:false,
isEnable:false,
index:0,
BannerIndex:2,
MusicUrl:"",
imageurl:"",
email:'',
}
export const playerSlice = createSlice({
    name:"currentTrack",
    initialState:{
        value:initialValue},
    reducers: {
        playing: (state,action) => {
            state.value = action.payload;
       
        },
        openSideBar: (state,action) => {
            state.showSidebar = action.payload;
        },
        play:(state,action)=>{
             state.isPlaying=action.payload;
        },
        enable:(state,action)=>{
            state.isEnable=action.payload;
       },
        pause:(state,action) => {
            state.isPlaying = action.payload;
        },
        songIndex:(state,action)=>{
            state.index = action.payload;
        },
        musicRef:(state,action)=>{
            state.MusicUrl = action.payload
        },
        bannerIndex:(state,action)=>{
            state.BannerIndex = action.payload
        },
        setEmail:(state,action)=>{
            state.email = action.payload
        }
    }
});

export const {playing,songIndex,pause,play,musicRef,bannerIndex,setEmail,openSideBar,enable} = playerSlice.actions;
export default playerSlice.reducer;

