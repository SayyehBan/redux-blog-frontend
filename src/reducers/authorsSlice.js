import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
    deleteAuthor,
    getAllAuthors,
    insertAuthor,
} from "../services/authorsServices";

const authorsAdapter = createEntityAdapter({
    selectId: (author) => author.authorID,
});

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
const initialState = authorsAdapter.getInitialState();
const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAuthor.fulfilled, authorsAdapter.setAll)
            .addCase(authorDelete.fulfilled, authorsAdapter.removeOne)
            .addCase(addAuthor.fulfilled, authorsAdapter.addOne);
    },
});
export const {
    selectAll: selectAllAuthors,
    selectById: selectAuthorById,
    selectIds: selectAuthorIds,
} = authorsAdapter.getSelectors((state) => state.authors);

export default authorsSlice.reducer;
