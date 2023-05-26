
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgCancel, SvgClear, SvgOK } from '../../app/constantComponents';
import { countries, DegreeList, minInputsHeight, primaryColor } from '../../app/constants';
import { addDegree, deleteDegree, editDegree, educationInitialStateSingle } from '../../app/educationSlice';
import { fromPersianDateStr, toPersianDateDate, validateFloatNumber, validatePersianDate, validatePersianDateFormat } from '../../app/utilities';
import CustomButton from '../../components/CustomButton/CustomButton';
import MessageBox from '../../components/MessageBox/MessageBox';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './EducationalInformation.css';
import EducationCard from './EducationCard';
import 'reactjs-floating-label-inputs/dist/index.css'
import { SelectInputFloatingLabel, NormalInputFloatingLabel, QuestionInputFloatingLabel,
        DateInputFloatingLabel } from 'reactjs-floating-label-inputs';

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
                <SelectInputFloatingLabel className='col-lg' label='Degree' minHeight={minInputsHeight} colorPrimary={primaryColor}
                    value={tempData.degree} onChangeValue={(val) => setDataAsist("degree", val)}
                    options={DegreeList} />
                <NormalInputFloatingLabel className='col-lg' label='University/College/Institue' type='text' minHeight={minInputsHeight}
                    value={tempData.university} onChangeValue={(val) => setDataAsist("university", val)} />
            </div>
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' lineCount='1' label='Major' type='text' minHeight={minInputsHeight}
                    value={tempData.major} onChangeValue={(val) => setDataAsist("major", val)} />
                <NormalInputFloatingLabel className='col-lg' lineCount='1' label='Orientation' type='text' minHeight={minInputsHeight}
                    value={tempData.orientation} onChangeValue={(val) => setDataAsist("orientation", val)} />
            </div>
            <div className='w-100 row' >
                <SelectInputFloatingLabel className='col-lg' label='Country' minHeight={minInputsHeight} colorPrimary={primaryColor}
                    value={tempData.country} onChangeValue={(val) => setDataAsist("country", val)}
                    options={countries()} />
                <NormalInputFloatingLabel className='col-lg' lineCount='1' label='State' type='text' minHeight={minInputsHeight}
                    value={tempData.state} onChangeValue={(val) => setDataAsist("state", val)} />
                <NormalInputFloatingLabel className='col-lg' lineCount='1' label='City' type='text' minHeight={minInputsHeight}
                    value={tempData.city} onChangeValue={(val) => setDataAsist("city", val)} />
            </div>
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' label='GPA' type='FloatNumber' minHeight={minInputsHeight}
                    value={tempData.gpa} onChangeValue={(val) => setDataAsist("gpa", val)} />
                <QuestionInputFloatingLabel className='col-lg pt-4' title="I'm still student" minHeight={minInputsHeight}
                    trueOption='Yes' falseOption='No'
                    value={tempData.stillStudent} onChangeValue={(val) => setDataAsist("stillStudent", val)} />
            </div>
            <div className='w-100 row' >
                <DateInputFloatingLabel className='col-lg' label='Start Date' hasIcon={true} minHeight={minInputsHeight}
                    shamsiMode={true} value={tempData.startDate} onChangeValue={(val) => setDataAsist("startDate", val)} />
                <DateInputFloatingLabel className='col-lg' label='End Date' hasIcon={true} minHeight={minInputsHeight}
                    value={tempData.endDate} onChangeValue={(val) => setDataAsist("endDate", val)}
                    shamsiMode={true} disabled={tempData.stillStudent} />
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
