// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const baseUrl = "http://localhost:3000/api/"
export const MelodiaApi = createApi({
  reducerPath: 'MelodiaApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
  tagTypes: ['user',"playlist"],
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
    


    // playlist
    getPlaylist: builder.query({
      query: () => "playlist",
      providesTags:["playlist"]
    }),
    addSongToPlaylist: builder.mutation({
      query: (obj) => ({
            url:"playlist",
            method: "POST",
            body: obj         // obj = {playlist:["",...],songObj:{youtubeId:"",songUrl:"",songName:""}}
      }),
      invalidatesTags: ["playlist"],
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
} = MelodiaApi