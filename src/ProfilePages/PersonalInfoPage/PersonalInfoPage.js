
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SvgCalendar, SvgOK } from '../../app/constantComponents';
import { countries, primaryColor } from '../../app/constants';
import { updateAll } from '../../app/personalSlice';
import CustomButton from '../../components/CustomButton/CustomButton';
import InputFloatingLabel from '../../components/InputFloatingLabel/InputFloatingLabel';
import OptionalQuestion from '../../components/OptionalQuestion/OptionalQuestion';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import PhoneFloatingLabel from '../../components/PhoneFloatingLabel/PhoneFloatingLabel';
import SelectFloatingLabel from '../../components/SelectFloatingLabel/SelectFloatingLabel';
import './PersonalInfoPage.css';


export default function PersonalInfoPage ({ }) {

    const [data, setData] = useState(useSelector(state => state.personal))

    const setDataAsist = (field, value) => {
        setData({
            ...data,
            [field]: value
        })
    }

    const onSaveChangesClick = () => {
        updateAll(data);
    }

    return (
        <PageTemplate title='Personal Information' className='' >
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='First Name' type='text'
                    value={data.firstName} onChangeValue={(val) => setDataAsist("firstName", val)} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='Last Name' type='text'
                    value={data.lastName} onChangeValue={(val) => setDataAsist("lastName", val)} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='Birth Date' type='text'
                    value={data.birthDate} onChangeValue={(val) => setDataAsist("birthDate", val)}
                    icon={<SvgCalendar width='32px' height='24px' fillColor={primaryColor} />}
                    iconClickable={false} />
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
                    value={data.mobile} onChangeValue={(val) => setDataAsist("mobile", val)} />
                <PhoneFloatingLabel className='col-lg' label='Phone Number' 
                    value={data.phone} onChangeValue={(val) => setDataAsist("phone", val)} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='Email Address' type='email'
                    value={data.email} onChangeValue={(val) => setDataAsist("email", val)} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='Zip Code' type='text'
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
