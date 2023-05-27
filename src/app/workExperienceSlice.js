import { createSlice } from "@reduxjs/toolkit";

export const sampleWorkState = [
    {
        id: 0,
        jobTitle: 'Software developer',
        company: 'Self-employed',
        country: 'IR',
        state: 'Tehran',
        city: 'Tehran',
        responsibilities: 'C# programmer, ASP.Net programmer, Android programmer, Qt programmer, Front-end developer',
        stillWorking: true,
        startDate: 1398038400000,
        endDate: 0,
    }
]

export const sampleWorkStateFa = [
    {
        id: 0,
        jobTitle: 'توسعه دهنده نرم افزار',
        company: 'خود اشتغال',
        country: 'IR',
        state: 'تهران',
        city: 'تهران',
        responsibilities: 'C# programmer, ASP.Net programmer, Android programmer, Qt programmer, Front-end developer',
        stillWorking: true,
        startDate: 1398038400000,
        endDate: 0,
    }
]

export const workExperienceInitialStateSingle = {
    id: -1,
    jobTitle: '',
    company: '',
    country: '',
    state: '',
    city: '',
    responsibilities: '',
    stillWorking: false,
    startDate: '',
    endDate: '',
}

const initialState = [];

export const workExperienceSlice = createSlice({
    name: 'workExperience',
    initialState: initialState,
    reducers: {
        addExperience: (state, action) => {
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
                state.splice(indx, 1);
            }
        }
    }
})

export const {
    addExperience, editExperience, deleteExperience
} = workExperienceSlice.actions

export default workExperienceSlice.reducer
