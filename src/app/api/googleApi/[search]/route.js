import youtubeDataApi from "@/lib/youtubeDataApi";
import { NextResponse } from "next/server"

async function getSongOnSearch(search){
        const queryParams = {
            key: process.env.YOUTUBEAPIKEY,
            q: search,
            type: "video",
            part: "snippet",
            videoCategoryId: "10",
            maxResults: "20"
        };
    const queryString = Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
    const url = youtubeDataApi + queryString;
    const response = await fetch(url)
    const data  = await response.json()
    return data
  }



export async function GET(req,context) {
    
    try {
        

        const { search } = context.params;
        const data = await getSongOnSearch(search)
        return NextResponse.json(data,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message,successful:false},{status:400})
    }
    
}
