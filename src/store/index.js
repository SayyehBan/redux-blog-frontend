import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/blogSlice";
import authorsReducer, { extendedAuthorsApiSlice } from "../reducers/authorsSlice";
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        authors: authorsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

// store.dispatch(fetchAuthor());
store.dispatch(extendedAuthorsApiSlice.endpoints.getAuthors.initiate());