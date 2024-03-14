"use client"
import UseYouTubeComp from '@/customHooks/useYoutubeComp';
import { useRef } from 'react';
import YouTube from 'react-youtube';

export default function YouTubeComp(){
    const player = useRef()
    const {
        onStateChange,
        onReady,
        setIsPlaying,
        loadVideoById,
        getCurrentTime,
        getPlayerState,
        seekTo,
        getDuration,
        opts,
        currentTime
    } = UseYouTubeComp(player)
    


    return (
    <>
        <p>youtube.com</p>
        {/* <YouTube 
        videoId='e-ORhEE9VVg'
        opts={opts} 
        onReady={onReady}
        onStateChange={onStateChange}
         />
        <div className="flex justify-between">
            <button onClick={()=>setIsPlaying(true)}>Play</button>
            <button onClick={()=>setIsPlaying(false)}>Pause</button>
            <button onClick={()=>loadVideoById("z3U0udLH974")}>Load Video</button>
            <button onClick={()=>{console.log(getDuration())}}>Duration</button>
            <button onClick={()=>{seekTo(getCurrentTime() + 5)}}>Add5Secs</button>
            <button onClick={()=>{
                console.log(getPlayerState())
                console.log(getPlayerMode())
            }}>cool</button>
            
            
        </div>
        <input className='w-full' type='range' 
        value={currentTime}  
         onChange={(event)=>{
            // clearInterval(intervalID)
            const value = event.target.value/100
            const duration =player.current.getDuration()
            player.current.seekTo(duration*value)
            // event.target.value = currentTime
            }} 
            /> */}

    </>
    );

}
