
import { useState } from 'react';
import { SvgCalendar, SvgClear, SvgOK } from '../../app/constantComponents';
import { countries, primaryColor } from '../../app/constants';
import CustomButton from '../../components/CustomButton/CustomButton';
import InputFloatingLabel from '../../components/InputFloatingLabel/InputFloatingLabel';
import OptionalQuestion from '../../components/OptionalQuestion/OptionalQuestion';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import SelectFloatingLabel from '../../components/SelectFloatingLabel/SelectFloatingLabel';
import './WorkExperience.css';
import WorkExperienceCard from './WorkExperienceCard';

export default function WorkExperience({ }) {

    const [data, setData] = useState([])
    const [tempData, setTempData] = useState({
        id: -1,
        jobTitle: "",
        company: '',
        country: -1,
        state: '',
        city: '',
        responsibilities: '',
        startDate: '',
        endDate: '',
        stillNow: false,
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
                    <InputFloatingLabel className='col-lg' lineCount='1' label='Start Date' type='text'
                        value={tempData.startDate} onChangeValue={(val) => setDataAsist("startDate", val)}
                        icon={<SvgCalendar width='32px' height='24px' fillColor={primaryColor} />}
                        iconClickable={false} />
                    <InputFloatingLabel className='col-lg' lineCount='1' label='End Date' type='text'
                        value={tempData.endDate} onChangeValue={(val) => setDataAsist("endDate", val)}
                        icon={<SvgCalendar width='32px' height='24px' fillColor={primaryColor} />}
                        iconClickable={false} />
                    <OptionalQuestion className='col-lg pt-4' title="I'm still working at this position"
                        trueOption='Yes' falseOption='No'
                        value={tempData.stillNow} onChangeValue={(val) => setDataAsist("stillNow", val)} />
                </div>
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
                    <WorkExperienceCard key={index} className='' data={element} 
                        onCardEditClick={() => onCardEditClick(element.id)}
                        onCardRemoveClick={() => onCardRemoveClick(element.id)} />
                )}
            </div>
        </PageTemplate>
    );
}
