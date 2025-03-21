import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns-jalali";

const initialState = [
    {
        id: nanoid(),
        date: sub(new Date(), { days: 5, hours: 3, minutes: 10 }).toISOString(),
        title: "اولین پست",
        content: "محتوای اولین پست ما ☺️",
        user: 1
    },
    {
        id: nanoid(),
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        title: "دومین پست",
        content: "دومین پست ما میباشد درود دنیا 🤗",
        user: 2
    },
    {
        id: nanoid(),
        date: sub(new Date(), { minutes: 1 }).toISOString(),
        title: "سومین پست",
        content: "سومین پست ما میباشد درود دنیا 🤗",
        user: 3
    }
];
const blogsSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers: {
        blogAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                    },
                };
            },
        },
        blogUpdated: (state, action) => {
            const { id, title, content } = action.payload;
            const existingBlog = state.find((blog) => blog.id === id);
            if (existingBlog) {
                existingBlog.title = title;
                existingBlog.content = content;
            }
        },
        blogDeleted: (state, action) => {
            const { id } = action.payload;
            state = state.filter((blog) => blog.id !== id);
            return state;

        }
    },
});
export const selectAllBlogs = (state) => state.blogs;
export const selectBlogById = (state, blogId) =>
    state.blogs.find((blog) => blog.id === blogId);
export const { blogAdded, blogUpdated, blogDeleted } = blogsSlice.actions;
export default blogsSlice.reducer;
