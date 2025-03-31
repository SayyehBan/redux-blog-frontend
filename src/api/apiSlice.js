import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Server_URL } from "../utilities/constants/contactValue";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: Server_URL }),
    tagTypes: ["Blogs"],
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "Blogs/GetAll",
            providesTags: (result = [], error, arg) => [
                ...result.map(({ blogID }) => ({ type: "Blogs", id: blogID })),
                "Blogs",
            ],
        }),
        getBlog: builder.query({
            query: (blogID) => `Blogs/FindID?BlogID=${blogID}`,
            providesTags: (result, error, arg) => [
                { type: "Blogs", id: arg },
                "Blogs",
            ],
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
                "Blogs",
            ],
        }),
        deleteBlog: builder.mutation({
            query: (blogID) => ({
                url: `Blogs/Delete?BlogID=${parseInt(blogID)}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Blogs", id: arg.blogID },
                "Blogs",
            ],
        }),
        UpdatedReactions: builder.mutation({
            async queryFn({ blogID, reaction }, { getState }, _, baseQuery) {
                const state = getState();
                const existingBlog =
                    state.api.queries[`getBlog("${blogID}")`]?.data ||
                    state.api.queries["getBlogs(undefined)"]?.data?.find(
                        (blog) => blog.blogID === blogID
                    );

                if (!existingBlog) {
                    return { error: { status: 404, message: "Blog not found" } };
                }

                const previousReactions = {
                    thumbsUp: existingBlog.thumbsUp || 0,
                    hooray: existingBlog.hooray || 0,
                    heart: existingBlog.heart || 0,
                    rocket: existingBlog.rocket || 0,
                    eyes: existingBlog.eyes || 0,
                };

                const updatedReactions = {
                    ...previousReactions,
                    [reaction]: (previousReactions[reaction] || 0) + 1,
                };

                const formData = new FormData();
                formData.append("BlogID", blogID);
                formData.append("ThumbsUp", updatedReactions.thumbsUp);
                formData.append("Hooray", updatedReactions.hooray);
                formData.append("Heart", updatedReactions.heart);
                formData.append("Rocket", updatedReactions.rocket);
                formData.append("Eyes", updatedReactions.eyes);

                const result = await baseQuery({
                    url: "PostReactions/Update",
                    method: "PUT",
                    body: formData,
                });

                if (result.error) {
                    return { error: result.error };
                }

                return { data: updatedReactions };
            },
            invalidatesTags: (result, error, arg) => [
                { type: "Blogs", id: arg.blogID },
                "Blogs",
            ],
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogQuery,
    useAddNewBlogMutation,
    useEditBlogMutation,
    useDeleteBlogMutation,
    useUpdatedReactionsMutation,
} = apiSlice;

export const selectBlogsResult = apiSlice.endpoints.getBlogs.select();