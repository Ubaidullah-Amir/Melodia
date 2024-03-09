
const useQueue = () => {

    function addSongtoQueue(songDetails){ // songDetails = {videoId,videoTitle,videoURL}
        const sessionStorageKey = 'queue'
        const storedData = sessionStorage.getItem(sessionStorageKey);
        const newData = [songDetails,...storedData]
        sessionStorage.setItem(sessionStorageKey, newData);
    }
    function startQueue(videoId){
        
    }

    return ({
        addSongtoQueue,
    })

}

export default useQueue;
