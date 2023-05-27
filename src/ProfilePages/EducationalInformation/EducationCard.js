import { useEffect, useState } from "react";
import { SvgEdit, SvgRemove } from "../../app/constantComponents";
import { getCountryLabel, toPersianDateDate } from "../../app/utilities";
import { useSelector } from "react-redux";
import { DegreeList, textLabels } from "../../app/constants";


export default function EducationCard({ data = null, className = '', onEditClick, onRemoveClick }) {

    const darkMode = useSelector(state => state.settings.darkMode);
    const language = useSelector(state => state.settings.language);
    const [inData, setInData] = useState(null);

    useEffect(() => {
        if(!data) {
            setInData({
                id: -1,
                degree: "Degree",
                major: 'Major',
                orientation: 'Orientation',
                country: 'Country',
                university: 'University',
                startDate: 'StartDate',
                endDate: 'EndDate',
                stillStudent: false
            })
        }
        else {
            const temp = {
                ...data, 
                startDate: data.startDate === 0 ? '' : toPersianDateDate(new Date(data.startDate)),
                endDate: data.endDate === 0 ? '' : toPersianDateDate(new Date(data.endDate))
            }
            setInData(temp);
        }
    }, [data])

    return (
        <div className={`w-100 bg-primary d-flex flex-row gap-2 p-3 rounded-4 ${className}`} >
            <div className="w-100 d-flex flex-column gap-1" >
                <span className="text-white fw-bold" >
                    {`${inData === null ? '' : language === 'en' ? DegreeList.find(d => d.value === inData.degree).label : DegreeList.find(d => d.value === inData.degree).fa}`}
                </span>
                <span className="text-white fw-bold" >{`${inData?.major} ${inData?.orientation && inData?.orientation !== '-' ? ` / ${inData?.orientation}` : ''}`}</span>
                <span className="text-white" >{`${getCountryLabel(inData?.country)} / ${inData?.university}`}</span>
                <span className="text-white" >{`${textLabels.from[language]} ${inData?.startDate} ${textLabels.to[language]} ${inData?.stillStudent ? textLabels.now[language] : inData?.endDate}`}</span>
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
