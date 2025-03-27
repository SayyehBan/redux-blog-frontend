import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { blogDelete, blogGetAll, blogInsert, blogUpdate } from "../services/blogsServices";
import { PostReactionsUpdate } from "../services/postReactionsService";

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
export const updateBlog = createAsyncThunk("/blogs/updateBlog",
    async blog => {
        const response = await blogUpdate(blog);
        return response.data;
    });
export const updateReaction = createAsyncThunk("/blogs/updateReaction",
    async ({ blogID, reaction }, { getState }) => {
        const state = getState();
        const existingBlog = state.blogs.blogs.find((blog) => blog.blogID === blogID);

        if (!existingBlog) {
            throw new Error("Blog not found");
        }

        const currentReactions = {
            blogID,
            thumbsUp: existingBlog.thumbsUp || 0,
            hooray: existingBlog.hooray || 0,
            heart: existingBlog.heart || 0,
            rocket: existingBlog.rocket || 0,
            eyes: existingBlog.eyes || 0,
        };

        currentReactions[reaction] = (currentReactions[reaction] || 0) + 1;

        const response = await PostReactionsUpdate(currentReactions);
        return response.data;
    }
);

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
            const { blogID, reaction } = action.payload;
            const existingBlog = state.blogs.find((blog) => blog.blogID === blogID);
            if (existingBlog) {
                existingBlog[reaction] = (existingBlog[reaction] || 0) + 1;
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
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                const updatedBlog = action.payload;
                const existingBlog = state.blogs.find((blog) => blog.blogID === updatedBlog.blogID);
                if (existingBlog) {
                    Object.assign(existingBlog, updatedBlog);
                }
            })
            .addCase(updateReaction.fulfilled, (state, action) => {
                const updatedReactions = action.payload;
                const existingBlog = state.blogs.find((blog) => blog.blogID === updatedReactions.BlogID || blog.blogID === updatedReactions.blogID);
                if (existingBlog) {
                    existingBlog.thumbsUp = updatedReactions.ThumbsUp ?? updatedReactions.thumbsUp ?? existingBlog.thumbsUp;
                    existingBlog.hooray = updatedReactions.Hooray ?? updatedReactions.hooray ?? existingBlog.hooray;
                    existingBlog.heart = updatedReactions.Heart ?? updatedReactions.heart ?? existingBlog.heart;
                    existingBlog.rocket = updatedReactions.Rocket ?? updatedReactions.rocket ?? existingBlog.rocket;
                    existingBlog.eyes = updatedReactions.Eyes ?? updatedReactions.eyes ?? existingBlog.eyes;
                }
            });
    },
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogById = (state, blogID) => state.blogs.blogs.find((blog) => blog.blogID === parseInt(blogID));

export const selectBlogByAuthor = createSelector(
    [selectAllBlogs, (state, authorID) => authorID],
    (blogs, authorID) => blogs.filter((blog) => parseInt(blog.authorID) === parseInt(authorID))
);

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } = blogsSlice.actions;

export default blogsSlice.reducer;