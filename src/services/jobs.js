// src/services/jobApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://xwave-job-backend.vercel.app",
  }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/api/jobs",
    }),
    getJobById: builder.query({
      query: (id) => `/api/jobs/${id}`,
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/api/jobs/${id}`,
        method: "DELETE",
      }),
    }),
    appliedJob: builder.mutation({
      query: (jobDetails) => ({
        url: `/user/applied/jobs`,
        method: "POST",
        body: jobDetails,
      }),
    }),
    getAppliedJob: builder.query({
      query: (userId) => `/user/applied/jobs/${userId}`,
    }),
    addWishList: builder.mutation({
      query: (jobDetails) => ({
        url: `/user/wishlist`,
        method: "POST",
        body: jobDetails,
      }),
    }),
    getWishlistJob: builder.query({
      query: (userId) => `/user/wishlist/${userId}`,
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useDeleteJobMutation,
  useAppliedJobMutation,
  useGetAppliedJobQuery,
  useAddWishListMutation,
  useGetWishlistJobQuery
} = jobApi;

export default jobApi;
