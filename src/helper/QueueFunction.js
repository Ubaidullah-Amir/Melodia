import toast from "react-hot-toast";
const Queue = {
    localStorageKey : 'queue',
    addSaveSongToStorage(songDetails){ // songDetails = {videoId,videoTitle,videoURL}

        let storedData = window.localStorage.getItem(this.localStorageKey);
        storedData = JSON.parse(storedData)
        if(!storedData){
            storedData=[]
        }
        const newData = [songDetails,...storedData]
        window.localStorage.setItem(this.localStorageKey, JSON.stringify(newData));

        toast.success("Successfully added song to queue")
    },
    getQueueSongs(){
        const storedData = window.localStorage.getItem(this.localStorageKey);

        return storedData?JSON.parse(storedData):[]
    },
    removeQueueSong(songDetails){
        const storedData = this.getQueueSongs()
        const newData = storedData.filter((song,_)=>song.videoId != songDetails.videoId)
        window.localStorage.setItem(this.localStorageKey, JSON.stringify(newData));
        if(storedData.length > newData.length) {
            toast.success("Successfully removed song to queue")
        }
    }

}

export default Queue;
