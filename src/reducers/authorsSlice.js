import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    deleteAuthor,
    getAllAuthors,
    insertAuthor,
} from "../services/authorsServices";

export const fetchAuthor = createAsyncThunk("/author/fetchUsers", async () => {
    const response = await getAllAuthors();
    return response.data;
});
export const authorDelete = createAsyncThunk(
    "/author/deleteAuthor",
    async (authorID) => {
        await deleteAuthor(authorID);
        return authorID;
    }
);
export const addAuthor = createAsyncThunk(
    "/author/addAuthor",
    async (author) => {
        const response = await insertAuthor(author);
        return response.data;
    }
);
const authorsSlice = createSlice({
    name: "authors",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAuthor.fulfilled, (state, action) => {
            return action.payload;
        }).addCase(authorDelete.fulfilled, (state, action) => {
            const authorID = action.payload;
            return state.filter((author) => author.authorID !== authorID);
        }).addCase(addAuthor.fulfilled, (state, action) => {
            state.push(action.payload);
        });
    },
});
export const selectAllAuthors = (state) => state.authors;
export const selectAuthorById = (state, authorID) => {
    const author = state.authors.find((author) => author.authorID === authorID);
    return author;
};

export default authorsSlice.reducer;
