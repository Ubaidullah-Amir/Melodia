

// not actually a hook 

import { getToken } from "next-auth/jwt";

// when running locally remove the cookieName and secret. These are only used for deployment on Vercel .
// vercel changes the cookieName .

const useGetToken =async (req)=>{
    const token = await getToken({
        req,
        // secret: process.env.NEXTAUTH_SECRET,
        // cookieName: "__Secure-next-auth.session-token"
      });
    return token
}

export default useGetToken;
