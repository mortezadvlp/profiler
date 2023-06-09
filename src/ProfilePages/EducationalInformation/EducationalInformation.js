
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgCancel, SvgClear, SvgOK } from '../../app/constantComponents';
import { countries, DegreeList, minInputsHeight, primaryColor, textLabels } from '../../app/constants';
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

    const darkMode = useSelector(state => state.settings.darkMode);
    const language = useSelector(state => state.settings.language);
    const data = useSelector(state => state.education)
    const [tempData, setTempData] = useState(educationInitialStateSingle)
    const [editMode, setEditMode] = useState(false)
    const [removeMessage, setRemoveMessage] = useState({text: '', id: null});
    const [langDegreeList, setLangDegreeList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        var degrees = [];
        if (language == 'en') {
            degrees = DegreeList.map((d) => {
                return {value: d.value, label: d.label}
            });
        }
        else {
            degrees = DegreeList.map((d) => {
                return {value: d.value, label: d.fa}
            });
        }
        setLangDegreeList(degrees);
    }, [language])

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
        if(!tempData.stillStudent && !validatePersianDateFormat(tempData.endDate)) {
            onShowMessage(textLabels.endDateNotFormat[language]);
            return;
        }
        if(!tempData.stillStudent && !validatePersianDate(tempData.endDate)) {
            onShowMessage(textLabels.endDateValid[language]);
            return;
        }
        if(!validateFloatNumber(tempData.gpa)) {
            onShowMessage(textLabels.gpaValid[language]);
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
        setRemoveMessage({text: textLabels.removeCard[language], id: id})
    }
    const confirmRemove = () => {
        dispatch(deleteDegree(removeMessage.id));
        setRemoveMessage({text: '', id: null});
        setEditMode(false);
        onDone();
    }

    return(
        <>
        <PageTemplate smallView={smallView} title={textLabels.educationTitle[language]} className='' >
            <div className='w-100 row' >
                <SelectInputFloatingLabel className='col-lg' label={textLabels.degree[language]} minHeight={minInputsHeight} colorPrimary={primaryColor}
                    value={tempData.degree} onChangeValue={(val) => setDataAsist("degree", val)} dark={darkMode}
                    options={langDegreeList} />
                <NormalInputFloatingLabel className='col-lg' label={textLabels.university[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.university} onChangeValue={(val) => setDataAsist("university", val)} />
            </div>
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' lineCount='1' label={textLabels.major[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.major} onChangeValue={(val) => setDataAsist("major", val)} />
                <NormalInputFloatingLabel className='col-lg' lineCount='1' label={textLabels.orientation[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.orientation} onChangeValue={(val) => setDataAsist("orientation", val)} />
            </div>
            <div className='w-100 row' >
                <SelectInputFloatingLabel className='col-lg' label={textLabels.country[language]} minHeight={minInputsHeight} colorPrimary={primaryColor}
                    value={tempData.country} onChangeValue={(val) => setDataAsist("country", val)} dark={darkMode}
                    options={countries()} />
                <NormalInputFloatingLabel className='col-lg' lineCount='1' label={textLabels.state[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.state} onChangeValue={(val) => setDataAsist("state", val)} />
                <NormalInputFloatingLabel className='col-lg' lineCount='1' label={textLabels.city[language]} type='text' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.city} onChangeValue={(val) => setDataAsist("city", val)} />
            </div>
            <div className='w-100 row' >
                <NormalInputFloatingLabel className='col-lg' label={textLabels.gpa[language]} type='FloatNumber' minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.gpa} onChangeValue={(val) => setDataAsist("gpa", val)} />
                <QuestionInputFloatingLabel className='col-lg pt-4' title={textLabels.stillStudent[language]} minHeight={minInputsHeight} dark={darkMode}
                    trueOption={textLabels.yes[language]} falseOption={textLabels.no[language]}
                    value={tempData.stillStudent} onChangeValue={(val) => setDataAsist("stillStudent", val)} />
            </div>
            <div className='w-100 row' >
                <DateInputFloatingLabel className='col-lg' label={textLabels.startDate[language]} hasIcon={true} minHeight={minInputsHeight} dark={darkMode}
                    shamsiMode={true} value={tempData.startDate} onChangeValue={(val) => setDataAsist("startDate", val)} />
                <DateInputFloatingLabel className='col-lg' label={textLabels.endDate[language]} hasIcon={true} minHeight={minInputsHeight} dark={darkMode}
                    value={tempData.endDate} onChangeValue={(val) => setDataAsist("endDate", val)}
                    shamsiMode={true} disabled={tempData.stillStudent} />
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
