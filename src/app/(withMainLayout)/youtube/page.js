"use client"

import { useDownloadSongMutation } from "@/redux/features/api";
import {  useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function YouTubeComp(){


    const [
            downloadSongMutation,{
              data:videoDetails,
              isLoading: isSongDownloading,
              isSuccess:hasSongDownloaded,
              isError:isErrorDownloadingSong,
              error:songDownloadingError,
        }] =useDownloadSongMutation()
    
    
    const [videoURL, setVideoURL] = useState('');
    const [downloadType, setDownloadType] = useState('mp3');
    const [formError, setFormError] = useState(null);

    useEffect(()=>{
      if(isErrorDownloadingSong){
        console.log(songDownloadingError)
        if(songDownloadingError.data.error.includes( "does not match expected format")){
          toast.error("Invalid Video Id")
          return
        }else if(songDownloadingError.data.error.includes( "Video unavailable")){
          toast.error("Video Id does not exists")
          return
        }
        toast.error("Something went wrong .Please try again later")
          

      }
    },[isErrorDownloadingSong,isSongDownloading])


    const handleVideoURLChange = (event) => {
        setVideoURL(event.target.value);
    };

    const handleDownloadTypeChange = (event) => {
        setDownloadType(event.target.value);
    };

    const handleSubmit = async(event) => {
        try {
            event.preventDefault();
            // Handle form submission logic here, e.g., initiate download
            const videoId = new URL(videoURL).searchParams.get('v');

            downloadSongMutation({videoId, type:downloadType})
            
        } catch (error) {
            setVideoURL("")
            setDownloadType("mp3")
            setFormError(error.message)
            console.log('Error:', {error});
        }
    };

    return (
    <div className="p-3">
      <Toaster/>
        <h1 className='mb-4 font-bold'>Download Video  through youtube link</h1>
        {formError?<p className="text-red-600">{formError}</p>:null}
        <form className="text-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="videoURL" className="block mb-2">Paste the youtube url:</label>
          <input
            type="text"
            id="videoURL"
            name="videoURL"
            value={videoURL}
            onChange={handleVideoURLChange}
            placeholder="E.g.,https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <span className="block mb-2">Select Download Type:</span>
          <div className="flex items-center">
            <input
              type="radio"
              id="audio"
              name="downloadType"
              value="mp3"
              checked={downloadType === 'mp3'}
              onChange={handleDownloadTypeChange}
              className="mr-2"
            />
            <label htmlFor="audio" className="mr-4">Audio</label>
            <input
              type="radio"
              id="video"
              name="downloadType"
              value="mp4"
              checked={downloadType === 'mp4'}
              onChange={handleDownloadTypeChange}
              className="mr-2"
            />
            <label htmlFor="video">Video</label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Search
        </button>

        {(hasSongDownloaded && !isSongDownloading)&&
        <div>
          {videoDetails.type === "mp3"?
          <audio  src={videoDetails.url} controls></audio>:
          <video src={videoDetails.url} controls></video>
          }

        </div>
        }
      </form>
        
    </div>
    );

}
