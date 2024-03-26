"use client"
import Queue from "@/helper/QueueFunction";
import { changeIsPlayerPlaying, changeSelectedVideoInfo, changeVideoId, toggleIsPlayerPlaying } from "@/redux/features/music-slice";
import { setPlaylistToReset, setPlaylistToStop } from "@/redux/features/playlist";
import { addSongListToQueueState, changeCurrentIndexQueueStateTo, removeSongFromQueueState, setQueueToPlaying } from "@/redux/features/queueList-slice";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function PlayListRender({styles}) {

    const songList = useSelector(state=>state.Queue.queueSong)
    const isQueuePlaying = useSelector(state=>state.Queue.isQueuePlaying)
    const queueCurrentIndex = useSelector(state=>state.Queue.currentIndex)
    const isSongPlaying = useSelector(state=>state.musicPlayer.isPlayerPlaying)
    
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!isQueuePlaying || songList.length==0 || queueCurrentIndex == null ) return

        const currentSong = songList[queueCurrentIndex]
        

        changeSong(currentSong)
        
    },[queueCurrentIndex,songList.length])

    function changeSong(selectedSong) {
        console.log(songList,queueCurrentIndex,isQueuePlaying)
        console.log("song dispatch:",selectedSong.videoId)
        // changing the videoId which triggers useEffect in useyoutubecomp
        dispatch(changeVideoId(selectedSong.videoId)) // change the video automatically plays the song
        // changing the info of video just for displaying
        dispatch(changeSelectedVideoInfo({
            videoTitle:selectedSong.videoTitle,
            videoURL:selectedSong.videoURL
        }))
    
    }
    

    function defaultHandleQueuePlay(index){
        if(!isQueuePlaying){
            // if queue is idle the first play should set the queue playing state
            dispatch(setQueueToPlaying())
            dispatch(setPlaylistToReset())
        }
        dispatch(changeCurrentIndexQueueStateTo(index)) // changing the current index to selected index
        
    }

    function handleQueuePlay(){
        console.log("handling Queue play")
        dispatch(changeIsPlayerPlaying(true))
        
    }

    function handleQueueSongStop(){
        console.log("handling Queue stop")
        dispatch(changeIsPlayerPlaying(false))
        
    }
    useEffect(()=>{
        const storedSongs = Queue.getQueueSongs()
        if(storedSongs.length != songList.length){
            dispatch(addSongListToQueueState(storedSongs))
        }

    },[])
    return (
        <div className= 'md:w-1/2 h-96 overflow-y-hidden'>
            <h2 className='p-3 font-bold'>Songs in queue</h2>
            <div className={`${styles.scrollbarContainer}  flex flex-col gap-2 snap-mandatory snap-x h-96  overflow-y-scroll pb-20`}>
            {songList?.map((song,index) =>{
                return <SongCard 
                key={song.videoId} 
                {...song} 
                index={index} 
                handleQueueSongStop={handleQueueSongStop}
                handleQueuePlay = {handleQueuePlay}
                defaultHandleQueuePlay={defaultHandleQueuePlay}
                />
            })}
            </div>
          </div>
    )
}








const SongCard = ({videoTitle,videoURL,videoId,index,handleQueuePlay,defaultHandleQueuePlay,handleQueueSongStop})=>{
    const dispatch = useDispatch()
    const isQueuePlaying = useSelector(state=>state.Queue.isQueuePlaying)
    const isSongPlaying = useSelector(state=>state.musicPlayer.isPlayerPlaying)
    const queueCurrentIndex = useSelector(state=>state.Queue.currentIndex)
    
    
    const songDetails = {
        videoTitle,
        videoURL,
        videoId
    }
    return (
        <div className='flex py-2 px-4 rounded-full items-center bg-white dark:bg-blue-950'>
            {/*default play svg */}
            {!isQueuePlaying || queueCurrentIndex!=index?
                <svg className='w-10 h-10 cursor-pointer text-red-500 ' onClick={()=>{defaultHandleQueuePlay(index)}} fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                :null
            }  
            {/* play svg */}
            {isQueuePlaying && !isSongPlaying && queueCurrentIndex==index?
                <svg className='w-10 h-10 cursor-pointer ' onClick={()=>{handleQueuePlay(index)}} fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                :null
            }    
            {/* pause song svg */}
            {isQueuePlaying && isSongPlaying && queueCurrentIndex==index?
                <svg className='w-10 h-10 cursor-pointer' onClick={()=>{handleQueueSongStop()}} viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path fill="currentColor" d="M18 32h4V16h-4v16zm6-28C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm2-8h4V16h-4v16z"/></svg>
                :null
            }
                        
                <Image
                className='w-12 h-12  rounded-[50%] border-2 ml-2'
                      src={videoURL?videoURL:"/NoUserImage.jpeg"}
                      width={50}
                      height={50}
                      alt="Picture of the author"
                />
                {/* <div className='flex flex-col basis-full text-sm ml-2'> */}
                <p className="grow">{videoTitle}</p>
                <svg
                    className="justify-self-end w-10 h-10 min-w-[1.8rem] min-h-[1.8rem] cursor-pointer"
                    version="1.1"
                    viewBox="0 0 24 24"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    onClick={() => {
                        Queue.removeQueueSong(songDetails);
                        dispatch(removeSongFromQueueState(index));
                    }}
                    style={{
                        transition: 'fill 0.3s ease',
                        fill: 'currentColor', // Set the default fill color
                    }}
                    onMouseOver={(e) => e.currentTarget.style.fill = 'red'} // Change fill on hover
                    onMouseOut={(e) => e.currentTarget.style.fill = 'currentColor'} // Reset fill on hover out
                >
                    <g id="grid_system" />
                    <g id="_icons">
                        <path
                            d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z"
                        />
                    </g>
                </svg>

                {/* <p className='text-gray-500 text-xs'>4.25</p>
                <svg className='w-9' version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/></svg> */}
            </div>
    )
}