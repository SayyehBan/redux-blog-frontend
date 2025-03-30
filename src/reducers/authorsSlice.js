import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const extendedAuthorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAuthors: builder.query({
            query: () => "Authors/GetAll",
            providesTags: ["Authors"],
        }),
        addNewAuthor: builder.mutation({
            query: (initialAuthor) => ({
                url: "Authors/Insert",
                method: "POST",
                body: {
                    ...initialAuthor,
                },
            }),
            invalidatesTags: ["Authors"],
        }),
        deleteAuthor: builder.mutation({
            query: ({ authorID }) => ({
                url: `Authors/Delete?AuthorID=${authorID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Authors"],
        }),
    }),
});
const emptyAuthors = [];
export const selectAuthorsResult = extendedAuthorsApiSlice.endpoints.getAuthors.select();

export const selectAllAuthors = createSelector(
    selectAuthorsResult,
    (authorsResult) => authorsResult?.data ?? emptyAuthors
);

export const selectAuthorById = createSelector(
    [selectAllAuthors, (_, authorID) => authorID],
    (authors, authorID) => authors.find((author) => author.authorID === authorID)
);

const authorsSlice = createSlice({
    name: "authors",
    initialState: emptyAuthors,
    reducers: {},
});

export const {
    useGetAuthorsQuery,
    useAddNewAuthorMutation,
    useDeleteAuthorMutation,
} = extendedAuthorsApiSlice;
export default authorsSlice.reducer;
