import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1,
        firstName: "کوروش",
        lastName: " هخامنشی",
    },
    {
        id: 2,
        firstName: "داریوش",
        lastName: " هخامنشی",
    },
    {
        id: 3,
        firstName: "کمبوجیه",
        lastName: " هخامنشی",
    },
];
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})
export default usersSlice.reducer;