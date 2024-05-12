import prisma from "@/db/dbConfig"
import { NextResponse } from "next/server"
import { INVALIDREQUEST, UNAUTHENTICATED } from "@/helper/ImportantStrings";
import useGetToken from "@/customHooks/useGetToken";


export async function GET(req) {
      try {
            const token = await useGetToken(req)

            if(!token){
                  return NextResponse.json({error:UNAUTHENTICATED},{status:401})
            }

            let mainTagsData = {}

            const existingPreference = await prisma.preference.findUnique({
                where: {
                    userId:  token.id,
                }
            });

            mainTagsData = existingPreference
        
            if (!existingPreference) {
                console.log("found nothing")
                // If preference doesn't exist, create a new one
                const newPreference = await prisma.preference.create({
                    data: {
                        userId: token.id,
                        theme: "",
                        tags: [], 
                    },
                });
                mainTagsData = newPreference

                
                // Now newPreference contains the newly created preference for the user
            }
        
            
            return NextResponse.json(mainTagsData)
      } catch (error) {
            console.log(error)
            return NextResponse.json({error:error.message,successful:false},{status:400})
      }
      
}
export async function  PUT(req) {

      try {
            const token = await useGetToken(req)

            if(!token){
                  return NextResponse.json({error:UNAUTHENTICATED},{status:401})
            }

            const reqBody = await req.json();
            const { preferenceId, updatedTags } = reqBody;
            if (!preferenceId || !updatedTags){
              return NextResponse.json({error:INVALIDREQUEST},{status:401})
            }

            const updatedPreference = await prisma.preference.update({
              where: {
                  userId: token.id,
                  preferenceId:preferenceId
              },
              data: {
                  tags: updatedTags,
              },
          });
            
            return NextResponse.json({success:true},{status:200})
          } catch (error) {
            console.log(error)
            return NextResponse.json({error:error.message,successful:false},{status:400})
      }
      
}
