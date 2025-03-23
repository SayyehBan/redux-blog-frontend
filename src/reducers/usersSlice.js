import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAuthors } from "../services/authorsServices";

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
    const response = await getAllAuthors();
    return response.data;
});
const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    },
})
export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => {
    const user = state.users.find((user) => user.authorID === userId)
    return user;
}

export default usersSlice.reducer;