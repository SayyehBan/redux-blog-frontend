import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAuthors } from "../services/authorsServices";

export const fetchAuthor = createAsyncThunk("/author/fetchUsers", async () => {
    const response = await getAllAuthors();
    return response.data;
});
const authorsSlice = createSlice({
    name: "authors",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAuthor.fulfilled, (state, action) => {
            return action.payload;
        });
    },
})
export const selectAllAuthors = (state) => state.authors;
export const selectAuthorById = (state, authorID) => {
    const author = state.authors.find((author) => author.authorID === authorID)
    return author;
}

export default authorsSlice.reducer;