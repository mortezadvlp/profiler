import { createSlice } from "@reduxjs/toolkit";


export const workExperienceInitialStateCard = {
    id: -1,
    jobTitle: '',
    company: '',
    country: -1,
    state: '',
    city: '',
    brief: '',
    stillWorking: false,
    startDate: 0,
    endDate: 0,
}

const initialState = [];

export const workExperienceSlice = createSlice({
    name: 'workExperience',
    initialState: initialState,
    reducers: {
        addExperience: (state, action) => {
            state.push(action.payload);
        },
        editExperience: (state, action) => {
            const temp = state.find((el, i) => {
                if(el.id === action.payload.id) {
                    state[i] = action.payload;
                    return true;
                }
            });
        },
        deleteExperience: (state, action) => {  //id
            const indx = state.findIndex(el => el.id === action.payload);
            if(indx >= 0) {
                state.splice(indx, 0);
            }
        }
    }
})

export const {
    addExperience, editExperience, deleteExperience
} = workExperienceSlice.actions

export default workExperienceSlice.reducer
