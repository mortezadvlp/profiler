import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
    language: 'en',
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        changeDarkMode: (state, action) => {
            state.darkMode = action.payload;
        },
        changeLanguage: (state, action) => {    //field, value
            state.language = action.payload.toLowerCase();
        }
    }
})

export const {
    changeDarkMode, changeLanguage
} = settingsSlice.actions;

export default settingsSlice.reducer;