import prisma from "@/db/dbConfig"
import { RESET_PASSWORD_TOKEN_EXPIRED } from "@/helper/ImportantStrings";
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function  POST(req) {
      try {
            
            const reqBody = await req.json()
            const {email,token,newPassword} = reqBody
            const user = await prisma.user.findFirst({
                  where: {
                    email: email,
                    forgotpasswordtoken: token,
                    forgotpasswordtokenexpiry: {
                      // Date greater than the current date
                      gt: new Date().toISOString(),
                    },
                  },
                });
            if (!user) {
                  return NextResponse.json({error:"reset password token has expired",errorCode:RESET_PASSWORD_TOKEN_EXPIRED },{status:404})
            }
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(newPassword, saltRounds);

            // updating the password
            await prisma.user.update({
                  where: {
                    id: user.id,
                  },
                  data: {
                    password: hashPassword, // Update the password
                    forgotpasswordtoken: null,
                    forgotpasswordtokenexpiry:null
                  },
                });
            return NextResponse.json({message:"password is updated successfully"})
      } catch (error) {
            return NextResponse.json({error:error.message,successful:false},{status:500})
      }
      
}