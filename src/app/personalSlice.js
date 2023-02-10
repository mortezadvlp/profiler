import { createSlice } from "@reduxjs/toolkit";
import { defaultCountryDialCode } from "./constants";

const initialState = {
    firstName: '',
    lastName: '',
    birthDate: 0,
    nationality: '',
    country: '',
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

export const personalInitialState = {
    ...initialState,
    birthDate: '',
    phoneCountryCode: defaultCountryDialCode,
    phoneValue: '',
    mobileCountryCode: defaultCountryDialCode,
    mobileValue: '',
}

export const personalSlice = createSlice({
    name: "personal",
    initialState: initialState,
    reducers: {
        updateAll: (state, action) => {
            state = { ...action.payload };
            return state;
        },
        update: (state, action) => {    //field, value
            const {field, value} = action.payload;
            state = { ...state, [field]: value };
            return state;
        }
    }
})

export const {
    update, updateAll
} = personalSlice.actions;

export default personalSlice.reducer;