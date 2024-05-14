import { NextResponse } from "next/server"

async function getTopArtists( limit = 10) {
    const url = `${process.env.LASTFM_ARTIST_URL}?method=chart.gettopartists&api_key=${process.env.LASTFM_ARTIST_KEY}&format=json&limit=${limit}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.artists && data.artists.artist) {
        return data.artists.artist
    } else {
        throw new Error("Unable to retrieve top artists.");
    }
}
export async function GET(req) {
    try {
        const topArtists = await getTopArtists(10);
        return NextResponse.json(topArtists)
    } catch (error) {
        //   console.log("error",error)
          return NextResponse.json({error:error.message,successful:false},{status:400})
    }
    
}