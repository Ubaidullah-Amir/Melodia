import { getToken } from "next-auth/jwt"
import prisma from "@/db/dbConfig"
import { NextResponse } from "next/server"
import { UNAUTHENTICATED } from "@/helper/ImportantStrings";


export async function GET(req) {
    console.log("req",req)
    NextResponse.json({success:true},{status:200})
    //   try {
    //         const token = await getToken({ req });

    //         if(!token){
    //               return NextResponse.json({error:UNAUTHENTICATED},{status:401})
    //         }
            

    //         // TODO get id from cookies token
    //         const playlist = await prisma.playList.findMany({
    //               where: {
    //                     userId: token.id,
    //               },
    //               select:{
    //                     playlistName:true,
    //                     playlistId:true
    //               }
    //         })
    //         return NextResponse.json(playlist)
    //   } catch (error) {
    //         console.log(error)
    //         return NextResponse.json({error:error.message,successful:false},{status:400})
    //   }
      
}