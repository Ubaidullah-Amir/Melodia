
"use client"
import { changeSelectedVideoInfo, changeVideoId } from '@/redux/features/music-slice';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
function TopAlbums({albumsData,styles}) {
    
    return (
        <>
            <h1 className='p-3 font-bold'>Top Albums</h1>
            <div  className={`${styles.scrollbarContainer}  gap-2 flex min-h-[200px] overflow-x-scroll py-2`}>
                {
                    albumsData.items?.map((item)=>(
                        <AlbumCard 
                            imageURL = {item.snippet.thumbnails.high.url}
                            title = {item.snippet.title}
                            description = {item.snippet.description}
                            videoId = {item.id.videoId}
                        />
                    ))
                }
            </div>
        </>
    );
}
function AlbumCard({imageURL,title,description,videoId}) {
    const dispatch = useDispatch()
    
    return (
    <div className='snap-center w-52 shrink-0' onClick={()=>{
        // changing the videoId which triggers useEffect in useyoutubecomp
        dispatch(changeVideoId(videoId))
        // changing the info of video just for displaying
        dispatch(changeSelectedVideoInfo({
            videoTitle:title,
            videoDescription:description.slice(0, description.indexOf('.')),
            videoURL:imageURL
        }))
        }}>
        <Image
                src={imageURL}
                className="w-52 h-52 rounded object-cover shadow-lg dark:shadow-gray-600  "
                width={400}
                height={400}
                alt="Albumn picture"
        />
        <p className='font-semibold pt-2'>{title}</p>
        <p className='text-gray-400 text-sm'>{description.slice(0, description.indexOf('.'))}</p>
    </div>
    )
}

export default TopAlbums;