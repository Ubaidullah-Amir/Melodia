"use client"
import { useSession } from 'next-auth/react';
import React from 'react';
// async function fetchAlbum() {
      // const token = await getToken({ req })
      // if (token) {
            
      //       getAlbumData(token.spotifyAccessToken)
      //       const config = {
      //             headers: {
      //             'Authorization': `Bearer ${accessToken}`
      //             }
      //       };
            
      //       try {
      //             const response = await axios.get('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy', config);
      //             console.log('Album data:', response.data);
      //       } catch (error) {
      //             console.error('Error:', error);
      //       }
      //       }
      // }else {
      //       // Not Signed in
      //       return NextResponse.json({successful:false},{status:500})
      // }
// }
const page = () => {
      const { data: session, status } = useSession()

      if (status === "authenticated") {
            return <p>Signed in as {session.user.email}</p>
      }
      return (
            <div>

            </div>
      );
};

export default page;