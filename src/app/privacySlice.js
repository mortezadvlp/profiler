import { createSlice } from "@reduxjs/toolkit"


export const privacyInitialState = {
    username: '',
    dontShowEmail: false,
    notification: false,
    adminMessages: false,
}

export const privacySlice = createSlice({
    name: 'privacy',
    initialState: privacyInitialState,
    reducers: {
        updateAll: (state, action) => {
            state = {
                ...state,
                dontShowEmail: action.payload.dontShowEmail,
                notification: action.payload.notification,
                adminMessages: action.payload.adminMessages,
            }
        },
        update: (state, action) => {    //field, value
            const {field, value} = action.payload;
            state = { ...state, [field]: value }
        }
    }
})

export const {
    update, updateAll
} = privacySlice.actions;

export default privacySlice.reducer;
