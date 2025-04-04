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
            providesTags: ["Authors"],
        }),
        addNewAuthor: builder.mutation({
            query: (author) => {
                const formData = new FormData();
                formData.append('FirstName', author.firstName);
                formData.append('LastName', author.lastName);
                return {
                    url: "Authors/Insert",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Authors"],
        }),
        deleteAuthor: builder.mutation({
            query: (authorID) => ({
                url: `Authors/Delete?AuthorID=${authorID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Authors"],
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
    useAddNewAuthorMutation,
    useDeleteAuthorMutation,
} = extendedAuthorsApiSlice;
export default authorsSlice.reducer;
