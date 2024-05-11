import { getToken } from "next-auth/jwt"
import prisma from "@/db/dbConfig"
import { NextResponse } from "next/server"
import { UNAUTHENTICATED } from "@/helper/ImportantStrings";


export async function GET(req) {
      try {
            const token = await getToken({
              req,
              secret: process.env.NEXTAUTH_SECRET,
              cookieName: "__Secure-next-auth.session-token"
            });

            if(!token){
                  return NextResponse.json({error:UNAUTHENTICATED},{status:401})
            }
            

            // TODO get id from cookies token
            const playlist = await prisma.playList.findMany({
                  where: {
                        userId: token.id,
                  },
                  select:{
                        playlistName:true,
                        playlistId:true
                  }
            })
            return NextResponse.json(playlist)
      } catch (error) {
            console.log(error)
            return NextResponse.json({error:error.message,successful:false},{status:400})
      }
      
}
export async function  POST(req) {

      try {
            const token = await getToken({
              req,
              secret: process.env.NEXTAUTH_SECRET,
              cookieName: "__Secure-next-auth.session-token"
            });

            if(!token){
                  return NextResponse.json({error:UNAUTHENTICATED},{status:401})
            }

            const reqBody = await req.json();
            const { songObj, playlist } = reqBody;
        
            // 1. Check if the song exists in the database
            let song = await prisma.song.findUnique({
              where: {
                youtubeId: songObj.youtubeId //  youtubeId is unique
              }
            });
        
            // 2. If the song doesn't exist, create it
            if (!song) {
              song = await prisma.song.create({
                data: songObj
              });
            }
        
            // 3. Check if playlists exist, if not create them
            const playlists = await Promise.all(
              playlist.map(async (playlistData) => {
                let existingPlaylist = await prisma.playList.findFirst({
                  where: {
                    userId: token.id,
                    playlistName: playlistData
                  }
                });
        
                if (!existingPlaylist) {
                        existingPlaylist = await prisma.playList.create({
                              data: {
                                    userId: token.id,
                                    playlistName: playlistData
                              }
                        });
                  }
        
                return existingPlaylist;
              })
            );

        
            // 4. Update playlists with the new song ID
            await Promise.all(
              playlists.map(async (playlistData) => {
                await prisma.playList.update({
                  where: {
                    playlistId: playlistData.playlistId
                  },
                  data: {
                    song: {
                      connect: { songId: song.songId }
                    }
                  }
                });
              })
            );
        
            return NextResponse.json({success:true},{status:200})
          } catch (error) {
            console.log(error)
            return NextResponse.json({error:error.message,successful:false},{status:400})
      }
      
}
