import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addNewBlog } from "../reducers/blogSlice";

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
        addNewBlog: builder.mutation({
            query: (blog) => {
                const formData = new FormData();
                formData.append("Title", blog.title);
                formData.append("Contents", blog.contents);
                formData.append("AuthorID", parseInt(blog.authorID));
                return {
                    url: "Blogs/Insert",
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});
export const { useGetBlogsQuery, useGetBlogQuery, useAddNewBlogMutation } = apiSlice;