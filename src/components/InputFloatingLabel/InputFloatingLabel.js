

import { useEffect, useRef, useState } from 'react';
import { inputComponentHeight } from '../../app/constants';
import './InputFloatingLabel.css'

export default function InputFloatingLabel({
        label = 'Title', className = '', lineCount = '1', format = '', disabled = false, icon = <></>,
        type = 'text', value = '', onChangeValue, iconClickable = false, onIconClick }) {

    const [hasFocus, setHasFocus] = useState(false);
    const [showTextHolder, setShowTextHolder] = useState(value === '' && !hasFocus);

    const mainRef = useRef(null);

    const onInputFocus = (status) => {
        setHasFocus(status);
    }

    useEffect(() => {
        setShowTextHolder(value === '' && !hasFocus);
    }, [value, hasFocus])

    return (
        <div className={className} >
            <div className='w-100 position-relative border border-transparent' >
                <div className={`d-flex flex-row align-items-center gap-1 mt-4 border rounded-1 ${showTextHolder || (!hasFocus && value !== '') ? '' : 'border-2'} ${disabled ? 'border-disable' : 'border-primary'}`}
                    style={{minHeight: inputComponentHeight}} >
                    {Number(lineCount) <= 1
                    ?
                    <input ref={mainRef} type={type} value={value} onChange={(e) => onChangeValue(e.target.value)}
                        className='no-outline border-0 w-100 p-1' disabled={disabled}
                        onFocus={() => onInputFocus(true)} onBlur={() => onInputFocus(false)} />
                    :
                    <textarea ref={mainRef} rows={String(lineCount)} value={value} onChange={(e) => onChangeValue(e.target.value)}
                        className='no-outline border-0 w-100 p-1' disabled={disabled}
                        onFocus={() => onInputFocus(true)} onBlur={() => onInputFocus(false)} />
                    }
                    <div role={iconClickable ? 'button' : ''} className='m-0 p-0' onClick={iconClickable && !disabled ? onIconClick : () => {}}>
                        {icon}
                    </div>
                </div>
                <span className={`position-absolute start-0 top-0 ms-1 ${showTextHolder ? 'input-label-blur text-gray' : 'input-label-focus text-primary'}`}
                    onClick={() => mainRef.current.focus()} >{`${label}${showTextHolder && format !== '' ? ` (${format})` : ''}`}</span>
            </div>
        </div>
        
    );
}
