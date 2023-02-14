
import { SvgCamera } from '../../app/constantComponents';
import './MenuPanel.css';
import user_default from '../../images/user_default.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { samplePersonalState, updateAll as updatePersonalAll, updateAvatar } from '../../app/personalSlice';
import CustomButton from '../CustomButton/CustomButton';
import { samplePrivacyState, updateAll as updatePrivacyAll } from '../../app/privacySlice';
import { addDegree, sampleEducationalState } from '../../app/educationSlice';
import { addExperience, sampleWorkState } from '../../app/workExperienceSlice';

const TabButton = ({ text = 'Tab Button', onClick, isSelected = false, className = '' }) => {


    return (
        <div className={`w-100 bg-transparent ${className}`} >
            <button className={`${isSelected ? 'w-100 bg-white' : 'w-75 tab-button-light'} border-0 px-2 py-3 rounded-pill`}
                onClick={() => isSelected ? {} : onClick()} >
                <span className='m-auto fw-bold' >{text}</span>
            </button>
        </div>
    );
}

export default function MenuPanel({ currentTab = 0, onChangeCurrentTab, className = '' }) {

    const inputAvatar = useRef(null);
    const initAvatar = useSelector(state => state.personal.avatar);
    const [avatar, setAvatar] = useState(initAvatar.toLowerCase().startsWith("http") ? initAvatar : localStorage.getItem('avatar'));
    const dispatch = useDispatch();

    useEffect(() => {
        setAvatar(initAvatar.toLowerCase().startsWith("http") ? initAvatar : localStorage.getItem('avatar'))
    }, [initAvatar])

    const saveAvatar = () => {
        const fn = inputAvatar.current.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            localStorage.setItem('avatar', e.target.result);
            dispatch(updateAvatar(e.target.result));
        };
        reader.readAsDataURL(fn);
    }

    const fillSampleClick = () => {
        dispatch(updatePersonalAll(samplePersonalState));
        dispatch(updateAvatar(samplePersonalState.avatar));
        dispatch(addDegree(sampleEducationalState[0]));
        dispatch(addDegree(sampleEducationalState[1]));
        dispatch(addExperience(sampleWorkState[0]));
        dispatch(updatePrivacyAll(samplePrivacyState));
    }

    const tabNames = ['Personal Info', 'Educational Info', 'Work Experiances', 'Privacy'];

    return (
        <aside className={`d-flex flex-column ${className}`} style={{minWidth:'300px'}} >
            <div className='w-100 px-5 pt-4 pb-5 text-center border border-primary' style={{width:'300px', height:'270px'}} >
                <div className='mx-auto position-relative' style={{width:'180px', height:'180px'}}  >
                    <div className='rounded-circle border overflow-hidden'>
                        <img className='' style={{width:'180px', height:'180px'}}
                            src={avatar ? avatar : user_default} />
                        <button className='camera-on-avatar border-0 bg-transparent'
                            onClick={() => inputAvatar.current?.click()} >
                            <SvgCamera width='64px' height='64px' className='text-dark' />
                        </button>
                        <input type='file' ref={inputAvatar} style={{display: 'none'}} onChange={() => saveAvatar()} />
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column align-items-center gap-3 h-100 bg-primary px-2 py-3' >
                {tabNames.map((tn, index) => 
                    <TabButton key={index} text={tn} isSelected={currentTab === index} 
                        onClick={() => onChangeCurrentTab(index)} />
                )}
                <CustomButton className='mt-5' text='Fill Sample' onClick={() => fillSampleClick()} />
            </div>
        </aside>
    );
}
