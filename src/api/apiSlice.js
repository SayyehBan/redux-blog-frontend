import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5084/api/" }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "Blogs/GetAll",
        }),
        getBlog: builder.query({
            query: (blogID) => `Blogs/FindID?BlogID=${blogID}`,
        }),

    }),
});
export const { useGetBlogsQuery, useGetBlogQuery } = apiSlice;