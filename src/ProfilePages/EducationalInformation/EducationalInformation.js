
import { SvgCalendar, SvgClear, SvgOK } from '../../app/constantComponents';
import { countries, DegreeList, primaryColor } from '../../app/constants';
import CustomButton from '../../components/CustomButton/CustomButton';
import InputFloatingLabel from '../../components/InputFloatingLabel/InputFloatingLabel';
import OptionalQuestion from '../../components/OptionalQuestion/OptionalQuestion';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import SelectFloatingLabel from '../../components/SelectFloatingLabel/SelectFloatingLabel';
import './EducationalInformation.css';
import EducationCard from './EducationCard';

export default function EducationalInformation({ }) {

    const onCardEditClick = (id) => {

    }

    const onCardRemoveClick = (id) => {

    }

    return(
        <PageTemplate title='Educational Information' className='' >
            <div className='w-100 row' >
                <SelectFloatingLabel className='col-sm' label='Degree'
                    value={-1} onChangeValue={() => {}}
                    options={DegreeList} />
                <InputFloatingLabel className='col-sm' lineCount='1' label='University/College/Institue' type='text'
                    value='' onChangeValue={() => {}} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-sm' lineCount='1' label='Major' type='text'
                    value='' onChangeValue={() => {}} />
                <InputFloatingLabel className='col-sm' lineCount='1' label='Orientation' type='text'
                    value='' onChangeValue={() => {}} />
            </div>
            <div className='w-100 row' >
                <SelectFloatingLabel className='col-sm' label='Country'
                    value={-1} onChangeValue={() => {}}
                    options={countries()} />
                <InputFloatingLabel className='col-sm' lineCount='1' label='State' type='text'
                    value='' onChangeValue={() => {}} />
                <InputFloatingLabel className='col-sm' lineCount='1' label='City' type='text'
                    value='' onChangeValue={() => {}} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-sm' lineCount='1' label='GPA' type='text'
                    value='' onChangeValue={() => {}} />
                <OptionalQuestion className='col-sm pt-4' title="I'm still student"
                    trueOption='Yes' falseOption='No'
                    value={false} onChangeValue={() => {}} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-sm' lineCount='1' label='Start Date' type='text'
                    value='' onChangeValue={() => {}}
                    icon={<SvgCalendar width='32px' height='24px' fillColor={primaryColor} />}
                    iconClickable={false} />
                <InputFloatingLabel className='col-sm' lineCount='1' label='End Date' type='text'
                    value='' onChangeValue={() => {}}
                    icon={<SvgCalendar width='32px' height='24px' fillColor={primaryColor} />}
                    iconClickable={false} />
            </div>
            <div className='w-75 w-sm-40 row justify-content-center' >
                <CustomButton text='Add / Edit' hasIcon={true} className='col-sm mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => {}} />
                <CustomButton text='Clear Form' hasIcon={true} className='col-sm mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgClear className='text-primary' width='32px' height='32px' />}
                    onClick={() => {}} />
            </div>

            <div className='info-card-container my-4 px-2 d-flex flex-column gap-3' >
                <EducationCard className='' data={null} 
                    onCardEditClick={(id) => onCardEditClick(id)}
                    onCardRemoveClick={(id) => onCardRemoveClick(id)} />
                <EducationCard className='' data={null} 
                    onEditClick={(id) => onCardEditClick(id)}
                    onRemoveClick={(id) => onCardRemoveClick(id)} />
            </div>
            
        </PageTemplate>
    );
}
