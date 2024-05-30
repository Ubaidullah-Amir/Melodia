"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import UseYouTubeComp from '@/customHooks/useYoutubeComp';
import YouTube from 'react-youtube';
import { useDispatch, useSelector } from 'react-redux';
import { changeProperNextIndexQueueState, changeProperPrevIndexQueueState } from '@/redux/features/queueList-slice';
import { changeToProperNextIndexPlaylist, changeToProperPrevIndexPlaylist } from '@/redux/features/playlist';
import { useAddSongToPlaylistMutation, useGetPlaylistByIdQuery, useGetPlaylistQuery } from '@/redux/features/api';
import { PLAYLIST_FAVOURITE, UNAUTHENTICATED } from '@/helper/ImportantStrings';
import toast from 'react-hot-toast';
import { useFavouriteInMusicPlayer } from '@/customHooks/useFavouriteInMusicPlayer';
const MusicPlayer = ({styles}) => {
      //testing
      const isQueuePlaying = useSelector(state=>state.Queue.isQueuePlaying) 
      
      const isPlaylistPlaying = useSelector(state=>state.Playlist.isPlaylistPlaying) 
      
      const dispatch = useDispatch()
      //testing
      const player = useRef()
      const selectedVideoInfo = useSelector(state=>state.musicPlayer.selectedVideoInfo)
      const videoTitle = selectedVideoInfo?selectedVideoInfo.videoTitle:""
      const videoDescription = selectedVideoInfo?selectedVideoInfo.videoDescription:""
      const videoURL = selectedVideoInfo?selectedVideoInfo.videoURL:""
      const videoId = useSelector(state=>state.musicPlayer.videoId)
      const {data:isFavourite,error,isError} = useFavouriteInMusicPlayer(videoId)

      
      const {
            onStateChange,
            onReady,
            setIsPlaying,
            getCurrentTime,
            seekTo,
            getDuration,
            opts,
            currentTime,
            isPlaying,
            durationInSec,
            onEnd
      } = UseYouTubeComp(player)


      // handling playlist faviuorites

      const [
            addSongToPlaylistMutation,{
            isLoading: isSongAdding,
            isSuccess:hasSongAdded,
            isError:isErrorAddingSongToPlaylist,
            error:songAddingError,
            }] = useAddSongToPlaylistMutation()
      
      function handleAddFavPlaylist() {
            if(isFavourite) return 
            const playlistObj = { 
                  playlist: [PLAYLIST_FAVOURITE],
                  songObj:{ 
                        songName: videoTitle,
                        songUrl: videoURL,
                        youtubeId: videoId
                  }
            }
            
            
            addSongToPlaylistMutation(playlistObj)
              
      }
      
      useEffect(() =>{
            if(hasSongAdded){
                toast.success("Song successfully added")
            }
        },[hasSongAdded])

        useEffect(()=>{
            if(isErrorAddingSongToPlaylist ){
    
                // letting the user use the app 
                // const condition1 = gettingPlaylistError?.data?.error === UNAUTHENTICATED
                toast.error("Session Expired, Please login again")
                const condition2 = songAddingError?.data?.error === UNAUTHENTICATED
                if( condition2){
                    router.replace("/login")
                }
            }
    
        },[isErrorAddingSongToPlaylist ])


      
      return (
            <>
            {isSongAdding && <p className="text-blue-800">Please wait, Song is adding to your Favuorites </p>}
            <div className={`${!videoTitle && "hidden"} bg-white dark:bg-gray-800  fixed bottom-0 w-[100vw] md:max-h-[10vh] max-h-[25vh] py-0 flex md:flex-row flex-col  md:py-2  pr-6 pl-4 items-center justify-between  z-50 rounded-md `}>
            
            {/* only in mobile view */}
            <div className={`${styles.musicRangeInput} md:hidden min-w-[100px] grow w-[100%] shrink-0 flex items-center gap-1 `} >
                        <input className='w-full' type='range' 
                        value={currentTime}  
                        onChange={(event)=>{
                              const value = event.target.value/100
                              const duration =getDuration()
                              seekTo(duration*value)
                        }} 
                        />
                        <p className='text-gray-500 text-xs '>{durationInSec}</p>
                        {
                            (!isError && error != UNAUTHENTICATED)?
                            <div className='min-w-[20px] max-w-[28px]'
                        onClick={handleAddFavPlaylist}
                        >
                        
                         <svg className='w-full hover:scale-105' width="92px" height="92px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                         <path fill={isFavourite?"#ff0f0f":"white"} d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" ></path> </g></svg>
                        </div>: 
                        null
                        }
            </div>
             {/* only in mobile view */}
                  <div className='hidden'>
                 <YouTube
                  opts={opts} 
                  onReady={onReady}
                  onStateChange={onStateChange}
                  onEnd={onEnd}
                  />
                  </div>
                  <div className='flex w-full md:w-[auto] justify-between'>
                  <div className='flex'>
                  <Image
                  className='rounded-[50%] shrink-0 min-w-[30px] max-w-[50px]   aspect-square mr-1  '
                        src={videoURL?videoURL:"/NoUserImage.jpeg"}
                        width={50}
                        height={50}
                        alt="Author"
                  />
                  <div className='flex shrink-0  h-[8vh] w-[20%] grow flex-col sm:w-[40%]  overflow-hidden  text-sm  '>
                        
                        <p className='font-semibold '>{videoTitle} </p>
                        <p className='hidden hover:block absolute bottom-full'> {videoTitle} -{videoDescription}</p>
                  </div>
                  </div>
                  <div className='md:hidden flex shrink-0  w-[30%] max-w-[100px] item-center text-xs '>
                        {/* backward svg */}
                        <svg fill="currentColor" className='w-5 rotate-180' onClick={()=>{seekTo(getCurrentTime() - 5)}} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	                        viewBox="0 0 512 512" xmlSpace="preserve"><g><g><path d="M480,0c-11.776,0-21.333,9.557-21.333,21.333v210.325L42.283,2.645c-6.613-3.627-14.656-3.52-21.141,0.32 c-6.485,3.84-10.475,10.816-10.475,18.368v469.333c0,7.552,3.989,14.528,10.475,18.368C24.491,511.019,28.245,512,32,512 c3.541,0,7.083-0.875,10.283-2.645l416.384-229.013v210.325c0,11.776,9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333 V21.333C501.333,9.557,491.776,0,480,0z"/></g></g>
                        </svg>
                       

                        {!isPlaying?
                        // {/* play svg */}
                        <svg className='w-4/12 none' onClick={()=>{setIsPlaying()}} fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>:
                        // {/* pause song svg */}
                        <svg className='w-4/12' onClick={()=>{setIsPlaying()}} viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path fill="currentColor" d="M18 32h4V16h-4v16zm6-28C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm2-8h4V16h-4v16z"/></svg>
                        }
                        
                        
                        {/* forward svg */}
                        <svg fill="currentColor" className='w-5 '  onClick={()=>{seekTo(getCurrentTime() + 5)}} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	                        viewBox="0 0 512 512" xmlSpace="preserve"><g><g><path d="M480,0c-11.776,0-21.333,9.557-21.333,21.333v210.325L42.283,2.645c-6.613-3.627-14.656-3.52-21.141,0.32 c-6.485,3.84-10.475,10.816-10.475,18.368v469.333c0,7.552,3.989,14.528,10.475,18.368C24.491,511.019,28.245,512,32,512 c3.541,0,7.083-0.875,10.283-2.645l416.384-229.013v210.325c0,11.776,9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333 V21.333C501.333,9.557,491.776,0,480,0z"/></g></g>
                        </svg>
                  </div>
                  </div>
                  
                  
                  <div className='hidden md:flex shrink-0 min-w-[60px] w-[20%] max-w-[100px] item-center text-xs '>
                        {/* backward svg */}
                        <svg fill="currentColor" className='w-1/6 rotate-180' onClick={()=>{seekTo(getCurrentTime() - 5)}} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	                        viewBox="0 0 512 512" xmlSpace="preserve"><g><g><path d="M480,0c-11.776,0-21.333,9.557-21.333,21.333v210.325L42.283,2.645c-6.613-3.627-14.656-3.52-21.141,0.32 c-6.485,3.84-10.475,10.816-10.475,18.368v469.333c0,7.552,3.989,14.528,10.475,18.368C24.491,511.019,28.245,512,32,512 c3.541,0,7.083-0.875,10.283-2.645l416.384-229.013v210.325c0,11.776,9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333 V21.333C501.333,9.557,491.776,0,480,0z"/></g></g>
                        </svg>
                        

                        {!isPlaying?
                        // {/* play svg */}
                        <svg className='w-4/12 none' onClick={()=>{setIsPlaying()}} fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>:
                        // {/* pause song svg */}
                        <svg className='w-4/12' onClick={()=>{setIsPlaying()}} viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path fill="currentColor" d="M18 32h4V16h-4v16zm6-28C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm2-8h4V16h-4v16z"/></svg>
                        }
                        
                        
                        {/* forward svg */}
                        <svg fill="currentColor" className='w-1/6 '  onClick={()=>{seekTo(getCurrentTime() + 5)}} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	                        viewBox="0 0 512 512" xmlSpace="preserve"><g><g><path d="M480,0c-11.776,0-21.333,9.557-21.333,21.333v210.325L42.283,2.645c-6.613-3.627-14.656-3.52-21.141,0.32 c-6.485,3.84-10.475,10.816-10.475,18.368v469.333c0,7.552,3.989,14.528,10.475,18.368C24.491,511.019,28.245,512,32,512 c3.541,0,7.083-0.875,10.283-2.645l416.384-229.013v210.325c0,11.776,9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333 V21.333C501.333,9.557,491.776,0,480,0z"/></g></g>
                        </svg>
                  </div>
                  <div className={`${styles.musicRangeInput} hidden md:flex min-w-[100px] grow w-[40%] shrink-0  items-center gap-1 `} >
                        <input className='w-full' type='range' 
                        value={currentTime}  
                        onChange={(event)=>{
                              const value = event.target.value/100
                              const duration =getDuration()
                              seekTo(duration*value)
                        }} 
                        />
                        <p className='text-gray-500 text-xs '>{durationInSec}</p>
                        {
                            (!isError && error != UNAUTHENTICATED)?
                            <div className='min-w-[20px] max-w-[28px]'
                        onClick={handleAddFavPlaylist}
                        >
                        
                         <svg className='w-full hover:scale-105' width="92px" height="92px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                         <path fill={isFavourite?"#ff0f0f":"white"} d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" ></path> </g></svg>
                        </div>: 
                        null
                        }
                        
            
                  </div>

                  {isQueuePlaying &&
                  <div className='flex shrink-0 w-20 gap-1'>
                  {/* previous queue song */}
                   <button onClick={()=>{
                        
                        dispatch(changeProperPrevIndexQueueState())

                        }}>
                        <svg className='w-9 rotate-180'   version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor"  d="M436.3,96h-8.1c-6.7,0-12.2,5-12.2,11.7v113.5L228.9,98.7c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-15.4,7-15.4,17v63.1  L86.9,98.3c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-14.9,7.4-14.9,17.4v286c0,10,6.7,16.5,15,16.5c3.1,0,5.4-1.2,8.2-2.9l118.3-77.6v64  c0,10,7.2,16.5,15.5,16.5c3.1,0,5.5-1.2,8.2-2.9L416,290.8v113c0,6.7,5.4,12.2,12.2,12.2h8.1c6.7,0,11.7-5.5,11.7-12.2V107.7  C448,101,443.1,96,436.3,96z"/></svg>
                        
                  </button>
                  {/* next queue song */}
                  <button onClick={()=>{
                        
                        dispatch(changeProperNextIndexQueueState())

                        }}>
                        <svg className='w-9'   version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor"  d="M436.3,96h-8.1c-6.7,0-12.2,5-12.2,11.7v113.5L228.9,98.7c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-15.4,7-15.4,17v63.1  L86.9,98.3c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-14.9,7.4-14.9,17.4v286c0,10,6.7,16.5,15,16.5c3.1,0,5.4-1.2,8.2-2.9l118.3-77.6v64  c0,10,7.2,16.5,15.5,16.5c3.1,0,5.5-1.2,8.2-2.9L416,290.8v113c0,6.7,5.4,12.2,12.2,12.2h8.1c6.7,0,11.7-5.5,11.7-12.2V107.7  C448,101,443.1,96,436.3,96z"/></svg>
                        
                  </button>
                 
                  </div>
                  }
                  {isPlaylistPlaying &&
                  <div className='flex shrink-0 w-20 gap-1'>
                  {/* previous playlist song */}
                  <button onClick={()=>{
                        
                        dispatch(changeToProperPrevIndexPlaylist())

                        }}>
                        <svg className='w-9 rotate-180'   version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor"  d="M436.3,96h-8.1c-6.7,0-12.2,5-12.2,11.7v113.5L228.9,98.7c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-15.4,7-15.4,17v63.1  L86.9,98.3c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-14.9,7.4-14.9,17.4v286c0,10,6.7,16.5,15,16.5c3.1,0,5.4-1.2,8.2-2.9l118.3-77.6v64  c0,10,7.2,16.5,15.5,16.5c3.1,0,5.5-1.2,8.2-2.9L416,290.8v113c0,6.7,5.4,12.2,12.2,12.2h8.1c6.7,0,11.7-5.5,11.7-12.2V107.7  C448,101,443.1,96,436.3,96z"/></svg>
                        
                  </button>
                  {/* next playlist song */}
                  <button onClick={()=>{
                        
                        dispatch(changeToProperNextIndexPlaylist())

                        }}>
                        <svg className='w-9'   version="1.1" viewBox="0 0 512 512"  xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="currentColor"  d="M436.3,96h-8.1c-6.7,0-12.2,5-12.2,11.7v113.5L228.9,98.7c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-15.4,7-15.4,17v63.1  L86.9,98.3c-2.5-1.7-5.1-2.3-8.1-2.3c-8.3,0-14.9,7.4-14.9,17.4v286c0,10,6.7,16.5,15,16.5c3.1,0,5.4-1.2,8.2-2.9l118.3-77.6v64  c0,10,7.2,16.5,15.5,16.5c3.1,0,5.5-1.2,8.2-2.9L416,290.8v113c0,6.7,5.4,12.2,12.2,12.2h8.1c6.7,0,11.7-5.5,11.7-12.2V107.7  C448,101,443.1,96,436.3,96z"/></svg>
                        
                  </button>
                  
                  </div>
                  }
                  
                  
                  </div>
            
            
            
                  </>
      );
};

export default React.memo(MusicPlayer);