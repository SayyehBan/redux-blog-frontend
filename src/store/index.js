import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/blogSlice";
import authorsReducer, { fetchAuthor } from "../reducers/authorsSlice";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        authors: authorsReducer
    },
});

store.dispatch(fetchAuthor());