import { createSlice } from "@reduxjs/toolkit"


export const privacyInitialState = {
    username: 'Username',
    dontShowEmail: false,
    notification: false,
    adminMessages: false,
}

export const privacySlice = createSlice({
    name: 'privacy',
    initialState: privacyInitialState,
    reducers: {
        updateAll: (state, action) => {
            const newState = {
                ...state,
                dontShowEmail: action.payload.dontShowEmail,
                notification: action.payload.notification,
                adminMessages: action.payload.adminMessages,
            };
            return newState;
        },
        update: (state, action) => {    //field, value
            const {field, value} = action.payload;
            const newState = { ...state, [field]: value };
            return newState;
        }
    }
})

export const {
    update, updateAll
} = privacySlice.actions;

export default privacySlice.reducer;
