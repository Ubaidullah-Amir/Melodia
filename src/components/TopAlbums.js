
"use client"
import { changeSelectedVideoInfo, changeVideoId } from '@/redux/features/music-slice';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';


function TopAlbums({popularSongs,styles}) {
    
    return (
        <>
            <h1 className='p-3 font-bold'>Popular Songs</h1>
            <div  className={`${styles.scrollbarContainer}  gap-2 flex min-h-[200px] overflow-x-scroll py-2`}>
                {
                    popularSongs.items?.map((item)=>(
                        <SongCard 
                            imageURL = {item.snippet.thumbnails.high.url}
                            title = {item.snippet.title}
                            publishedAt = {item.snippet.publishedAt}
                            channelTitle = {item.snippet.channelTitle}
                            videoId = {item.id.videoId}
                            
                        />
                    ))
                }
            </div>
        </>
    );
}


const threeDotSvg = ()=>(
<svg className='w-4 h-4' data-name="Design Convert" id="Design_Convert" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            
<path class="cls-1" d="M32,17a5,5,0,1,1,5-5A5,5,0,0,1,32,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,32,9Z"/>
<path class="cls-1" d="M32,37a5,5,0,1,1,5-5A5,5,0,0,1,32,37Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,32,29Z"/>
<path class="cls-1" d="M32,57a5,5,0,1,1,5-5A5,5,0,0,1,32,57Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,32,49Z"/>
</svg>
)

function SongCard({imageURL,title,publishedAt,channelTitle,videoId}) {
    const [showCardMenu,setShowCardMenu] = useState(false);
    const dispatch = useDispatch()
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          // Close the menu if clicked outside of it
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowCardMenu(false);
        }
        };
    
        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);
    
        // Clean up the event listener on component unmount
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    // Use a regular expression to remove anything within brackets
    let clean_title = title.replace(/\([^)]*\)|\[[^\]]*\]/g, '');

    return (
    <div className={`group relative snap-center w-52 shrink-0`} >
        
        {showCardMenu?
            <div ref={menuRef} className='absolute z-10 bg-white w-32 bg-inherit top-52 right-11 p-1 dark:bg-blue-950 border-2 shadow-md'>
                    <div className='p-2 cursor-pointer hover:bg-slate-300 hover:bg-opacity-25'
                        onClick={()=>{console.log("click",videoId)}}
                    >
                        <p className='text-xs'>Add to Playlist</p>
                    </div>
                    <hr />
                    <div className='p-2 cursor-pointer hover:bg-slate-300 hover:bg-opacity-25'>
                        <p className='text-xs'>Add to Playlist</p>
                    </div>
                    
            </div>
            :null
            }
        <Image
                src={imageURL}
                className="w-52 h-52 rounded object-cover shadow-lg dark:shadow-gray-600 hover:cursor-pointer "
                width={400}
                height={400}
                alt="song picture"
                onClick={()=>{
                    // changing the videoId which triggers useEffect in useyoutubecomp
                    dispatch(changeVideoId(videoId))
                    // changing the info of video just for displaying
                    dispatch(changeSelectedVideoInfo({
                        videoTitle:clean_title,
                        videoURL:imageURL
                    }))
                    }}
        />
        <div className='flex '>
            <p className='grow-0  font-semibold pt-2'>{clean_title}</p>
            <div className={`group-hover:bg-gray-400 mt-1 p-3 w-auto h-10 rounded-full  group-hover:block hover:cursor-pointer`}
                onClick={()=>{setShowCardMenu((prevState)=>!prevState)}}
            > 
            {threeDotSvg()}
            </div>
        </div>
        <p className='text-gray-400 text-sm'>Song published at {publishedAt} on youtube on {channelTitle} channel.</p>
    </div>
    )
}

export default TopAlbums;