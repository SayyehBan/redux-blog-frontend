import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5084/api/" }),
    tagTypes: ["Blogs"], // اضافه کردن tag برای مدیریت کش
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "Blogs/GetAll",
            providesTags: ["Blogs"], // مشخص کردن اینکه این endpoint کش را فراهم می‌کند
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
            invalidatesTags: ["Blogs"], // کش را بعد از اضافه کردن بلاگ جدید نامعتبر می‌کند
            async onQueryStarted(blog, { dispatch, queryFulfilled }) {
                try {
                    const { data: newBlog } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getBlogs", undefined, (draft) => {
                            draft.push(newBlog); // اضافه کردن بلاگ جدید به کش
                        })
                    );
                } catch (error) {
                    console.error("Error updating cache:", error);
                }
            },
        }),
    }),
});

export const { useGetBlogsQuery, useGetBlogQuery, useAddNewBlogMutation } = apiSlice;