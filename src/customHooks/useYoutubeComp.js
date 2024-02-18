"use client"

import { changeCurrentTime, changeIsPlayerPlaying, changeIsPlayerReady, changeVideoId, toggleIsPlayerPlaying } from '@/redux/features/music-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function UseYouTubeComp(playerRef){


    const dispatch = useDispatch()

    // redux states
    const isPlayerReady = useSelector(state=>state.musicPlayer.isPlayerReady)
    const currentTime = useSelector(state=>state.musicPlayer.currentTime)
    const isPlaying = useSelector(state=>state.musicPlayer.isPlayerPlaying)
    const videoId = useSelector(state=>state.musicPlayer.videoId)

    // console.log("isPlayerReady",isPlayerReady)
    // console.log("currentTime",currentTime)
    // console.log("isPlaying",isPlaying)
    // console.log("videoId",videoId)



    // const [playerIsReady,setPlayerIsReady] = useState(false)
    // const [currentTime,setCurrentTime] = useState(0)
    // const [isPlaying,setIsPlaying] = useState(false)


    // after changing the videoID thorugh other components 
    useEffect(()=>{
        if (videoId){
            playerRef.current?.loadVideoById(videoId)
        }
    },[videoId])


    useEffect(() =>{
        if(!playerRef.current) return
        if (!isPlayerReady) return 
        if (isPlaying) {
            playerRef.current.playVideo()
        }else {
            playerRef.current.pauseVideo()
        }
        // can implement interval only on isPlaying but slider won't work when not paused
        const intervalID = setInterval(()=>{
            const ct = playerRef.current.getCurrentTime()
            const duration = playerRef.current.getDuration()
            // setCurrentTime(()=>(ct/duration)*100)
            dispatch(changeCurrentTime((ct/duration)*100))
        },10)
        
            
        return ()=>{
            clearInterval(intervalID)
        }
            
        
        
    },[isPlaying])

    function onStateChange(event) {
        
        if(event.data === 1) {
            // setIsPlaying(true)
            dispatch(changeIsPlayerPlaying(true))
        }
       
    }


    
    const opts = {
        height: '20',
        width: '20',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
          control:0,
          disablekb:1,

        },
    };
    function onReady(event) {
        playerRef.current = event.target
        // setPlayerIsReady(true)
        dispatch(changeIsPlayerReady(true))
    }


    function loadVideoById(videoId) {
        playerRef.current?.loadVideoById(videoId)
        dispatch(changeVideoId(videoId))
    }
    function getCurrentTime() {
        return playerRef.current?.getCurrentTime()
    }

    function getPlayerState() {
        playerRef.current?.getPlayerState()
    }
    function seekTo(time) {
        playerRef.current?.seekTo(time)
    }
    function getDuration() {
        return playerRef.current?.getDuration()

    }
    const durationInSec = (getDuration()/60).toFixed(2)
    
    return ({
        onStateChange,
        onReady,
        setIsPlaying:()=>{dispatch(toggleIsPlayerPlaying())},
        loadVideoById,
        getCurrentTime,
        getPlayerState,
        seekTo,
        getDuration,
        opts,
        currentTime,
        isPlaying,
        durationInSec
    })

}
