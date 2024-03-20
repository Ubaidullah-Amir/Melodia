import { createSlice } from "@reduxjs/toolkit";

const initialState={
    SongList:[],
    currentIndex:null,
    isPlaylistPlaying:false,
    playlistName:""
}
export const PlaylistReducer = createSlice({
    name:"Playlist",
    initialState,
    reducers:{
        loadPlaylist: (state,action)=>{
            //initial step 
            state.SongList=action.payload;
        },
        addSongToPlaylist: (state,action)=>{
            const newSong = action.payload;
            // Add the new song to the SongList array
            state.SongList = [...state.SongList, newSong];
        },
        removeSongFromPlaylist: (state, action) => {
            const songIndexToRemove = action.payload;
            state.SongList = state.SongList.filter((_, index) => index !== songIndexToRemove);
            // Adjust currentIndex
            // If the songList becomes empty after removing a song
            if (state.SongList.length === 0) {
                state.currentIndex = null;
            } else {
                // If currentIndex is not null, adjust it to the next index in a circular manner and increment it
                if (state.currentIndex !== null) {
                    state.currentIndex = (state.currentIndex + 1) % state.SongList.length;
                }
                
            }
        },
        changeToProperNextIndexPlaylist: (state) => {
            // If the queue is not empty, calculate the next index in a circular manner
            if (state.SongList.length > 0) {
                state.currentIndex = (state.currentIndex + 1) % state.SongList.length;
            } else {
                state.currentIndex = null;
            }
        },
        changeCurrentIndexPlaylistTo: (state,action)=>{
            state.currentIndex=action.payload;
        },
        setPlaylistToPlaying: (state)=>{
            state.isPlaylistPlaying=true;
        },
        setPlaylistToStop: (state)=>{
            state.isPlaylistPlaying=false;
        },
        setPlaylistToReset: (state)=>{
            state.currentIndex = null,
            state.isPlaylistPlaying=false,
            state.playlistName=""
            state.SongList = []
        },
        setPlaylistName:(state,action)=>{
            state.playlistName=action.payload;
        },
    }
})
// reducers are the functionality of the slice of data
export const {
    loadPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    changeToProperNextIndexPlaylist,
    changeCurrentIndexPlaylistTo,
    setPlaylistToPlaying,
    setPlaylistToStop,
    setPlaylistName,
    setPlaylistToReset
    } = PlaylistReducer.actions
export default PlaylistReducer
