
import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';

export async function POST(req) {
  
  try {
    const reqBody = await req.json();
    const {videoId,type}  = reqBody;
    const url = `https://www.youtube.com/watch?v=${videoId}`
    const info = await ytdl.getInfo(url);
    if(type === "mp3"){
      const videoFormat = ytdl.filterFormats(info.formats,"audioonly")
      const format = ytdl.chooseFormat(videoFormat,{quality:"highestaudio"})
      return NextResponse.json({url:format.url,type})

    }else{
      const videoFormat = ytdl.filterFormats(info.formats,"video")
      const format = ytdl.chooseFormat(videoFormat,{quality:"highestvideo"})
      return NextResponse.json({url:format.url,type})

    }
    
    

    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message,successful:false},{status:400})
    }
}
