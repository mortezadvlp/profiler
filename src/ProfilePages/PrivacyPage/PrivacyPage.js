
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgOK } from '../../app/constantComponents';
import { updateAll } from '../../app/privacySlice';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox';
import InputFloatingLabel from '../../components/InputFloatingLabel/InputFloatingLabel';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './PrivacyPage.css'
import 'reactjs-floating-label-inputs/dist/index.css';
import { NormalInputFloatingLabel, CheckBoxInputFloatingLabel } from 'reactjs-floating-label-inputs';
import { minInputsHeight } from '../../app/constants';

export default function PrivacyPage({ smallView = false, onShowMessage = () => {}, onDone = () => {} }) {

    const data = useSelector(state => state.privacy);
    const [dataUP, setDataUP] = useState({
        username: data.username,
        password: '',
        repeatPassword: '',
    })
    const [dataOpt, setDataOpt] = useState({
        dontShowEmail: data.dontShowEmail,
        notification: data.notification,
        adminMessages: data.adminMessages,
    })
    const dispatch = useDispatch();

    const setDataUPAsist = (field, value) => {
        setDataUP({
            ...dataUP,
            [field]: value
        })
    }
    const setDataOptAsist = (field, value) => {
        setDataOpt({
            ...dataOpt,
            [field]: value
        })
    }

    const onChangePasswordClick = () => {
        if(dataUP.password.length < 5) {
            onShowMessage("Password must be at least 5 characters");
            return;
        }
        if(dataUP.password !== dataUP.repeatPassword) {
            onShowMessage("Password and its repeat are not the same");
            return;
        }
        setDataUP({
            ...dataUP,
            password: '',
            repeatPassword: '',
        })
        onDone();
    }

    const onSaveChangesClick = () => {
        dispatch(updateAll(dataOpt));
        onDone();
    }

    return (
        <PageTemplate smallView={smallView} title='Privacy' className='' >
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' label='Username' type='text' minHeight={minInputsHeight} disabled
                    value={dataUP.username} />
            </div>
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' label='New Password' type='password' minHeight={minInputsHeight}
                    value={dataUP.password} onChangeValue={(val) => setDataUPAsist("password", val)} />
                <NormalInputFloatingLabel className='col-lg' label='Repeat New Password' type='password' minHeight={minInputsHeight}
                    value={dataUP.repeatPassword} onChangeValue={(val) => setDataUPAsist("repeatPassword", val)} />
            </div>
            <div className='w-100 row justify-content-center' >
                <CustomButton text='Change Password' hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => onChangePasswordClick()} />
            </div>
            <div className='w-100 d-flex flex-column gap-2 px-3 mt-4' >
                <CheckBoxInputFloatingLabel text='Do not show my email to others (Show only to my contacts)' isChecked={dataOpt.dontShowEmail} onChangeChecked={(val) => setDataOptAsist("dontShowEmail", val)} />
                <CheckBoxInputFloatingLabel text='Send me notification' isChecked={dataOpt.notification} onChangeChecked={(val) => setDataOptAsist("notification", val)} />
                <CheckBoxInputFloatingLabel text='Send me important messages from admin' isChecked={dataOpt.adminMessages} onChangeChecked={(val) => setDataOptAsist("adminMessages", val)} />
            </div>
            <div className='w-100 row justify-content-center' >
                <CustomButton text='Save Changes' hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => onSaveChangesClick()} />
            </div>
        </PageTemplate>
    );
}
