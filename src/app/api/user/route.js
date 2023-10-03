import prisma from "@/db/dbConfig"
import { NextResponse } from "next/server"


export async function GET(req) {
      try {
            // TODO get id from cookies token
            const user = await prisma.user.findUnique({where:id})
            console.log(user)
            return NextResponse.json({data:user,message:"user data"})
      } catch (error) {
            console.log(error)
            return NextResponse.json({error:error.message,successful:false},{status:400})
      }
      
}
export async function  POST(req) {
      try {
            
            const reqBody = await req.json()
            const {username,password,email} = reqBody
            const user = await prisma.user.findFirst({
                  where:{
                        email
                  }
            })
            console.log("user Found")
            if(user){
                  return NextResponse.json({error:"USER_EXISTS",successful:false},{status:400})
            }
            const newUser = await prisma.user.create({
                  data:{
                        username,
                        email,
                        password
                  },
                  select:{
                        id:true,
                        username:true,
                        email:true,
                        image:true
                  }
            })
            console.log("user created")
            return NextResponse.json({user:newUser,message:"user created"})
      } catch (error) {
            return NextResponse.json({error:error.message,successful:false},{status:500})
      }
      
}