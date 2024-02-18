import { createSlice } from "@reduxjs/toolkit";

const initialState={
      videoId:"",
      selectedVideoInfo:null,
      isPlayerPlaying: false,
      isPlayerReady: false,
      currentTime:0,

}
export const MusicReducer = createSlice({
      name:"musicPlayer",
      initialState,
      reducers:{
            changeVideoId: (state,action)=>{
                  state.videoId=action.payload;
            },
            changeSelectedVideoInfo: (state,action)=>{
                  state.selectedVideoInfo=action.payload;
            },
            changeIsPlayerPlaying:(state,action)=>{
                  state.isPlayerPlaying=action.payload
            },
            toggleIsPlayerPlaying:(state)=>{
                  state.isPlayerPlaying=!state.isPlayerPlaying
            },
            changeIsPlayerReady:(state,action)=>{
                state.isPlayerReady=action.payload
            },
            changeCurrentTime:(state,action)=>{
                state.currentTime=action.payload
            }
      }
})
// reducers are the functionality of the slice of data
export const {
      changeIsPlayerPlaying,
      changeVideoId,
      changeSelectedVideoInfo,
      changeIsPlayerReady,
      changeCurrentTime,
      toggleIsPlayerPlaying
} = MusicReducer.actions
export default MusicReducer
