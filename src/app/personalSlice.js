import { createSlice } from "@reduxjs/toolkit";

export const personalInitialState = {
    firstName: '',
    lastName: '',
    birthDate: 0,
    nationality: -1,
    country: -1,
    state: '',
    city: '',
    married: false,
    numberOfChildren: 0,
    phone: '',
    mobile: '',
    email: '',
    zipCode: '',
    address: '',
}

export const personalSlice = createSlice({
    name: "personal",
    initialState: personalInitialState,
    reducers: {
        updateAll: (state, action) => {
            state = { ...action.payload };
        },
        update: (state, action) => {    //field, value
            const {field, value} = action.payload;
            state = { ...state, [field]: value }
        }
    }
})

export const {
    update, updateAll
} = personalSlice.actions;

export default personalSlice.reducer;