import { createSlice } from "@reduxjs/toolkit";

export const sampleEducationalState = [
    {
        id: 0,
        degree: 'Bachelor',
        university: 'Kharazmi',
        major: 'Math',
        orientation: 'Applied Mathematics',
        country: 'IR',
        state: 'Alborz',
        city: 'Karaj',
        gpa: '16.70',
        stillStudent: false,
        startDate: 1095811200000,
        endDate: 1216598400000,
    },
    {
        id: 1,
        degree: 'Master',
        university: 'Iran University of Science and Technology',
        major: 'Industrial Engineering',
        orientation: 'Economical and Social Systems',
        country: 'IR',
        state: 'Tehran',
        city: 'Tehran',
        gpa: '18.23',
        stillStudent: false,
        startDate: 1222041600000,
        endDate: 1311292800000,
    },
]

export const sampleEducationalStateFa = [
    {
        id: 0,
        degree: 'Bachelor',
        university: 'دانشگاه خوارزمی',
        major: 'ریاضی',
        orientation: 'ریاضی کاربردی',
        country: 'IR',
        state: 'البرز',
        city: 'کرج',
        gpa: '16.70',
        stillStudent: false,
        startDate: 1095811200000,
        endDate: 1216598400000,
    },
    {
        id: 1,
        degree: 'Master',
        university: 'دانشگاه علم و صنعت ایران',
        major: 'مهندسی صنایع',
        orientation: 'مهندسی سیستم های اقتصادی و اجتماعی',
        country: 'IR',
        state: 'تهران',
        city: 'نهران',
        gpa: '18.23',
        stillStudent: false,
        startDate: 1222041600000,
        endDate: 1311292800000,
    },
]


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
