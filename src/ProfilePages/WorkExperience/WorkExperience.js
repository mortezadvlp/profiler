
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgCalendar, SvgCancel, SvgClear, SvgOK } from '../../app/constantComponents';
import { countries, disabledColor, primaryColor } from '../../app/constants';
import { fromPersianDateStr, toPersianDateDate } from '../../app/utilities';
import { addExperience, deleteExperience, editExperience, workExperienceInitialStateSingle } from '../../app/workExperienceSlice';
import CustomButton from '../../components/CustomButton/CustomButton';
import InputFloatingLabel from '../../components/InputFloatingLabel/InputFloatingLabel';
import OptionalQuestion from '../../components/OptionalQuestion/OptionalQuestion';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import SelectFloatingLabel from '../../components/SelectFloatingLabel/SelectFloatingLabel';
import './WorkExperience.css';
import WorkExperienceCard from './WorkExperienceCard';

export default function WorkExperience({ }) {

    const data = useState(useSelector(state => state.workExperience))
    const [tempData, setTempData] = useState(workExperienceInitialStateSingle);
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch();

    const setDataAsist = (field, value) => {
        setTempData({
            ...tempData,
            [field]: value
        })
    }

    const onClearFormClick = () => {
        setTempData(workExperienceInitialStateSingle);
        setEditMode(false);
    }

    const onAddEditClick = () => {
        const temp = {
            ...tempData,
            startDate: new Date(fromPersianDateStr(tempData.startDate)).getTime(),
            endDate: tempData.stillWorking ? 0 : new Date(fromPersianDateStr(tempData.endDate)).getTime()
        };
        if(editMode) {
            dispatch(editExperience(temp));
        }
        else {
            dispatch(addExperience(temp));
        }
    }

    const onCardEditClick = (id) => {
        const dd = data.find(d => d.id === id);
        if(dd) {
            const temp = {
                ...dd,
                startDate: dd.startDate === 0 ? '' : toPersianDateDate(new Date(dd.startDate)),
                endDate: dd.endDate === 0 ? '' : toPersianDateDate(new Date(dd.endDate))
            }
            setTempData(temp);
            setEditMode(true);
        }
    }

    const onCardRemoveClick = (id) => {
        dispatch(deleteExperience(id));
    }

    return (
        <PageTemplate title='Work Experience' className='' >
            <div className='w-100 row' >
                <InputFloatingLabel className='col-lg' lineCount='1' label='Job Title' type='text'
                    value={tempData.jobTitle} onChangeValue={(val) => setDataAsist("jobTitle", val)} />
                <InputFloatingLabel className='col-lg' lineCount='1' label='ompany / Organization' type='text'
                    value={tempData.company} onChangeValue={(val) => setDataAsist("company", val)} />
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
                <InputFloatingLabel className='col-lg' lineCount='7' label='Responsibilities / Achievments' type='text'
                    value={tempData.responsibilities} onChangeValue={(val) => setDataAsist("responsibilities", val)} />
                <div className='col-lg d-flex flex-column' >
                    <InputFloatingLabel className='col-lg' lineCount='1' label='Start Date' format='yyyy/mm/dd' type='text'
                        value={tempData.startDate} onChangeValue={(val) => setDataAsist("startDate", val)}
                        icon={<SvgCalendar width='32px' height='24px' fillColor={primaryColor} />}
                        iconClickable={false} />
                    <InputFloatingLabel className='col-lg' lineCount='1' label='End Date' format='yyyy/mm/dd' type='text'
                        value={tempData.endDate} onChangeValue={(val) => setDataAsist("endDate", val)}
                        disabled={tempData.stillWorking}
                        icon={<SvgCalendar width='32px' height='24px' fillColor={tempData.stillWorking ? disabledColor : primaryColor} />}
                        iconClickable={false} />
                    <OptionalQuestion className='col-lg pt-4' title="I'm still working at this position"
                        trueOption='Yes' falseOption='No'
                        value={tempData.stillWorking} onChangeValue={(val) => setDataAsist("stillWorking", val)} />
                </div>
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
                    <WorkExperienceCard key={index} className='' data={element} 
                        onCardEditClick={() => onCardEditClick(element.id)}
                        onCardRemoveClick={() => onCardRemoveClick(element.id)} />
                )}
            </div>
        </PageTemplate>
    );
}
