import { getToken } from "next-auth/jwt"
import prisma from "@/db/dbConfig"
import { NextResponse } from "next/server"
import youtubeDataApi from '@/lib/youtubeDataApi';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

async function getDefaultPopularSongs(tagsString){
    let queryParams;
    if(tagsString){
        queryParams = {
            key: process.env.YOUTUBEAPIKEY,
            q: "vevo &&" +tagsString,
            type: "video",
            part: "snippet",
            videoCategoryId: "10",
            maxResults: "20"
        };
    }else{
        queryParams = {
            key: process.env.YOUTUBEAPIKEY,
            q: "vevo &&Taylor_Swift&&Ed_Sheeran",
            type: "video",
            part: "snippet",
            videoCategoryId: "10",
            maxResults: "20"
        };
    }
    const queryString = Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
    const url = youtubeDataApi + queryString;
    const response = await fetch(url)
    const data  = await response.json()
    return data
  }


export async function GET(req) {
    try {
          const session = await getServerSession(authOptions)
          if(!session){
            const data = await getDefaultPopularSongs()
            return NextResponse.json(data)
          }

          const existingPreference = await prisma.preference.findUnique({
              where: {
                  userId:  session.user.id,
              },
              select:{
                tags:true
              }
          });
          
        if (!existingPreference) {
            const data = await getDefaultPopularSongs()
            return NextResponse.json(data)
        }
        const tagsString = existingPreference.tags.join("&& ");
        const data = await getDefaultPopularSongs(tagsString)

        return NextResponse.json(data)
    } catch (error) {
          console.log(error)
          return NextResponse.json({error:error.message,successful:false},{status:400})
    }
    
}