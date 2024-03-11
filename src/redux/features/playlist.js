import { createSlice } from "@reduxjs/toolkit";

const initialState={
    SongList:[],
    currentIndex:0,

}
export const PlaylistReducer = createSlice({
    name:"Playlist",
    initialState,
    reducers:{
        addFullSongList: (state,action)=>{
            state.SongList=action.payload;
        },
        addSongToList: (state,action)=>{
            const newSong = action.payload;
            // Add the new song to the SongList array
            state.SongList = [...state.SongList, newSong];
        },
        removeSongFromList: (state, action) => {
            const songIndexToRemove = action.payload;
            state.SongList = state.SongList.filter((_, index) => index !== songIndexToRemove);
            // Adjust currentIndex
            if (songIndexToRemove === state.currentIndex) {
                state.currentIndex = (state.currentIndex + 1) % state.SongList.length;
            }
        },
        changeCurrentIndexTo: (state,action)=>{
            state.currentIndex=action.payload;
        },
    }
})
// reducers are the functionality of the slice of data
export const {
    addFullSongList,
    addSongToList,
    removeSongFromList,
    changeCurrentIndexTo} = PlaylistReducer.actions
export default PlaylistReducer
