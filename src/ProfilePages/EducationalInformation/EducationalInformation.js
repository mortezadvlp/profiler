
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SvgCalendar, SvgCancel, SvgClear, SvgOK } from '../../app/constantComponents';
import { countries, DegreeList, primaryColor } from '../../app/constants';
import { addDegree, deleteDegree, editDegree, educationInitialStateSingle } from '../../app/educationSlice';
import CustomButton from '../../components/CustomButton/CustomButton';
import InputFloatingLabel from '../../components/InputFloatingLabel/InputFloatingLabel';
import OptionalQuestion from '../../components/OptionalQuestion/OptionalQuestion';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import SelectFloatingLabel from '../../components/SelectFloatingLabel/SelectFloatingLabel';
import './EducationalInformation.css';
import EducationCard from './EducationCard';

export default function EducationalInformation({ }) {

    const data = useState(useSelector(state => state.education))
    const [tempData, setTempData] = useState(educationInitialStateSingle)
    const [editMode, setEditMode] = useState(false)

    const setDataAsist = (field, value) => {
        setTempData({
            ...tempData,
            [field]: value
        })
    }

    const onClearFormClick = () => {
        setTempData(educationInitialStateSingle);
        setEditMode(false);
    }

    const onAddEditClick = () => {
        if(editMode) {
            editDegree(tempData);
        }
        else {
            addDegree(tempData);
        }
    }

    const onCardEditClick = (id) => {
        const dd = data.find(d => d.id === id);
        if(dd) {
            setTempData(dd);
            setEditMode(true);
        }
    }

    const onCardRemoveClick = (id) => {
        deleteDegree(id);
    }

    return(
        <PageTemplate title='Educational Information' className='' >
            <div className='w-100 row' >
                <SelectFloatingLabel className='col-lg' label='Degree'
                    value={tempData.degree} onChangeValue={(val) => setDataAsist("degree", val)}
                    options={DegreeList} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='University/College/Institue' type='text'
                    value={tempData.university} onChangeValue={(val) => setDataAsist("university", val)} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='Major' type='text'
                    value={tempData.major} onChangeValue={(val) => setDataAsist("major", val)} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='Orientation' type='text'
                    value={tempData.orientation} onChangeValue={(val) => setDataAsist("orientation", val)} />
            </div>
            <div className='w-100 row' >
                <SelectFloatingLabel className='col-lg' label='Country'
                    value={tempData.country} onChangeValue={(val) => setDataAsist("country", val)}
                    options={countries()} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='State' type='text'
                    value={tempData.state} onChangeValue={(val) => setDataAsist("state", val)} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='City' type='text'
                    value={tempData.city} onChangeValue={(val) => setDataAsist("city", val)} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='GPA' type='text'
                    value={tempData.gpa} onChangeValue={(val) => setDataAsist("gpa", val)} />
                <OptionalQuestion className='col-lg pt-4' title="I'm still student"
                    trueOption='Yes' falseOption='No'
                    value={tempData.stillStudent} onChangeValue={(val) => setDataAsist("stillStudent", val)} />
            </div>
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='Start Date' type='text'
                    value={tempData.startDate} onChangeValue={(val) => setDataAsist("startDate", val)}
                    icon={<SvgCalendar width='32px' height='24px' fillColor={primaryColor} />}
                    iconClickable={false} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='End Date' type='text'
                    value={tempData.endDate} onChangeValue={(val) => setDataAsist("endDate", val)}
                    icon={<SvgCalendar width='32px' height='24px' fillColor={primaryColor} />}
                    iconClickable={false} />
            </div>
            <div className='w-75 w-sm-40 row justify-content-center' >
                <CustomButton text={`${editMode ? 'Edit' : 'Add'}`} hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => onAddEditClick()} />
                <CustomButton text={`${editMode ? 'Cancel' : 'Clear Form'}`} hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={editMode ? <SvgCancel className='text-primary' width='32px' height='32px' /> : <SvgClear className='text-primary' width='32px' height='32px' />}
                    onClick={() => onClearFormClick()} />
            </div>

            <div className='info-card-container my-4 px-2 d-flex flex-column gap-3' >
                {data.forEach((element, index) => 
                    <EducationCard key={index} className='' data={element} 
                        onCardEditClick={() => onCardEditClick(element.id)}
                        onCardRemoveClick={() => onCardRemoveClick(element.id)} />
                )}
            </div>
            
        </PageTemplate>
    );
}
