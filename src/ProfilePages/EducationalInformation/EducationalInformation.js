
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgCalendar, SvgCancel, SvgClear, SvgOK } from '../../app/constantComponents';
import { countries, DegreeList, disabledColor, primaryColor } from '../../app/constants';
import { addDegree, deleteDegree, editDegree, educationInitialStateSingle } from '../../app/educationSlice';
import { fromPersianDateStr, toPersianDateDate, validateFloatNumber, validatePersianDate, validatePersianDateFormat } from '../../app/utilities';
import CustomButton from '../../components/CustomButton/CustomButton';
import DateFloatingLabel from '../../components/DateFloatingLabel/DateFloatingLabel';
import InputFloatingLabel from '../../components/InputFloatingLabel/InputFloatingLabel';
import MessageBox from '../../components/MessageBox/MessageBox';
import OptionalQuestion from '../../components/OptionalQuestion/OptionalQuestion';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import SelectFloatingLabel from '../../components/SelectFloatingLabel/SelectFloatingLabel';
import './EducationalInformation.css';
import EducationCard from './EducationCard';

export default function EducationalInformation({ smallView = false, onShowMessage = () => {}, onDone = () => {} }) {

    const data = useSelector(state => state.education)
    const [tempData, setTempData] = useState(educationInitialStateSingle)
    const [editMode, setEditMode] = useState(false)
    const [removeMessage, setRemoveMessage] = useState({text: '', id: null});
    const dispatch = useDispatch();

    const setDataAsist = (field, value) => {
        setTempData({
            ...tempData,
            [field]: value
        });
    }

    const onClearFormClick = () => {
        if(!editMode) {
            setTempData(educationInitialStateSingle);
        }
        setEditMode(false);
    }

    const onAddEditClick = () => {
        if(tempData.degree === '' || tempData.university === '' || tempData.major === ''
            || tempData.country === '' || tempData.state === '' || tempData.city === ''
            || tempData.startDate === '' || (!tempData.stillStudent && tempData.endDate === '')) {

            onShowMessage('All fields are needed');
            return;
        }
        
        if(!validatePersianDateFormat(tempData.startDate)) {
            onShowMessage('Start date is not in correct format');
            return;
        }
        if(!validatePersianDate(tempData.startDate)) {
            onShowMessage('Enter a valid start date');
            return;
        }
        if(!tempData.stillStudent && !validatePersianDateFormat(tempData.endDate)) {
            onShowMessage('End date is not in correct format');
            return;
        }
        if(!tempData.stillStudent && !validatePersianDate(tempData.endDate)) {
            onShowMessage('Enter a valid end date');
            return;
        }
        if(!validateFloatNumber(tempData.gpa)) {
            onShowMessage('Enter a valid GPA');
            return;
        }

        const temp = {
            ...tempData,
            startDate: new Date(fromPersianDateStr(tempData.startDate)).getTime(),
            endDate: tempData.stillStudent ? 0 : new Date(fromPersianDateStr(tempData.endDate)).getTime()
        };
        if(editMode) {
            dispatch(editDegree(temp));
            setTempData(educationInitialStateSingle);
            setEditMode(false);
        }
        else {
            dispatch(addDegree(temp));
            setEditMode(false);
        }
        onDone();
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
        setRemoveMessage({text: 'You are going to remove the card.', id: id})
    }
    const confirmRemove = () => {
        dispatch(deleteDegree(removeMessage.id));
        setRemoveMessage({text: '', id: null});
        setEditMode(false);
        onDone();
    }

    return(
        <>
        <PageTemplate smallView={smallView} title='Educational Information' className='' >
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
                <InputFloatingLabel className='col-lg' lineCount='1' label='GPA' type='FloatNumber'
                    value={tempData.gpa} onChangeValue={(val) => setDataAsist("gpa", val)} />
                <OptionalQuestion className='col-lg pt-4' title="I'm still student"
                    trueOption='Yes' falseOption='No'
                    value={tempData.stillStudent} onChangeValue={(val) => setDataAsist("stillStudent", val)} />
            </div>
            <div className='w-100 row' >
                <DateFloatingLabel className='col-lg' label='Start Date'
                    value={tempData.startDate} onChangeValue={(val) => setDataAsist("startDate", val)} />
                <DateFloatingLabel className='col-lg' label='End Date'
                    value={tempData.endDate} onChangeValue={(val) => setDataAsist("endDate", val)}
                    disabled={tempData.stillStudent} />
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
                {data.map((element, index) => 
                    <EducationCard key={index} className='' data={element} 
                        onEditClick={() => onCardEditClick(element.id)}
                        onRemoveClick={() => onCardRemoveClick(element.id)} />
                )}
            </div>
            
        </PageTemplate>
        {removeMessage.text&&
            <MessageBox text={removeMessage.text} questionMode={true} onClose={() => setRemoveMessage({text: '', id: null})} onDone={() => confirmRemove()} />
        }
        </>
    );
}
