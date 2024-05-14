// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BaseURL from '../../../BaseURL'

// Define a service using a base URL and expected endpoints

export const MelodiaApi = createApi({
  reducerPath: 'MelodiaApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseURL}),
  tagTypes: ['user',"playlist","PlaylistById","Tags","artist"],
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

    // tags
    getTags: builder.query({  //gets the tags  {userID by token}
      query: () => "tags",
      providesTags:["Tags"]
    }),
    // updating Tags
    updateTags: builder.mutation({   //used to update tags in Preference table
      query: ({ preferenceId, updatedTags }) => ({
        url: `/tags`,
        method: 'PUT',
        body: { preferenceId, updatedTags },   //{id , [...tags element]}
      }),
      invalidatesTags: ["Tags"],
    }),



    
    // download the song
    downloadSong: builder.mutation({
      query: (obj) => ({
            url:"download",
            method: "POST",
            body: obj     //obj={videoId:"",type:"mp4" or "mp3",}
      }),
    }),
    // get youtube songs based on search value
    getGoogleApiSearch: builder.query({
        query: (search) => `googleApi/${search}`,
        providesTags:["search"]
      }),



// get the top Artist external from Last.fm
      getTopArtist: builder.query({
        query: () => `topArtist`,
        providesTags:["artist"]
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
  // tags
  useGetTagsQuery,
  useUpdateTagsMutation,

  // download
  useDownloadSongMutation,
  // google search songs
  useGetGoogleApiSearchQuery,
  useGetTopArtistQuery

} = MelodiaApi