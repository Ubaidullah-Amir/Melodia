import { getToken } from "next-auth/jwt"
import prisma from "@/db/dbConfig"
import { NextResponse } from "next/server"
import { UNAUTHENTICATED } from "@/helper/ImportantStrings";


export async function GET(req,context) {
    
    try {
        const token = await getToken({ req });

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