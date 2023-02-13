
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgCalendar, SvgOK } from '../../app/constantComponents';
import { countries, primaryColor } from '../../app/constants';
import { personalInitialState, updateAll } from '../../app/personalSlice';
import { fromPersianDateStr, separatePhoneAndCode, toPersianDateDate, validateEmail, validatePersianDate, validatePersianDateFormat, validatePhone } from '../../app/utilities';
import CustomButton from '../../components/CustomButton/CustomButton';
import DateFloatingLabel from '../../components/DateFloatingLabel/DateFloatingLabel';
import InputFloatingLabel from '../../components/InputFloatingLabel/InputFloatingLabel';
import OptionalQuestion from '../../components/OptionalQuestion/OptionalQuestion';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import PhoneFloatingLabel from '../../components/PhoneFloatingLabel/PhoneFloatingLabel';
import SelectFloatingLabel from '../../components/SelectFloatingLabel/SelectFloatingLabel';
import './PersonalInfoPage.css';


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
        if(data.mobileValue && !data.mobileCountryCode) {
            onShowMessage('Select an area code for mobile number');
            return;
        }
        if(data.phoneValue && !data.phoneCountryCode) {
            onShowMessage('Select an area code for phone number');
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

        const temp = {
            ...data,
            birthDate: data.birthDate === '' ? 0 : new Date(fromPersianDateStr(data.birthDate)).getTime(),
            mobile: data.mobileValue ? `${data.mobileCountryCode}${data.mobileValue}` : '',
            phone: data.phoneValue ? `${data.phoneCountryCode}${data.phoneValue}` : '',
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
                <InputFloatingLabel className='col-lg' lineCount='1' label='First Name' type='text'
                    value={data.firstName} onChangeValue={(val) => setDataAsist("firstName", val)} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='Last Name' type='text'
                    value={data.lastName} onChangeValue={(val) => setDataAsist("lastName", val)} />
            </div>
            <div className='w-100 row' >
                <DateFloatingLabel className='col-lg' label='Birth Date'
                    value={data.birthDate} onChangeValue={(val) => setDataAsist("birthDate", val)} />
                <SelectFloatingLabel className='col-lg' label='Nationality'
                    value={data.nationality} onChangeValue={(val) => setDataAsist("nationality", val)}
                    options={countries()} />
            </div>
            <div className='w-100 row' >
                <SelectFloatingLabel className='col-lg' label='Country'
                    value={data.country} onChangeValue={(val) => setDataAsist("country", val)}
                    options={countries()} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='State' type='text'
                    value={data.state} onChangeValue={(val) => setDataAsist("state", val)} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='City' type='text'
                    value={data.city} onChangeValue={(val) => setDataAsist("city", val)} />
            </div>
            <div className='w-100 row' >
                <OptionalQuestion className='col-lg pt-4' title='Are you married?'
                    trueOption='Yes' falseOption='No'
                    value={data.married} onChangeValue={(val) => setDataAsist("married", val)} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='Number of children' type='number'
                    value={data.numberOfChildren} onChangeValue={(val) => setDataAsist("numberOfChildren", val)} />
            </div>
            <div className='w-100 row' >
                <PhoneFloatingLabel className='col-lg' label='Mobile Number' 
                    countryValue={data.mobileCountryCode} phoneValue={data.mobileValue}
                    onChangeCountryValue={(val) => setDataAsist("mobileCountryCode", val)}
                    onChangePhoneValue={(val) => setDataAsist("mobileValue", val)} />
                <PhoneFloatingLabel className='col-lg' label='Phone Number'
                    countryValue={data.phoneCountryCode} phoneValue={data.phoneValue}
                    onChangeCountryValue={(val) => setDataAsist("phoneCountryCode", val)}
                    onChangePhoneValue={(val) => setDataAsist("phoneValue", val)} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='Email Address' type='email'
                    value={data.email} onChangeValue={(val) => setDataAsist("email", val)} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='Zip Code' type='IntNumber'
                    value={data.zipCode} onChangeValue={(val) => setDataAsist("zipCode", val)} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='3' label='Address' type='text'
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
