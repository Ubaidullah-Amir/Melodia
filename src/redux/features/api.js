// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const baseUrl = "http://localhost:3000/api/"
export const MelodiaApi = createApi({
  reducerPath: 'MelodiaApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
  tagTypes: ['user',"playlist","PlaylistById"],
  endpoints: (builder) => ({
    // getUsers: builder.query({
    //   query: () => "user",
    //   providesTags:["user"]
    // }),
    // postUser: builder.mutation({
    //   query: (user) => ({
    //         url:"user",
    //         method: "POST",
    //         body: user
    //   }),
    //   invalidatesTags: ["user"],
    // }),
    postResetPasswordEmail: builder.mutation({
      query: (userEmail) => ({
            url:"resetPasswordEmail",
            method: "POST",
            body: userEmail
      }),
    }),
    verifyResetPassToken: builder.mutation({
      query: (postObj) => ({
            url:"verifyResetPasswordToken",
            method: "POST",
            body: postObj   //{email,newpassword,token}
      }),
    }),
    


    // playlist   (use for songs related stuff too)

    getPlaylist: builder.query({    //gets the names of playlists only
      query: () => "playlist",
      providesTags:["playlist"]
    }),


    addSongToPlaylist: builder.mutation({   //creates/updates the playlist with songs
      query: (obj) => ({
            url:"playlist",
            method: "POST",
            body: obj         // obj = {playlist:["",...],songObj:{youtubeId:"",songUrl:"",songName:""}}
      }),
      invalidatesTags: ["playlist", { type: 'PlaylistById' , playlistId: 'PROVIDED'}],
    }),

    //playlistById

    getPlaylistById: builder.query({  //gets the playlist with songs
      query: (playlistId) => `/playlist/${playlistId}`, 
      providesTags: (result, error, id) => [{ type: 'PlaylistById', id }],
    }),


    updatePlaylist: builder.mutation({   //used for deleting the connection of songs with playlist
      query: ({ playlistId, updatedData }) => ({
        url: `/playlist/${playlistId}`,
        method: 'PUT',
        body: updatedData,   //{songId:} 
      }),
      invalidatesTags: [{ type: 'PlaylistById', playlistId: 'PROVIDED' }],
    }),
    
    // download the song
    downloadSong: builder.mutation({
      query: (obj) => ({
            url:"download",
            method: "POST",
            body: obj     //obj={videoId:"",type:"mp4" or "mp3",}
      }),
    }),
    
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {

  // password helpers
  usePostResetPasswordEmailMutation,
  useVerifyResetPassTokenMutation,

  // playlist
  useGetPlaylistQuery,
  useAddSongToPlaylistMutation,

  // playlistByid
  useGetPlaylistByIdQuery,
  useUpdatePlaylistMutation,

  // download
  useDownloadSongMutation,

} = MelodiaApi