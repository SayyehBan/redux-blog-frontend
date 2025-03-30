import {
    createEntityAdapter,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const authorsAdapter = createEntityAdapter({
    selectId: (author) => author.authorID,
});

const initialState = authorsAdapter.getInitialState();

export const extendedAuthorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAuthors: builder.query({
            query: () => "Authors/GetAll",
            transformResponse: (responseData) => {
                return authorsAdapter.setAll(initialState, responseData);
            },
        }),

    }),
});
export const selectAuthorsResult = extendedAuthorsApiSlice.endpoints.getAuthors.select();

const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {},
});
const selectAuthorsData = createSelector(
    selectAuthorsResult,
    (authorsResult) => authorsResult.data
);
export const {
    selectAll: selectAllAuthors,
    selectById: selectAuthorById,
} = authorsAdapter.getSelectors(
    (state) => selectAuthorsData(state) ?? initialState
);
export const {
    useGetAuthorsQuery,
} = extendedAuthorsApiSlice;
export default authorsSlice.reducer;
