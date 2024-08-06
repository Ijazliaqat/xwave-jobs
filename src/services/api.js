// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://xwave-job-backend.vercel.app' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
        query: (credentials) => ({
          url: '/api/auth/signup',
          method: 'POST',
          body: credentials,
        }),
      }),
    getUser: builder.query({
      query: (id) => `user/${id}`,
    }),
  }),
});

export const { useLoginMutation, useSignupMutation ,useGetUserQuery } = api;
export default api;
