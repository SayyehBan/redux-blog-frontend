import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "../reducers/blogSlice";
import usersReducer, { fetchUsers } from "../reducers/usersSlice";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        users: usersReducer
    },
});
store.dispatch(fetchUsers());