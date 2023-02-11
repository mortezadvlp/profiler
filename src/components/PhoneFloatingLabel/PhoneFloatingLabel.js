

import { useEffect, useState } from 'react';
import { defaultCountryDialCode, inputComponentHeight } from '../../app/constants';
import CustomSelect from '../CustomSelect/CustomSelect';
import './PhoneFloatingLabel.css'

export default function PhoneFloatingLabel({
        label = 'Title', className = '',
        countryValue = defaultCountryDialCode, phoneValue = '', onChangeCountryValue = ()=>{}, onChangePhoneValue = ()=>{} }) {

    const [gotFocus, setGotFocus] = useState(false);
    const [showTextHolder, setShowTextHolder] = useState(phoneValue === '');
    const [forceInputFocus, setForceInputFocus] = useState(false);

    useEffect(() => {
        if(forceInputFocus) {
            setForceInputFocus(false);
        }
    }, [forceInputFocus])

    const onInputFocus = (status) => {
        setGotFocus(status);
    }


    useEffect(() => {
        setShowTextHolder(phoneValue === '' && !gotFocus);
    }, [phoneValue, gotFocus])

    return (
        <div className={className} >
            <div className='w-100 position-relative border border-transparent' >
                <div className={`border border-primary rounded-1 mt-4 p-0 ${showTextHolder || (!gotFocus && phoneValue !== '') ? '' : 'border-2'}`}
                    style={{minHeighteight: inputComponentHeight}} >
                    <CustomSelect countryValue={countryValue} phoneValue={phoneValue}
                        setCountryValue={onChangeCountryValue} setPhoneValue={onChangePhoneValue}
                        forceFocus={forceInputFocus}
                        onFocus={() => onInputFocus(true)} onBlur={() => onInputFocus(false)} />
                </div>
                <span className={`position-absolute start-0 top-0 pt-1 ${showTextHolder ? 'select-label-phone-blur text-gray pt-2' : 'select-label-phone-focus text-primary'}`} 
                    onClick={() => setForceInputFocus(true)} >{label}</span>
            </div>
        </div>
    )
}
