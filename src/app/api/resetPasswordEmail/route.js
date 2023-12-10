import prisma from "@/db/dbConfig"
import { EMAIL_NOT_SENT, ERROR_IN_SENDEMAIL, USER_NOT_EXIST } from "@/helper/ImportantStrings";
import { sendEmail } from "@/helper/sendEmail";
import { NextResponse } from "next/server"

export async function  POST(req) {
      try {
            
            const reqBody = await req.json()
            const {email} = reqBody
            const user = await prisma.user.findFirst({
                  where: {
                    email: email,
                  },
            });
            if (!user) {
                  return NextResponse.json({error:"User not found",errorCode:USER_NOT_EXIST},{status:404})
            }
            // send the mail
            await sendEmail(user.id,user.email,"FORGETPASSWORD")  // this returns the NextResponse if error
            return NextResponse.json({message:"Mail has been sent"})
      } catch (error) {
            if (error.message === ERROR_IN_SENDEMAIL) return NextResponse.json({error:"error in sending the mail",successful:false,errorCode:EMAIL_NOT_SENT},{status:500})
            return NextResponse.json({error:error.message,successful:false},{status:500})
      }
      
}