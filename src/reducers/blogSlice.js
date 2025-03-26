import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogDelete, blogGetAll, blogInsert } from "../services/blogsServices";

const initialState = {
    blogs: [],
    status: "idle",
    error: null,
};

export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
    const response = await blogGetAll();
    return response.data;
});
export const addNewBlog = createAsyncThunk("/blogs/addNewBlog",
    async initialBlog => {
        const response = await blogInsert(initialBlog);
        return response.data;
    });
export const deleteBlog = createAsyncThunk("/blogs/deleteBlog",

    async blogID => {
        await blogDelete(blogID);
        return blogID;
    });
const blogsSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers: {
        blogAdded: {
            reducer(state, action) {
                state.blogs.push(action.payload);
            },
            prepare(title, contents, authorID) {
                return {
                    payload: {
                        title,
                        contents,
                        authorID,
                    },
                };
            },
        },
        blogUpdated: (state, action) => {
            const { blogID, title, contents } = action.payload;
            const existingBlog = state.blogs.find((blog) => blog.blogID === blogID);
            if (existingBlog) {
                existingBlog.title = title;
                existingBlog.contents = contents;
            }
        },
        blogDeleted: (state, action) => {
            const { blogID } = action.payload;
            state.blogs = state.blogs.filter((blog) => blog.blogID !== blogID);
        },
        reactionAdded: (state, action) => {
            const { blogId, reaction } = action.payload;
            const existingBlog = state.blogs.find((blog) => blog.blogID === blogId); // اصلاح id به blogID
            if (existingBlog) {
                existingBlog[reaction] = (existingBlog[reaction] || 0) + 1; // اصلاح ساختار reactions
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "completed";
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewBlog.fulfilled, (state, action) => {
                state.blogs.push(action.payload);
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.blogs = state.blogs.filter((blog) => blog.blogID !== action.payload);

            });
    },
});

export const selectAllBlogs = (state) => {
    const blogs = state.blogs.blogs;
    return blogs;
};

export const selectBlogById = (state, blogId) => {
    const blog = state.blogs.blogs.find(
        (blog) => blog.blogID === parseInt(blogId)
    );
    return blog;
};

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } =
    blogsSlice.actions;

export default blogsSlice.reducer;
