"use client"

import Topbar from "@/components/Topbar"
import {  useEffect } from "react"
import styles from '@/app/(withMainLayout)/styles.module.css'
import { useGetPlaylistByIdQuery, useUpdatePlaylistMutation } from "@/redux/features/api"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { changeCurrentIndexPlaylistTo, loadPlaylist, setPlaylistName, setPlaylistToPlaying } from "@/redux/features/playlist"
import { changeCurrentTime, changeIsPlayerPlaying, changeSelectedVideoInfo, changeVideoId } from "@/redux/features/music-slice"
import { setQueueToReset, setQueueToStop } from "@/redux/features/queueList-slice"
import toast, { Toaster } from "react-hot-toast"


function SpecificPlaylist({params}) {
      const {id:playlistId} = params
      
      const isPlaylistPlaying = useSelector(state=>state.Playlist.isPlaylistPlaying)
      const playlistCurrentIndex = useSelector(state=>state.Playlist.currentIndex)
      const playlistSongs = useSelector(state=>state.Playlist.SongList)
      const playlistName = useSelector(state=>state.Playlist.playlistName)

      const dispatch = useDispatch()
      
      const { 
            data:playlistData,
            error:getPlaylistError,
            isError:getPlaylistisError,
            isSuccess:getPlaylistisSuccess,
            isLoading:getPlaylistisLoading,
            isFetching:getPlaylisistFetching,
      } = useGetPlaylistByIdQuery(playlistId);
      
      

      useEffect(()=>{
            if(!isPlaylistPlaying || playlistSongs.length==0 || playlistCurrentIndex == null ) return

            const currentSong = playlistSongs[playlistCurrentIndex]
            

            changeSong(currentSong)
            
      },[playlistCurrentIndex,playlistSongs.length,playlistName,isPlaylistPlaying])

      function changeSong(selectedSong) {
            console.log("playlist song dispatch:",selectedSong.songName)
            // changing the videoId which triggers useEffect in useyoutubecomp
            dispatch(changeVideoId(selectedSong.youtubeId)) // change the video automatically plays the song
            // changing the info of video just for displaying
            dispatch(changeSelectedVideoInfo({
                  videoTitle:selectedSong.songName,
                  videoURL:selectedSong.songUrl
            }))
      
      }


      function defaultHandlePlaylistPlay(index){
            console.log("default handlePlaylistPlay")
            
            if(!isPlaylistPlaying  || playlistData.playlist.playlistName != playlistName){
                  // add the song the playlist 
            
                  if(getPlaylistisLoading || getPlaylisistFetching || getPlaylistisError) return

                  // doing all the default actions
                  dispatch(setPlaylistToPlaying())
                  dispatch(loadPlaylist(playlistData.playlist.song))
                  dispatch(setPlaylistName(playlistData.playlist.playlistName))

                  dispatch(setQueueToReset())
                  
                  
                  // there is problem with playing the first song of playlist as it  
            }
            dispatch(changeCurrentIndexPlaylistTo(index)) // changing the current index to selected index
            
        }
    
      function handlePlaylistPlay(){
            console.log("handling playlist play")
            dispatch(changeIsPlayerPlaying(true))
            
      }
      function handlePlaylistStop(){
            console.log("handling playlist stop")
            dispatch(changeIsPlayerPlaying(false))
      
      }


      return (
            <div className='h-screen  rounded-md p-3'>
                  <Topbar toggleStyle={styles.toggleStyle}/>
                  
                  {(getPlaylistisSuccess && !getPlaylisistFetching && !getPlaylistisLoading) 
                  && <>
                  
                  <h1 className='p-3 font-bold'>Playlist :{playlistData.playlist.playlistName}</h1>
                  
                  {playlistData.playlist.song?.map((songObj,index)=>{
                        
                        const songDetail = {
                              videoURL:songObj.songUrl,
                              videoTitle:songObj.songName,
                              videoId:songObj.youtubeId,
                              songId:songObj.songId
                        }
                        return (<SongCard 
                                    key={songObj.youtubeId} 
                                    songDetail={songDetail}
                                    pagePlaylistId={playlistId}
                                    pagePlaylistName = {playlistData.playlist.playlistName}
                                    index={index} 
                                    handlePlaylistStop={handlePlaylistStop}
                                    handlePlaylistPlay = {handlePlaylistPlay}
                                    defaultHandlePlaylistPlay={defaultHandlePlaylistPlay}
                              />)

                  })}
                  </>
                  }

            </div>
      );
};

function SongCard({songDetail,index,pagePlaylistId,pagePlaylistName,handlePlaylistPlay,handlePlaylistStop,defaultHandlePlaylistPlay}) {
      const dispatch = useDispatch()
      const isPlaylistPlaying = useSelector(state=>state.Playlist.isPlaylistPlaying)
      const playlistCurrentIndex = useSelector(state=>state.Playlist.currentIndex)
      const isSongPlaying = useSelector(state=>state.musicPlayer.isPlayerPlaying)
      const playlistName = useSelector(state=>state.Playlist.playlistName)
      const [
            removeSongToPlaylistMutation,{
            isLoading: isSongDeleting,
            isSuccess:hasSongDeleted,
            isError:isErrorDeletingSongToPlaylist,
            error:songDeletingError,
            }] = useUpdatePlaylistMutation()


      useEffect(() => {
            if (hasSongDeleted) {
                  toast.success("Song successfully removed from the playlist.");
            }
            }, [hasSongDeleted]);


      useEffect(()=>{
            if(isErrorDeletingSongToPlaylist ){
    
                // letting the user use the app 
                // const condition1 = gettingPlaylistError?.data?.error === UNAUTHENTICATED
                  const condition2 = songDeletingError?.data?.error === UNAUTHENTICATED
                  if( condition2){
                        toast.error("Your session has expired. Please login again")
                        router.replace("/login")
                  }else{
                        toast.error("Something is wrong.Please try again")
                 
                  }
            }
    
        },[isErrorDeletingSongToPlaylist ])

      
      const {videoURL,videoTitle,songId} = songDetail
      return (
            <>
            
            <div className='  flex py-2 px-4 mb-2 rounded-full items-center bg-white dark:bg-blue-950'>
            <Toaster/>
            {/* default play svg */}
            {!isPlaylistPlaying || playlistCurrentIndex!=index || playlistName!= pagePlaylistName?
                <svg className='w-10 h-10 cursor-pointer text-red-500  ' onClick={()=>{defaultHandlePlaylistPlay(index)}} fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                :null
            }  
            {/* play svg */}
            {isPlaylistPlaying && !isSongPlaying && playlistCurrentIndex==index && playlistName === pagePlaylistName?
                <svg className='w-10 h-10 cursor-pointer ' onClick={()=>{handlePlaylistPlay()}} fill="none"  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                :null
            }    
            {/* pause song svg */}
            {isPlaylistPlaying && isSongPlaying && playlistCurrentIndex==index && playlistName === pagePlaylistName?
                <svg className='w-10 h-10 cursor-pointer' onClick={()=>{handlePlaylistStop()}} viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path fill="currentColor" d="M18 32h4V16h-4v16zm6-28C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm2-8h4V16h-4v16z"/></svg>
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
                        
                        removeSongToPlaylistMutation({ 
                              playlistId:pagePlaylistId, 
                              updatedData:{songId} })
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
            </>
      )
      
}

export default SpecificPlaylist;