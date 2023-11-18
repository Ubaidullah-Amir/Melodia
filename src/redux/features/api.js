// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const baseUrl = "http://localhost:3000/api/"
export const MelodiaApi = createApi({
  reducerPath: 'MelodiaApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "user",
      providesTags:["user"]
    }),
    postUser: builder.mutation({
      query: (user) => ({
            url:"user",
            method: "POST",
            body: user
      }),
      invalidatesTags: ["user"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery,usePostUserMutation } = MelodiaApi