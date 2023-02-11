
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { SvgCalendar } from '../../app/constantComponents';
import { inputComponentHeight, primaryColor } from '../../app/constants';
import './DateFloatingLabel.css'
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en"

export default function DateFloatingLabel({ label = 'Title', className = '', disabled = false,
    value = '', onChangeValue }) {

    const [hasFocus, setHasFocus] = useState(false);
    const [showTextHolder, setShowTextHolder] = useState(value === '' && !hasFocus);

    const mainRef = useRef(null);

    const onInputFocus = (status) => {
        setHasFocus(status);
    }

    useEffect(() => {
        setShowTextHolder(value === '' && !hasFocus);
    }, [value, hasFocus])

    const format = "yyyy/mm/dd";

    return (
        <div className={className} >
            <div className='w-100 position-relative border border-transparent' >
                <div className={`w-100 d-flex flex-row align-items-center gap-1 mt-4 border rounded-1 ${showTextHolder || (!hasFocus && value !== '') ? '' : 'border-2'} ${disabled ? 'border-disable' : 'border-primary'}`}
                    style={{minHeight: inputComponentHeight}} >
                    <DatePicker
                        ref={mainRef}
                        calendar={persian}
                        locale={persian_en}
                        calendarPosition="bottom-center"
                        format='YYYY/MM/DD'
                        containerClassName='w-100'
                        inputClass='no-outline border-0 w-100 p-1'
                        value={value}
                        onChange={(e) => onChangeValue(e ? e.toString() : '')}
                        onOpen={() => onInputFocus(true)}
                        onClose={() => onInputFocus(false)}
                        disabled={disabled}
                    />
                    <div className='m-0 p-0' onClick={() => mainRef.current.openCalendar()} >
                        <SvgCalendar width='32px' height='24px' fillColor={primaryColor} />
                    </div>
                </div>
                <span className={`position-absolute start-0 top-0 ms-1 ${showTextHolder ? 'input-label-blur text-gray' : 'input-label-focus text-primary'}`}
                    onClick={() => mainRef.current.openCalendar()} >{`${label}${showTextHolder && format !== '' ? ` (${format})` : ''}`}</span>
            </div>
        </div>
    );
}
