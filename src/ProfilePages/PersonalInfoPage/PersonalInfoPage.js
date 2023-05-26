
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgOK } from '../../app/constantComponents';
import { countries, defaultCountryDialCode, minInputsHeight, primaryColor } from '../../app/constants';
import { personalInitialState, updateAll } from '../../app/personalSlice';
import { fromPersianDateStr, separatePhoneAndCode, toPersianDateDate, validateEmail, validatePersianDateFormat, validatePhone } from '../../app/utilities';
import CustomButton from '../../components/CustomButton/CustomButton';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './PersonalInfoPage.css';
import 'reactjs-floating-label-inputs/dist/index.css';
import { NormalInputFloatingLabel, DateInputFloatingLabel, SelectInputFloatingLabel,
        QuestionInputFloatingLabel, PhoneInputFloatingLabel, EmailInputFloatingLabel  } from 'reactjs-floating-label-inputs';


export default function PersonalInfoPage ({ smallView = false, onShowMessage = () => {}, onDone = () => {} }) {

    const stateData = useSelector(state => state.personal);
    const [data, setData] = useState(personalInitialState);
    const dispatch = useDispatch();

    useEffect(() => {
        const phone = separatePhoneAndCode(stateData.phone);
        const mobile = separatePhoneAndCode(stateData.mobile);
        const temp = {
            ...stateData,
            birthDate: stateData.birthDate === 0 ? '' : toPersianDateDate(new Date(stateData.birthDate)),
            phoneCountryCode: phone.code,
            phoneValue: phone.number,
            mobileCountryCode: mobile.code,
            mobileValue: mobile.number,
        }
        setData(temp);
    }, [stateData])

    const setDataAsist = (field, value) => {
        console.log(field, value)
        setData({
            ...data,
            [field]: value
        })
    }

    const onSaveChangesClick = () => {
        if(data.email && !validateEmail(data.email)) {
            onShowMessage('Enter a valid email address');
            return;
        }
        if(data.mobileValue && !validatePhone(data.mobileValue)) {
            onShowMessage('Enter a valid mobile number');
            return;
        }
        if(data.phoneValue && !validatePhone(data.phoneValue)) {
            onShowMessage('Enter a valid phone number');
            return;
        }
        if(data.birthDate && !validatePersianDateFormat(data.birthDate)) {
            onShowMessage('Birth date is not in correct format');
            return;
        }
        if(data.zipCode && data.zipCode.length > 10) {
            onShowMessage('Enter a valid Zip Code');
            return;
        }
        
        let temp = {
            ...data,
            birthDate: data.birthDate === '' ? 0 : new Date(fromPersianDateStr(data.birthDate)).getTime(),
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
        <PageTemplate smallView={smallView} title='Personal Information' className='' >
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' label='First Name' type='text' minHeight={minInputsHeight}
                    value={data.firstName} onChangeValue={(val) => setDataAsist("firstName", val)} />
                <NormalInputFloatingLabel className='col-lg' label='Last Name' type='text' minHeight={minInputsHeight}
                    value={data.lastName} onChangeValue={(val) => setDataAsist("lastName", val)} />
            </div>
            <div className='w-100 row' >
                <DateInputFloatingLabel className='col-lg' label='Birth Date' hasIcon={true} minHeight={minInputsHeight}
                    value={data.birthDate} onChangeValue={(val) => setDataAsist("birthDate", val)} />
                <SelectInputFloatingLabel className='col-lg' label='Nationality' minHeight={minInputsHeight} colorPrimary={primaryColor}
                    value={data.nationality} onChangeValue={(val) => setDataAsist("nationality", val)}
                    options={countries()} />
            </div>
            <div className='w-100 row' >
                <SelectInputFloatingLabel className='col-lg' label='Country' minHeight={minInputsHeight} colorPrimary={primaryColor}
                    value={data.country} onChangeValue={(val) => setDataAsist("country", val)}
                    options={countries()} />
                <NormalInputFloatingLabel className='col-lg' label='State' type='text' minHeight={minInputsHeight}
                    value={data.state} onChangeValue={(val) => setDataAsist("state", val)} />
                <NormalInputFloatingLabel className='col-lg' label='City' type='text' minHeight={minInputsHeight}
                    value={data.city} onChangeValue={(val) => setDataAsist("city", val)} />
            </div>
            <div className='w-100 row' >
                <QuestionInputFloatingLabel className='col-lg pt-4' title='Are you married?' minHeight={minInputsHeight}
                    trueOption='Yes' falseOption='No'
                    value={data.married} onChangeValue={(val) => setDataAsist("married", val)} />
                <NormalInputFloatingLabel className='col-lg' label='Number of children' type='number' minHeight={minInputsHeight}
                    value={data.numberOfChildren} onChangeValue={(val) => setDataAsist("numberOfChildren", val)} />
            </div>
            <div className='w-100 row' >
                <PhoneInputFloatingLabel className='col-lg' label='Mobile Number' minHeight={minInputsHeight}
                    countryValue={data.mobileCountryCode} phoneValue={data.mobileValue} useDialCode
                    onChangeCountryValue={(val) => setDataAsist("mobileCountryCode", val)}
                    onChangePhoneValue={(val) => setDataAsist("mobileValue", val)} />
                <PhoneInputFloatingLabel className='col-lg' label='Phone Number' minHeight={minInputsHeight}
                    countryValue={data.phoneCountryCode} phoneValue={data.phoneValue} useDialCode
                    onChangeCountryValue={(val) => setDataAsist("phoneCountryCode", val)}
                    onChangePhoneValue={(val) => setDataAsist("phoneValue", val)} />
            </div>
            <div className='w-100 row' >
                <EmailInputFloatingLabel  className='col-lg' label='Email Address' type='email' minHeight={minInputsHeight} hasIcon={true}
                    value={data.email} onChangeValue={(val) => setDataAsist("email", val)} />
                <NormalInputFloatingLabel className='col-lg' label='Zip Code' type='IntNumber' minHeight={minInputsHeight}
                    value={data.zipCode} onChangeValue={(val) => setDataAsist("zipCode", val)} />
            </div>
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' lineCount='3' label='Address' type='text' minHeight={minInputsHeight}
                    value={data.address} onChangeValue={(val) => setDataAsist("address", val)} />
            </div>

            <div className='w-100 row justify-content-center' >
                <CustomButton text='Save Changes' hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => onSaveChangesClick()} />
            </div>
        </PageTemplate>
    );
}
