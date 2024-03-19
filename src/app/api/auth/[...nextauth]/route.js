import { OauthCreateUser, getUserInJWT } from "@/db/controller/user";
import prisma from "@/db/dbConfig"
// import getSpotifyToken from "@/helper/getSpotifyToken";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt"


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
      GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
      
            credentials: {
                  email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
                  password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                  // console.log("credentials",credentials)
                  // Add logic here to look up the user from the credentials supplied
                  const user = await prisma.user.findFirst({
                        where:{
                              email:credentials.email
                        },
                        select:{
                              email:true,
                              username:true,
                              isVerified:true,
                              isAdmin:true,
                              image:true,
                              id:true,
                              password:true
                        }
                  })

            
                  if (user) {
                        // Any object returned will be saved in `user` property of the JWT
                        // console.log("user",user)
                        const passMatched = await bcrypt.compare(credentials.password,user.password)
                        // remove the password if want to from user object (token)

                        return passMatched?user:null
                        
                  } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        return null
                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                  }
            }
      }),
            
      ],
      pages: {
            signIn: "/login",
      },
      callbacks:{
            async signIn({ account, profile }) {
                  if (account.provider === "google") {
                        // console.log("provider is Google")
                        if(profile.email_verified && profile.email.endsWith("@gmail.com")){
                              // verified email
                              // create a user if not there in db
                              try {
                                    const userData = {
                                          email:profile.email,
                                          name:profile.name,
                                          image:profile.picture
                                    }
                                    await OauthCreateUser(userData)
                                    return true
                              } catch (error) {
                                    // return false does not signin
                                    console.log(error)
                                    return false
                              }
                              
                        }else{
                              // not verified google email
                              return false 
                        }
                  }
                  // other provider
                  return true
            },
            async jwt({token,session,user,trigger,account}){
                  // console.log("user in next auth",user)
                  // console.log("token in next auth",token)
                  // console.log("session in next auth",session)
                  // console.log("account in next auth",account)
                  // trigger is used when update from useSession is used to update 
                  // token values (e.g. when user changes name in db so use update({name:"abc2"}))
                  // if(trigger==="update" && session?.name){}
                  // better to uppdate the name here so only need to run update function and all things change
                  if(user){
                        
                        let userDetail = user
                        if(account.provider === "google"){
                              userDetail = await getUserInJWT(user.email)
                        }

                        // console.log("userDetail in next auth",userDetail)
                        // create a new token with user 
                        const returnToken = {...token ,...userDetail}
                        if(!returnToken.username){
                              // get spotify token and place it in token OBJ
                              returnToken.username=token.name
                        }
                        // const spotifyAccessToken=await getSpotifyToken()
                        // returnToken.spotifyAccessToken=spotifyAccessToken
                        return returnToken
                  }
                  return token
            },
            async session({token,session,user}){
                  session.user=token
                  return session
            }
      },
      secret:process.env.NEXTAUTH_SECRET,
      session:{
            strategy:'jwt',
            
            // Seconds - How long until an idle session expires and is no longer valid.
            maxAge: 60*60,
      }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

