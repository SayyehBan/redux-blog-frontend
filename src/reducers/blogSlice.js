import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {
        id: nanoid(),
        date: new Date().toISOString(),
        title: "اولین پست",
        content: "محتوای اولین پست ما ☺️",
    },
    {
        id: nanoid(),
        date: new Date().toISOString(),
        title: "دومین پست",
        content: "دومین پست ما میباشد سلام دنیا 🤗",
    },
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
    },
});
export const { blogAdded } = blogsSlice.actions;
export default blogsSlice.reducer;
