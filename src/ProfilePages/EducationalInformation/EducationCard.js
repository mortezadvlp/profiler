import { useEffect, useState } from "react";
import { SvgEdit, SvgRemove } from "../../app/constantComponents";


export default function EducationCard({ data = null, className = '', onEditClick, onRemoveClick }) {

    const [inData, setInData] = useState(data);

    useEffect(() => {
        if(!data) {
            setInData({
                id: 0,
                degree: "Degree",
                major: 'Major',
                orientation: 'Orientation',
                country: 'Country',
                university: 'University',
                startDate: 'StartDate',
                endDate: 'EndDate',
                stillNow: false
            })
        }
    }, [data])

    return (
        <div className={`w-100 bg-primary d-flex flex-row gap-2 p-3 rounded-4 ${className}`} >
            <div className="w-100 d-flex flex-column gap-2" >
                <div className="d-flex flex-column flex-sm-row gap-2" >
                    <span className="text-white fw-bold" >{`${inData?.degree}`}</span>
                    <span className="text-white fw-bold" >{`${inData?.major} / ${inData?.orientation}`}</span>
                </div>
                <span className="text-white" >{`${inData?.country} / ${inData?.university}`}</span>
                <span className="text-white" >{`From ${inData?.startDate} to ${inData?.stillNow ? 'Now' : inData?.endDate}`}</span>
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