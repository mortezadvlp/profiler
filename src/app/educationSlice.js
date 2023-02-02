import { createSlice } from "@reduxjs/toolkit";


export const educationInitialStateSingle = {
    id: -1,
    degree: -1,
    university: '',
    major: '',
    orientation: '',
    country: -1,
    state: '',
    city: '',
    gpa: 0.0,
    stillStudent: false,
    startDate: 0,
    endDate: 0,
}

const initialState = [];

export const educationSlice = createSlice({
    name: 'education',
    initialState: initialState,
    reducers: {
        addDegree: (state, action) => {
            state.push(action.payload);
        },
        editDegree: (state, action) => {
            const temp = state.find((el, i) => {
                if(el.id === action.payload.id) {
                    state[i] = action.payload;
                    return true;
                }
            });
        },
        deleteDegree: (state, action) => {  //id
            const indx = state.findIndex(el => el.id === action.payload);
            if(indx >= 0) {
                state.splice(indx, 0);
            }
        }
    }
})

export const {
    addDegree, editDegree, deleteDegree
} = educationSlice.actions

export default educationSlice.reducer
