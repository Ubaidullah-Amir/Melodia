import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default  withAuth(
      // `withAuth` augments your `Request` with the user's token.
      function middleware(req) {
            // with this token and matcher you can redirect any route authorized return token?true:false
            // apis are not protected because authorized cant get token from api request
            // console.log("token in middleware :",req.nextauth.token)
            
            // return NextResponse.redirect(new URL('/admin',req.url))
      },
      {
            callbacks: {
                  authorized: ({ token }) => {
                        console.log("token in middleware :",token)
                        if(!token) return false
            },
            },
      }
)

export const config = { matcher: [
      // "/",
      "/api/admin/:path*"
] }