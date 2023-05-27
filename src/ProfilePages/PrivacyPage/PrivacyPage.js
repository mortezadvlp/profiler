
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgOK } from '../../app/constantComponents';
import { updateAll } from '../../app/privacySlice';
import CustomButton from '../../components/CustomButton/CustomButton';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './PrivacyPage.css'
import 'reactjs-floating-label-inputs/dist/index.css';
import { NormalInputFloatingLabel, CheckBoxInputFloatingLabel } from 'reactjs-floating-label-inputs';
import { minInputsHeight, textLabels } from '../../app/constants';

export default function PrivacyPage({ smallView = false, onShowMessage = () => {}, onDone = () => {} }) {

    const darkMode = useSelector(state => state.settings.darkMode);
    const language = useSelector(state => state.settings.language);
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
            onShowMessage(textLabels.smallPassword[language]);
            return;
        }
        if(dataUP.password !== dataUP.repeatPassword) {
            onShowMessage(textLabels.passwordRepeat[language]);
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
                <NormalInputFloatingLabel className='col-lg' label={textLabels.username[language]} type='text' minHeight={minInputsHeight} disabled
                    value={dataUP.username} />
            </div>
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' label={textLabels.newpassword[language]} type='password' minHeight={minInputsHeight}
                    value={dataUP.password} onChangeValue={(val) => setDataUPAsist("password", val)} />
                <NormalInputFloatingLabel className='col-lg' label={textLabels.repeatNewPassword[language]} type='password' minHeight={minInputsHeight}
                    value={dataUP.repeatPassword} onChangeValue={(val) => setDataUPAsist("repeatPassword", val)} />
            </div>
            <div className='w-100 row justify-content-center' >
                <CustomButton text={textLabels.changePass[language]} hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => onChangePasswordClick()} />
            </div>
            <div className='w-100 d-flex flex-column gap-2 px-3 mt-4' >
                <CheckBoxInputFloatingLabel text={textLabels.dontShowEmail[language]} isChecked={dataOpt.dontShowEmail} onChangeChecked={(val) => setDataOptAsist("dontShowEmail", val)} />
                <CheckBoxInputFloatingLabel text={textLabels.sendNotif[language]} isChecked={dataOpt.notification} onChangeChecked={(val) => setDataOptAsist("notification", val)} />
                <CheckBoxInputFloatingLabel text={textLabels.sendAdminMessages[language]} isChecked={dataOpt.adminMessages} onChangeChecked={(val) => setDataOptAsist("adminMessages", val)} />
            </div>
            <div className='w-100 row justify-content-center' >
                <CustomButton text={textLabels.saveChanges[language]} hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => onSaveChangesClick()} />
            </div>
        </PageTemplate>
    );
}
