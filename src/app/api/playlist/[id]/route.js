
import prisma from "@/db/dbConfig"
import { NextResponse } from "next/server"
import {  UNAUTHENTICATED } from "@/helper/ImportantStrings";
import useGetToken from "@/customHooks/useGetToken";


export async function GET(req,context) {
    
    try {
        const token = await useGetToken(req)

        if(!token){
                return NextResponse.json({error:UNAUTHENTICATED},{status:401})
        }

        const { id:playlistId } = context.params;


        const playlistWithSongs = await prisma.playList.findUnique({
            where: {
              playlistId 
            },
            include: {
              song: true
            }
          });

        return NextResponse.json({playlist:playlistWithSongs},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message,successful:false},{status:400})
    }
    
}


// delete the connection of playlist with the song
export async function  PUT(req,context) {
  try {
    const token = await useGetToken(req)

    if(!token){
          return NextResponse.json({error:UNAUTHENTICATED},{status:401})
    }
    
    const reqBody = await req.json();
    const { songId } = reqBody;


    const { id:playlistId } = context.params;

    // Find the playlist belonging to the user and with the specified playlistName
    const updatedPlaylist = await prisma.playList.update({
      where: {
        playlistId: playlistId,
      },
      data: {
        song: {
          disconnect: [
            { songId: songId },
          ],
        },
      },
      select: {
        song: true,
      },
    })
  
    console.log("updatedPlaylist",updatedPlaylist)
    return NextResponse.json({success:true},{status:200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error:error.message,successful:false},{status:400})

}
}

