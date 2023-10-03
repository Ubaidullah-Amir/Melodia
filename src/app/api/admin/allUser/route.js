import prisma from "@/db/dbConfig"
import { NextResponse } from "next/server"


export async function GET(req) {
      try {
            const users = await prisma.user.findMany({
                  select:{
                        id:true,
                        username:true,
                        email:true,
                        image:true
                  }
            })
            return NextResponse.json({data:users,message:"all users"})
      } catch (error) {
            console.log(error)
            return NextResponse.json({error:error.message,successful:false},{status:400})
      }
      
}