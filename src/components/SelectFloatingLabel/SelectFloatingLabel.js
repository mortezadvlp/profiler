

import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { inputComponentHeight, primaryColor } from '../../app/constants';
import './SelectFloatingLabel.css'

export default function SelectFloatingLabel({
        label = 'Title', className = '', options = [],
        value = -1, onChangeValue }) {

    const [gotFocus, setGotFocus] = useState(false);
    const [showTextHolder, setShowTextHolder] = useState(value === -1);
    const [objValue, setObjValue] = useState(null);

    const mainRef = useRef(null);

    useEffect(() => {
        let obj = null;
        obj = options.find(o => o.value === value);
        setObjValue(obj);
    }, [value])
    useEffect(() => {
        setShowTextHolder(value === -1 && !gotFocus);
    }, [value, gotFocus])

    const onSelectValueChanged = (e) => {
        if(e) {
            onChangeValue(e.value);
        }
        else {
            onChangeValue(-1);
        }
    }

    const onSelectFocus = (focus) => {
        setGotFocus(focus);
    }

    return (
        <div className={className} >
            <div className='w-100 position-relative border border-transparent' onClick={() => mainRef.current.focus()} >
                <Select ref={mainRef} isClearable={true} options={options} placeholder=''
                    value={objValue} onChange={onSelectValueChanged} openMenuOnFocus
                    onFocus={() => onSelectFocus(true)}
                    onBlur={() => onSelectFocus(false)}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: primaryColor,
                        }),
                        dropdownIndicator: (baseStyles, state) => ({
                            ...baseStyles,
                            color: primaryColor,
                        }),
                        clearIndicator: (baseStyles, state) => ({
                            ...baseStyles,
                            color: primaryColor,
                        }),
                        indicatorSeparator: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: primaryColor,
                        }),
                    }}
                    className='no-outline no-border-onfocus border-0 w-100 p-0 mt-4' />
                <span className={`position-absolute start-0 top-0 pt-1 ms-1 ${showTextHolder ? 'select-label-blur text-gray' : 'select-label-focus text-primary'}`} >{label}</span>
            </div>
        </div>
        
    );
}
