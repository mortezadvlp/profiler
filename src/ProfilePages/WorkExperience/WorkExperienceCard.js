import { useEffect, useState } from "react";
import { SvgEdit, SvgRemove } from "../../app/constantComponents";
import { getCountryLabel, getDateString, toPersianDateDate } from "../../app/utilities";
import { useSelector } from "react-redux";
import { textLabels } from "../../app/constants";


export default function WorkExperienceCard({ data = null, className = '', onEditClick, onRemoveClick }) {

    const darkMode = useSelector(state => state.settings.darkMode);
    const language = useSelector(state => state.settings.language);
    const [inData, setInData] = useState(null);

    useEffect(() => {
        if(!data) {
            setInData({
                id: -1,
                jobTitle: "Job Title",
                country: 'Country',
                city: 'City',
                company: 'Company',
                startDate: 'StartDate',
                endDate: 'EndDate',
                stillWorking: false
            })
        }
        else {
            const temp = {
                ...data, 
                startDate: data.startDate === 0 ? '' : language === 'fa' ? toPersianDateDate(new Date(data.startDate)) : getDateString(new Date(data.startDate)),
                endDate: data.endDate === 0 ? '' : language === 'fa' ? toPersianDateDate(new Date(data.endDate)) : getDateString(new Date(data.endDate)),
            }
            setInData(temp);
        }
    }, [data])

    return (
        <div className={`w-100 bg-primary d-flex flex-row gap-2 p-3 rounded-4 ${className}`} >
            <div className="w-100 d-flex flex-column gap-1" >
                <span className="text-white fw-bold" >{`${inData?.jobTitle}`}</span>
                <span className="text-white" >{`${getCountryLabel(inData?.country)} / ${inData?.city}`}</span>
                <span className="text-white" >{`${inData?.company}`}</span>
                <span className="text-white" >
                    {`${textLabels.from[language]} ${inData?.startDate} ${textLabels.to[language]} ${inData?.stillWorking ? textLabels.now[language] : inData?.endDate}`}
                </span>
            </div>
            <div className="d-flex flex-column gap-2" >
                <button className="custom-button bg-white border-0 rounded-circle p-2" onClick={() => onEditClick(inData?.id)} >
                    <SvgEdit className="text-primary" />
                </button>
                <button className="custom-button bg-white border-0 rounded-circle p-2" onClick={() => onRemoveClick(inData?.id)} >
                    <SvgRemove className="text-primary" />
                </button>
            </div>
        </div>
    );
}
