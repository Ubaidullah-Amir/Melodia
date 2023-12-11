import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import prisma from "@/db/dbConfig"
import { EMAIL_TYPE_FORGETPASSWORD, EMAIL_TYPE_VERIFY, ERROR_IN_SENDEMAIL } from "./ImportantStrings";


export async function sendEmail(userID,email,emailType) {
      // send mail with defined transport object
      try {
            
            const hashedToken = await bcryptjs.hash(userID,10)
            if(emailType === EMAIL_TYPE_VERIFY){
                  await prisma.user.update({
                        where: {
                              id: userID, // Specify the user ID to update
                        },
                        data: {
                              verifyToken: hashedToken, // Update the verifyToken field
                              verifyTokenExpiry: new Date(Date.now() + 3600000), // Update the verifyTokenExpiry field
                        },
                  });
            }else if(emailType === EMAIL_TYPE_FORGETPASSWORD){
                  const updatedUser = await prisma.user.update({
                        where: {
                              id: userID, // Specify the user ID to update
                        },
                        data: {
                              forgotpasswordtoken:hashedToken, // Update the verifyToken field
                              forgotpasswordtokenexpiry: new Date(Date.now() + 3600000), // Update the verifyTokenExpiry field
                        },
                  });
            }
            const transport = nodemailer.createTransport({
                  host: "sandbox.smtp.mailtrap.io",
                  port: 2525,
                  auth: {
                        user: process.env.NODEMAILERUSERID,
                        pass: process.env.NODEMAILERPASSWORD
                  }
            });
            const emailOptions= {
                  from: 'ubaid@gmail.com', // sender address (even faulty email address is working )
                  to: email, // receiver address
                  subject: emailType===EMAIL_TYPE_VERIFY?"Verify Email":"Reset Password", // Subject line
                  text: "Hello world?", // plain text body
                  html: `<p>"Please note, the token provided is valid for one hour. Requesting a new email will render the previous token invalid. If the token has expired, password changes cannot be processed for security reasons."
                  Click <a href=${emailType===EMAIL_TYPE_VERIFY?`${process.env.DOMAIN_URL}/verifyEmailToken?token=${hashedToken}`:`${process.env.DOMAIN_URL}/resetPasswordToken?token=${hashedToken}&email=${email}`}>Here</a> to ${emailType===EMAIL_TYPE_VERIFY?"verify email":"to reset password"}</p>`, // html body
            }
            const mailResponse = await transport.sendMail(emailOptions)
            console.log("Message sent: %s", mailResponse.messageId)

      } catch (error) {
            console.error(error.message)
            throw new Error(ERROR_IN_SENDEMAIL)
      }
      
}