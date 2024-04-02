// import { NextResponse } from "next/server"
// import ytdl from "ytdl-core";

// export async function POST(req,res) {
//       try {
//             // const token = await getToken({ req });

//             // if(!token){
//             //       return NextResponse.json({error:UNAUTHENTICATED},{status:401})
//             // }
//             const reqBody = await req.json();
//             const {videoId,type}  = reqBody;
//             const randomName = Math.random().toString(36).substring(2, 15);

//             const responseHeaders = new Headers(res.headers);

//             const url = `https://www.youtube.com/watch?v=${videoId}`
//             console.log(url)


//             if(type === "mp3"){
//                 responseHeaders.set(
//                     "Content-Disposition",
//                     `attachment; filename="${randomName}.mp3"`,
//                 );
//                 responseHeaders.set(
//                     "Content-Type",
//                     "audio/mpeg",
//                 );
//                 const data = ytdl(url, {
//                         format: 'mp3',
//                         filter: 'audioonly',
//                     }).pipe(res);
//                 console.log(data)

//                 return new Response(data , {
//                     headers: responseHeaders,
//                 });
               
//             }else if(type === "mp4"){
//                 responseHeaders.set(
//                     "Content-Disposition",
//                     `attachment; filename="${randomName}.mp4"`,
//                 );
//                 responseHeaders.set(
//                     "Content-Type",
//                     "video/mp4",
//                 );
//                 // await ytdl(url).pipe(res);
//                 return new Response(data , {
//                     headers: responseHeaders,
//                 });
//             }
//             return new Response();
      
//       } catch (error) {
//             console.log(error)
//             return NextResponse.json({error:error.message,successful:false},{status:400})
//       }
      
// }

import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';

export async function POST(req) {
  
  try {
    // const token = await getToken({ req });

    // if(!token){
    //       return NextResponse.json({error:UNAUTHENTICATED},{status:401})
    // }
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
