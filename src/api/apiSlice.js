import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5084/api/" }),
    tagTypes: ["Blogs"], // اضافه کردن tag برای مدیریت کش
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "Blogs/GetAll",
            providesTags: (result = [], error, arg) => [
                ...result.map(({ blogID }) =>
                    ({ type: "Blogs", id: blogID })),
                "Blogs"],
        }),
        getBlog: builder.query({
            query: (blogID) => `Blogs/FindID?BlogID=${blogID}`,
            providesTags: (result, error, arg) => [
                { type: "Blogs", id: arg },
            ]
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
            invalidatesTags: ["Blogs"],
        }),
        editBlog: builder.mutation({
            query: (blog) => {
                const formData = new FormData();
                formData.append("BlogID", parseInt(blog.blogID));
                formData.append("Title", blog.title);
                formData.append("Contents", blog.contents);
                return {
                    url: "Blogs/Update",
                    method: "PUT",
                    body: formData,
                };
            },
            invalidatesTags: (result, error, arg) => [
                { type: "Blogs", id: arg.blogID },
            ],

        }),
        deleteBlog: builder.mutation({
            query: (blogID) => ({
                url: `Blogs/Delete?BlogID=${parseInt(blogID)}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Blogs", id: arg.blogID },
            ],
        })
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogQuery,
    useAddNewBlogMutation,
    useEditBlogMutation,
    useDeleteBlogMutation,
} = apiSlice;
