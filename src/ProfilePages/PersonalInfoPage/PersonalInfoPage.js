
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgOK } from '../../app/constantComponents';
import { countries, defaultCountryDialCode, minInputsHeight, primaryColor, textLabels } from '../../app/constants';
import { personalInitialState, updateAll } from '../../app/personalSlice';
import { fromPersianDateStr, separatePhoneAndCode, toPersianDateDate, validateEmail, validatePersianDateFormat, validatePhone } from '../../app/utilities';
import CustomButton from '../../components/CustomButton/CustomButton';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './PersonalInfoPage.css';
import 'reactjs-floating-label-inputs/dist/index.css';
import { NormalInputFloatingLabel, DateInputFloatingLabel, SelectInputFloatingLabel,
        QuestionInputFloatingLabel, PhoneInputFloatingLabel, EmailInputFloatingLabel  } from 'reactjs-floating-label-inputs';


export default function PersonalInfoPage ({ smallView = false, onShowMessage = () => {}, onDone = () => {} }) {

    const darkMode = useSelector(state => state.settings.darkMode);
    const language = useSelector(state => state.settings.language);
    const stateData = useSelector(state => state.personal);
    const [data, setData] = useState(personalInitialState);
    const dispatch = useDispatch();

    useEffect(() => {
        const phone = separatePhoneAndCode(stateData.phone);
        const mobile = separatePhoneAndCode(stateData.mobile);
        const temp = {
            ...stateData,
            birthDate: stateData.birthDate === 0 ? '' : language === 'fa' ? toPersianDateDate(new Date(stateData.birthDate)) : new Date(stateData.birthDate),
            phoneCountryCode: phone.code,
            phoneValue: phone.number,
            mobileCountryCode: mobile.code,
            mobileValue: mobile.number,
        }
        setData(temp);
    }, [stateData])

    const setDataAsist = (field, value) => {
        setData({
            ...data,
            [field]: value
        })
    }

    const onSaveChangesClick = () => {
        if(data.email && !validateEmail(data.email)) {
            onShowMessage(textLabels.emailValid[language]);
            return;
        }
        if(data.mobileValue && !validatePhone(data.mobileValue)) {
            onShowMessage(textLabels.mobileValid[language]);
            return;
        }
        if(data.phoneValue && !validatePhone(data.phoneValue)) {
            onShowMessage(textLabels.phoneValid[language]);
            return;
        }
        if(data.birthDate && !validatePersianDateFormat(data.birthDate)) {
            onShowMessage(textLabels.birthDateValid[language]);
            return;
        }
        if(data.zipCode && data.zipCode.length > 10) {
            onShowMessage(textLabels.zipCodeValid[language]);
            return;
        }
        
        let temp = {
            ...data,
            birthDate: data.birthDate === '' ? 0 : new Date(language === 'fa' ? fromPersianDateStr(data.birthDate) : data.birthDate).getTime(),
        };
        if(temp.mobileValue && !temp.mobileCountryCode) {
            temp.mobileCountryCode = defaultCountryDialCode;
        }
        if(temp.phoneValue && !temp.phoneCountryCode) {
            temp.phoneCountryCode = defaultCountryDialCode;
        }
        temp = {
            ...temp,
            mobile: temp.mobileValue ? `${temp.mobileCountryCode}${temp.mobileValue}` : '',
            phone: temp.phoneValue ? `${temp.phoneCountryCode}${temp.phoneValue}` : '',
        };
        delete temp.mobileCountryCode;
        delete temp.mobileValue;
        delete temp.phoneCountryCode;
        delete temp.phoneValue;
        dispatch(updateAll(temp));
        onDone();
    }

    return (
        <PageTemplate smallView={smallView} title={textLabels.personalTitle[language]} className='' >
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' label={textLabels.firstName[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={data.firstName} onChangeValue={(val) => setDataAsist("firstName", val)} />
                <NormalInputFloatingLabel className='col-lg' label={textLabels.lastName[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={data.lastName} onChangeValue={(val) => setDataAsist("lastName", val)} />
            </div>
            <div className='w-100 row' >
                <DateInputFloatingLabel className='col-lg' label={textLabels.birthDate[language]} hasIcon={true} minHeight={minInputsHeight} dark={darkMode}
                    shamsiMode={language === 'fa'} value={data.birthDate} onChangeValue={(val) => setDataAsist("birthDate", val)} />
                <SelectInputFloatingLabel className='col-lg' label={textLabels.nationality[language]} minHeight={minInputsHeight} colorPrimary={primaryColor}
                    value={data.nationality} onChangeValue={(val) => setDataAsist("nationality", val)} dark={darkMode}
                    options={countries()} />
            </div>
            <div className='w-100 row' >
                <SelectInputFloatingLabel className='col-lg' label={textLabels.country[language]} minHeight={minInputsHeight} colorPrimary={primaryColor}
                    value={data.country} onChangeValue={(val) => setDataAsist("country", val)} dark={darkMode}
                    options={countries()} />
                <NormalInputFloatingLabel className='col-lg' label={textLabels.state[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={data.state} onChangeValue={(val) => setDataAsist("state", val)} />
                <NormalInputFloatingLabel className='col-lg' label={textLabels.city[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={data.city} onChangeValue={(val) => setDataAsist("city", val)} />
            </div>
            <div className='w-100 row' >
                <QuestionInputFloatingLabel className='col-lg pt-4' title={textLabels.married[language]} minHeight={minInputsHeight} dark={darkMode}
                    trueOption={textLabels.yes[language]} falseOption={textLabels.no[language]}
                    value={data.married} onChangeValue={(val) => setDataAsist("married", val)} />
                <NormalInputFloatingLabel className='col-lg' label={textLabels.children[language]} type='number' minHeight={minInputsHeight} dark={darkMode}
                    value={data.numberOfChildren} onChangeValue={(val) => setDataAsist("numberOfChildren", val)} />
            </div>
            <div className='w-100 row' >
                <PhoneInputFloatingLabel className='col-lg' label={textLabels.mobileNumber[language]} minHeight={minInputsHeight} dark={darkMode}
                    countryValue={data.mobileCountryCode} phoneValue={data.mobileValue} useDialCode
                    onChangeCountryValue={(val) => setDataAsist("mobileCountryCode", val)}
                    onChangePhoneValue={(val) => setDataAsist("mobileValue", val)} />
                <PhoneInputFloatingLabel className='col-lg' label={textLabels.phoneNumber[language]} minHeight={minInputsHeight} dark={darkMode}
                    countryValue={data.phoneCountryCode} phoneValue={data.phoneValue} useDialCode
                    onChangeCountryValue={(val) => setDataAsist("phoneCountryCode", val)}
                    onChangePhoneValue={(val) => setDataAsist("phoneValue", val)} />
            </div>
            <div className='w-100 row' >
                <EmailInputFloatingLabel  className='col-lg' label={textLabels.email[language]} type='email' minHeight={minInputsHeight} hasIcon={true} dark={darkMode}
                    value={data.email} onChangeValue={(val) => setDataAsist("email", val)} />
                <NormalInputFloatingLabel className='col-lg' label={textLabels.zipCode[language]} type='IntNumber' minHeight={minInputsHeight} dark={darkMode}
                    value={data.zipCode} onChangeValue={(val) => setDataAsist("zipCode", val)} />
            </div>
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' lineCount='3' label={textLabels.address[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={data.address} onChangeValue={(val) => setDataAsist("address", val)} />
            </div>

            <div className='w-100 row justify-content-center' >
                <CustomButton text={textLabels.saveChanges[language]} hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => onSaveChangesClick()} />
            </div>
        </PageTemplate>
    );
}
