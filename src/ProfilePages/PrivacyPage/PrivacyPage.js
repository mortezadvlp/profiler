
import { SvgOK } from '../../app/constantComponents';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox';
import InputFloatingLabel from '../../components/InputFloatingLabel/InputFloatingLabel';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './PrivacyPage.css'

export default function PrivacyPage({ }) {

    return (
        <PageTemplate title='Privacy' className='' >
            <div className='w-100 row' >
                <InputFloatingLabel className='col-sm' lineCount='1' label='Username' type='text'
                    value='' onChangeValue={() => {}} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-sm' lineCount='1' label='New Password' type='password'
                    value='' onChangeValue={() => {}} />
                <InputFloatingLabel className='col-sm' lineCount='1' label='Repeat New Password' type='password'
                    value='' onChangeValue={() => {}} />
            </div>
            <div className='w-100 row justify-content-center' >
                <CustomButton text='Change Password' hasIcon={true} className='col-sm mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => {}} />
            </div>
            <div className='w-100 d-flex flex-column gap-2 px-3 mt-4' >
                <CustomCheckBox text='Do not show my email to others (Show only to my contacts)' isChecked={false} onChangeChecked={() => {}} />
                <CustomCheckBox text='Send me notification' isChecked={true} onChangeChecked={() => {}} />
                <CustomCheckBox text='Send me important messages from admin' isChecked={true} onChangeChecked={() => {}} />
            </div>
            <div className='w-100 row justify-content-center' >
                <CustomButton text='Save Changes' hasIcon={true} className='col-sm mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => {}} />
            </div>
        </PageTemplate>
    );
}
