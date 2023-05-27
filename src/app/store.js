import { configureStore } from "@reduxjs/toolkit";
import personalReducer from './personalSlice';
import educationReducer from './educationSlice';
import workExperienceReducer from './workExperienceSlice';
import privacyReducer from './privacySlice';
import settingsReducer from './settingsSlice';


export default configureStore({
    reducer: {
        personal: personalReducer,
        education: educationReducer,
        workExperience: workExperienceReducer,
        privacy: privacyReducer,
        settings: settingsReducer
    }
})
