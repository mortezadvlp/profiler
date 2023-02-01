
import { useState } from 'react';
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

    const [data, setData] = useState([])
    const [tempData, setTempData] = useState({
        id: -1,
        degree: -1,
        university: '',
        major: '',
        orientation: '',
        country: -1,
        state: '',
        city: '',
        gpa: '',
        stillNow: false,
        startDate: '',
        endDate: '',
    })

    const setDataAsist = (field, value) => {
        setTempData({
            ...tempData,
            [field]: value
        })
    }

    const onCardEditClick = (id) => {

    }

    const onCardRemoveClick = (id) => {
        
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
                    value={tempData.stillNow} onChangeValue={(val) => setDataAsist("stillNow", val)} />
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
                <CustomButton text='Add / Edit' hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={() => {}} />
                <CustomButton text='Clear Form' hasIcon={true} className='col-lg mx-4 mt-4' maxWidthPx={200}
                    svg={<SvgClear className='text-primary' width='32px' height='32px' />}
                    onClick={() => {}} />
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
