import { createSlice } from "@reduxjs/toolkit";

const initialState={
    queueSong:[],
    currentIndex:null,
    isQueuePlaying:false,
}
export const QueueReducer = createSlice({
    name:"Queue",
    initialState,
    reducers:{
        addSongToQueueState: (state,action)=>{
            const newSong = action.payload;
            // Add the new song to the SongList array
            console.log(newSong);
            state.queueSong = [...state.queueSong, newSong];
        },
        addSongListToQueueState: (state,action)=>{
            const songList = action.payload;
            state.queueSong = songList;
        },
        removeSongFromQueueState: (state, action) => {
            const songIndexToRemove = action.payload;
            state.queueSong = state.queueSong.filter((_, index) => index !== songIndexToRemove);
            // Adjust currentIndex
             // If the queue becomes empty after removing a song
            if (state.queueSong.length === 0) {
                state.currentIndex = null;
            } else {
                // If currentIndex is not null, adjust it to the next index in a circular manner and increment it
                if (state.currentIndex !== null) {
                    state.currentIndex = (state.currentIndex + 1) % state.queueSong.length;
                }
                
            }
        },
        changeProperNextIndexQueueState: (state) => {
            // If the queue is not empty, calculate the next index in a circular manner
            if (state.queueSong.length > 0) {
                state.currentIndex = (state.currentIndex + 1) % state.queueSong.length;
            } else {
                state.currentIndex = null;
            }
        },
        changeCurrentIndexQueueStateTo: (state,action)=>{
            state.currentIndex=action.payload;
        },
        setQueueToPlaying: (state)=>{
            state.isQueuePlaying=true;
        },
        setQueueToStop: (state)=>{
            state.isQueuePlaying=false;
        }
    }
})
// reducers are the functionality of the slice of data
export const {
    addSongToQueueState,
    addSongListToQueueState,
    removeSongFromQueueState,
    changeCurrentIndexQueueStateTo,
    setQueueToPlaying,
    setQueueToStop,
    changeProperNextIndexQueueState
} = QueueReducer.actions
export default QueueReducer
