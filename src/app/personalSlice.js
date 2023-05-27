import { createSlice } from "@reduxjs/toolkit";
import { defaultCountryDialCode } from "./constants";

export const samplePersonalState = {
    firstName: 'Morteza',
    lastName: 'M',
    birthDate: 523584000000,
    nationality: 'IR',
    country: 'IR',
    state: 'Tehran',
    city: 'Tehran',
    married: true,
    numberOfChildren: 0,
    phone: '',
    mobile: '+989123456789',
    email: 'morteza@sample.com',
    zipCode: '',
    address: 'Tehran',
    avatar: 'https://media.licdn.com/dms/image/C4E03AQHtQEtNPHZSMw/profile-displayphoto-shrink_200_200/0/1649337603238?e=1681948800&v=beta&t=ltujekYJ3G5Ocrn2YoV0sjav32iEbdsasK4p7xgQ-5w',
}

export const samplePersonalStateFa = {
    firstName: 'مرتضی',
    lastName: 'م',
    birthDate: 523584000000,
    nationality: 'IR',
    country: 'IR',
    state: 'تهران',
    city: 'تهران',
    married: true,
    numberOfChildren: 0,
    phone: '',
    mobile: '+989123456789',
    email: 'morteza@sample.com',
    zipCode: '',
    address: 'تهران',
    avatar: 'https://media.licdn.com/dms/image/C4E03AQHtQEtNPHZSMw/profile-displayphoto-shrink_200_200/0/1649337603238?e=1681948800&v=beta&t=ltujekYJ3G5Ocrn2YoV0sjav32iEbdsasK4p7xgQ-5w',
}

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
    //avatar: 'https://media.licdn.com/dms/image/C4E03AQHtQEtNPHZSMw/profile-displayphoto-shrink_200_200/0/1649337603238?e=1681948800&v=beta&t=ltujekYJ3G5Ocrn2YoV0sjav32iEbdsasK4p7xgQ-5w',
    avatar: '',
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
            state = { 
                ...action.payload,
                avatar: state.avatar
            };
            return state;
        },
        update: (state, action) => {    //field, value
            const {field, value} = action.payload;
            state = { ...state, [field]: value };
            return state;
        },
        updateAvatar: (state, action) => {
            const value = action.payload ? action.payload : '';
            state = { ...state, avatar: value };
            return state;
        }
    }
})

export const {
    update, updateAll, updateAvatar
} = personalSlice.actions;

export default personalSlice.reducer;