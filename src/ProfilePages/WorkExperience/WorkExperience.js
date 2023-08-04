
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgCancel, SvgClear, SvgOK } from '../../app/constantComponents';
import { countries, minInputsHeight, primaryColor, textLabels } from '../../app/constants';
import { fromPersianDateStr, toPersianDateDate, validatePersianDate, validatePersianDateFormat } from '../../app/utilities';
import { addExperience, deleteExperience, editExperience, workExperienceInitialStateSingle } from '../../app/workExperienceSlice';
import CustomButton from '../../components/CustomButton/CustomButton';
import MessageBox from '../../components/MessageBox/MessageBox';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import './WorkExperience.css';
import WorkExperienceCard from './WorkExperienceCard';
import 'reactjs-floating-label-inputs/dist/index.css';
import { NormalInputFloatingLabel, DateInputFloatingLabel, SelectInputFloatingLabel,
        QuestionInputFloatingLabel  } from 'reactjs-floating-label-inputs';

export default function WorkExperience({ smallView = false, onShowMessage = () => {}, onDone = () => {} }) {

    const darkMode = useSelector(state => state.settings.darkMode);
    const language = useSelector(state => state.settings.language);
    const data = useSelector(state => state.workExperience);
    const [tempData, setTempData] = useState(workExperienceInitialStateSingle);
    const [editMode, setEditMode] = useState(false);
    const [removeMessage, setRemoveMessage] = useState({text: '', id: null});
    const dispatch = useDispatch();

    const setDataAsist = (field, value) => {
        setTempData({
            ...tempData,
            [field]: value
        })
    }

    const onClearFormClick = () => {
        if(!editMode) {
            setTempData(workExperienceInitialStateSingle);
        }
        setEditMode(false);
    }

    const onAddEditClick = () => {
        if(tempData.jobTitle === '' || tempData.company === '' || tempData.responsibilities === ''
            || tempData.country === '' || tempData.state === '' || tempData.city === ''
            || tempData.startDate === '' || (!tempData.stillWorking && tempData.endDate === '')) {

            onShowMessage(textLabels.allFields[language]);
            return;
        }
        
        if(!validatePersianDateFormat(tempData.startDate)) {
            onShowMessage(textLabels.startDateNotFormat[language]);
            return;
        }
        if(!validatePersianDate(tempData.startDate)) {
            onShowMessage(textLabels.startDateValid[language]);
            return;
        }
        if(!tempData.stillWorking && !validatePersianDateFormat(tempData.endDate)) {
            onShowMessage(textLabels.endDateNotFormat[language]);
            return;
        }
        if(!tempData.stillWorking && !validatePersianDate(tempData.endDate)) {
            onShowMessage(textLabels.endDateValid[language]);
            return;
        }

        const temp = {
            ...tempData,
            startDate: new Date(language === 'fa' ? fromPersianDateStr(tempData.startDate) : tempData.startDate).getTime(),
            endDate: tempData.stillWorking ? 0 : new Date(language === 'fa' ? fromPersianDateStr(tempData.endDate) : tempData.endDate).getTime(),
        };
        if(editMode) {
            dispatch(editExperience(temp));
            setTempData(workExperienceInitialStateSingle);
            setEditMode(false);
        }
        else {
            dispatch(addExperience(temp));
            setEditMode(false);
        }
        onDone();
    }

    const onCardEditClick = (id) => {
        const dd = data.find(d => d.id === id);
        if(dd) {
            const temp = {
                ...dd,
                startDate: dd.startDate === 0 ? '' : language === 'fa' ? toPersianDateDate(new Date(dd.startDate)) : new Date(dd.startDate),
                endDate: dd.endDate === 0 ? '' : language === 'fa' ? toPersianDateDate(new Date(dd.endDate)) : new Date(dd.endDate),
            }
            setTempData(temp);
            setEditMode(true);
        }
    }

    const onCardRemoveClick = (id) => {
        setRemoveMessage({text: 'You are going to remove the card.', id: id})
    }
    const confirmRemove = () => {
        dispatch(deleteExperience(removeMessage.id));
        setRemoveMessage({text: '', id: null});
        setEditMode(false);
        onDone();
    }

    return (
        <>
        <PageTemplate smallView={smallView} title={textLabels.workExp[language]} className='' >
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' label={textLabels.job[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.jobTitle} onChangeValue={(val) => setDataAsist("jobTitle", val)} />
                <NormalInputFloatingLabel className='col-lg' label={textLabels.organization[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.company} onChangeValue={(val) => setDataAsist("company", val)} />
            </div>
            <div className='w-100 row' >
                <SelectInputFloatingLabel className='col-lg' label={textLabels.country[language]} minHeight={minInputsHeight} colorPrimary={primaryColor}
                    value={tempData.country} onChangeValue={(val) => setDataAsist("country", val)} dark={darkMode}
                    options={countries()} />
                <NormalInputFloatingLabel className='col-lg' label={textLabels.state[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.state} onChangeValue={(val) => setDataAsist("state", val)} />
                <NormalInputFloatingLabel className='col-lg' label={textLabels.city[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.city} onChangeValue={(val) => setDataAsist("city", val)} />
            </div>
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' lineCount='7' label={textLabels.responsibilities[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.responsibilities} onChangeValue={(val) => setDataAsist("responsibilities", val)} />
                <div className='col-lg d-flex flex-column' >
                    <DateInputFloatingLabel className='col-lg' label={textLabels.startDate[language]} hasIcon={true} minHeight={minInputsHeight} dark={darkMode}
                        shamsiMode={language === 'fa'} value={tempData.startDate} onChangeValue={(val) => setDataAsist("startDate", val)} />
                    <DateInputFloatingLabel className='col-lg' label={textLabels.endDate[language]} hasIcon={true} minHeight={minInputsHeight} dark={darkMode}
                        shamsiMode={language === 'fa'} value={tempData.endDate} onChangeValue={(val) => setDataAsist("endDate", val)}
                        disabled={tempData.stillWorking} />
                    <QuestionInputFloatingLabel className='col-lg pt-4' title={textLabels.stillWorking[language]} minHeight={minInputsHeight} dark={darkMode}
                        trueOption={textLabels.yes[language]} falseOption={textLabels.no[language]}
                        value={tempData.stillWorking} onChangeValue={(val) => setDataAsist("stillWorking", val)} />
                </div>
            </div>
            <div className='w-75 w-sm-40 row justify-content-center' >
                <CustomButton text={`${editMode ? textLabels.edit[language] : textLabels.add[language]}`} hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => onAddEditClick()} />
                <CustomButton text={`${editMode ? textLabels.cancel[language] : textLabels.clearForm[language]}`} hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={editMode ? <SvgCancel className='text-primary' width='32px' height='32px' /> : <SvgClear className='text-primary' width='32px' height='32px' />}
                    onClick={() => onClearFormClick()} />
            </div>

            <div className='info-card-container my-4 px-2 d-flex flex-column gap-3' >
                {data.map((element, index) => 
                    <WorkExperienceCard key={index} className='' data={element} 
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
