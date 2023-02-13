
import { Accordion } from 'react-bootstrap';
import { SvgCamera } from '../../app/constantComponents';
import EducationalInformation from '../../ProfilePages/EducationalInformation/EducationalInformation';
import PersonalInfoPage from '../../ProfilePages/PersonalInfoPage/PersonalInfoPage';
import PrivacyPage from '../../ProfilePages/PrivacyPage/PrivacyPage';
import WorkExperience from '../../ProfilePages/WorkExperience/WorkExperience';
import './SmallView.css';
import user_default from '../../images/user_default.png';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { samplePersonalState, updateAll as updatePersonalAll, updateAvatar } from '../../app/personalSlice';
import { samplePrivacyState, updateAll as updatePrivacyAll } from '../../app/privacySlice';
import { addDegree, sampleEducationalState } from '../../app/educationSlice';
import { addExperience, sampleWorkState } from '../../app/workExperienceSlice';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function SmallView({ showDone, showMessage }) {

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

    return (
        <div className='d-flex flex-column' >
            <CustomButton className='mx-auto mt-3' text='Fill Sample' onClick={() => fillSampleClick()} />
            <div className='mx-auto position-relative pt-3 pb-4' >
                <div className='rounded-circle border overflow-hidden bg-white'>
                    <img className='' style={{width:'128px', height:'128px'}}
                        src={avatar ? avatar : user_default} />
                </div>
                <button className='camera-on-avatar-small border-0 bg-transparent'
                    onClick={() => inputAvatar.current?.click()} >
                    <SvgCamera width='48px' height='48px' className='text-dark' />
                </button>
                <input type='file' ref={inputAvatar} style={{display: 'none'}} onChange={() => saveAvatar()} />
            </div>
            <Accordion >
                <Accordion.Item eventKey="0" >
                    <Accordion.Header >Personal Info</Accordion.Header>
                    <Accordion.Body >
                        <PersonalInfoPage smallView onShowMessage={(msg) => showMessage(msg)} onDone={() => showDone()} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" style={{marginTop:5}} >
                    <Accordion.Header >Educational Info</Accordion.Header>
                    <Accordion.Body >
                        <EducationalInformation smallView onShowMessage={(msg) => showMessage(msg)} onDone={() => showDone()} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" style={{marginTop:5}} >
                    <Accordion.Header >Work Experiences</Accordion.Header>
                    <Accordion.Body >
                        <WorkExperience smallView onShowMessage={(msg) => showMessage(msg)} onDone={() => showDone()} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" style={{marginTop:5}} >
                    <Accordion.Header >Privacy</Accordion.Header>
                    <Accordion.Body >
                        <PrivacyPage smallView onShowMessage={(msg) => showMessage(msg)} onDone={() => showDone()} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
