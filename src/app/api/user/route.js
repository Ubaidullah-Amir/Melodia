import prisma from "@/db/dbConfig"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
// const users = [
//       {
//             name:"ubaid",
//             age:"20",
//       },
//       {
//             name:"zain",
//             age:"30",
//       },
//       {
//             name:"huz",
//             age:"30",
//       }
// ]
// export async function GET(req) {
//       try {
            
//             // TODO get id from cookies token
//             const user = await prisma.user.findUnique({})
//             // console.log(user)
//             return NextResponse.json({data:user})
//       } catch (error) {
//             console.log(error.message)
//             return NextResponse.json({error:error.message,successful:false},{status:400})
//       }
      
// }
export async function  POST(req) {
      try {
            
            const reqBody = await req.json()
            const {username,password,email} = reqBody
            const user = await prisma.user.findFirst({
                  where:{
                        email
                  }
            })
            if(user){
                  console.log("user Found")
                  return NextResponse.json({error:"USER_EXISTS",successful:false},{status:400})
            }
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(password, saltRounds);


            const newUser = await prisma.user.create({
                  data:{
                        username,
                        email,
                        password:hashPassword
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
            console.log("error in user post",error);
            return NextResponse.json({error:error.message,successful:false},{status:500})
      }
      
}