

import { useEffect, useState } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import './PhoneFloatingLabel.css'

export default function PhoneFloatingLabel({
        label = 'Title', className = '',
        value = '', onChangeValue }) {

    const [gotFocus, setGotFocus] = useState(false);
    const [showTextHolder, setShowTextHolder] = useState(value === -1);


    const onInputFocus = (status) => {
        setGotFocus(status);
    }


    useEffect(() => {
        setShowTextHolder(value === -1 && !gotFocus);
    }, [value, gotFocus])

    return (
        <div className={className} >
            <div className='w-100 position-relative border border-transparent' >
                <div className='border border-primary rounded-1 mt-4 p-0' >
                    <CustomSelect value={value} onChangeValue={onChangeValue} 
                        onFocus={() => onInputFocus(true)} onBlur={() => onInputFocus(false)} />
                </div>
                <span className={`position-absolute start-0 top-0 pt-1 ms-1 ${showTextHolder ? 'select-label-blur text-gray' : 'select-label-focus text-primary'}`} >{label}</span>
            </div>
        </div>
    )
}
