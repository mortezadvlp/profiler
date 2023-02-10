import { createSlice } from "@reduxjs/toolkit";


export const educationInitialStateSingle = {
    id: -1,
    degree: '',
    university: '',
    major: '',
    orientation: '',
    country: '',
    state: '',
    city: '',
    gpa: '',
    stillStudent: false,
    startDate: '',
    endDate: '',
}

const initialState = [];

export const educationSlice = createSlice({
    name: 'education',
    initialState: initialState,
    reducers: {
        addDegree: (state, action) => {
            let id = -1;
            if(state.length > 0) {
                id = state.at(-1).id;
            }
            id++;
            const newData = {
                ...action.payload,
                id: id
            }
            state.push(newData);
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
                state.splice(indx, 1);
            }
        }
    }
})

export const {
    addDegree, editDegree, deleteDegree
} = educationSlice.actions

export default educationSlice.reducer
