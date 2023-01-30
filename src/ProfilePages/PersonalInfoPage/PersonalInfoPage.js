
import { SvgCalendar, SvgOK } from '../../app/constantComponents';
import { countries, primaryColor } from '../../app/constants';
import CustomButton from '../../components/CustomButton/CustomButton';
import InputFloatingLabel from '../../components/InputFloatingLabel/InputFloatingLabel';
import OptionalQuestion from '../../components/OptionalQuestion/OptionalQuestion';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import PhoneFloatingLabel from '../../components/PhoneFloatingLabel/PhoneFloatingLabel';
import SelectFloatingLabel from '../../components/SelectFloatingLabel/SelectFloatingLabel';
import './PersonalInfoPage.css';


export default function PersonalInfoPage ({ }) {

    return (
        <PageTemplate title='Personal Information' className='' >
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='First Name' type='text'
                    value='' onChangeValue={() => {}} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='Last Name' type='text'
                    value='' onChangeValue={() => {}} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='Birth Date' type='text'
                    value='' onChangeValue={() => {}}
                    icon={<SvgCalendar width='32px' height='24px' fillColor={primaryColor} />}
                    iconClickable={false} />
                <SelectFloatingLabel className='col-lg' label='Nationality'
                    value={-1} onChangeValue={() => {}}
                    options={countries()} />
            </div>
            <div className='w-100 row' >
                <SelectFloatingLabel className='col-lg' label='Country'
                    value={-1} onChangeValue={() => {}}
                    options={countries()} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='State' type='text'
                    value='' onChangeValue={() => {}} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='City' type='text'
                    value='' onChangeValue={() => {}} />
            </div>
            <div className='w-100 row' >
                <OptionalQuestion className='col-lg pt-4' title='Are you married?'
                    trueOption='Yes' falseOption='No'
                    value={false} onChangeValue={() => {}} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='Number of children' type='text'
                    value='' onChangeValue={() => {}} />
            </div>
            <div className='w-100 row' >
                <PhoneFloatingLabel className='col-lg' label='Mobile Number' 
                    value={''} onChangeValue={() => {}} />
                <PhoneFloatingLabel className='col-lg' label='Phone Number' 
                    value={''} onChangeValue={() => {}} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='Email Address' type='text'
                    value='' onChangeValue={() => {}} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='Zip Code' type='text'
                    value='' onChangeValue={() => {}} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='3' label='Address' type='text'
                    value='' onChangeValue={() => {}} />
            </div>

            <div className='w-100 row justify-content-center' >
                <CustomButton text='Save Changes' hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => {}} />
            </div>
        </PageTemplate>
    );
}
