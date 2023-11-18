import axios from "axios"
export default async function getSpotifyToken() {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
      const scope =["streaming",
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-library-read",
      "user-library-modify"]

      const data = new URLSearchParams();

      data.append('grant_type', 'client_credentials');
      data.append('client_id', clientId);
      data.append('client_secret', clientSecret);
      data.append('scope', scope);
      const config = {
      headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
      }
      };

      try {
            const response = await axios.post('https://accounts.spotify.com/api/token', data, config);
            return response.data.access_token;
      } catch (error) {
            console.error('Error:', error);
      }
}
