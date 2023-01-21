
import { useState } from 'react';

import './App.css';
import { SvgCalendar, SvgOK } from './app/constantComponents';
import SelectFloatingLabel from './components/SelectFloatingLabel/SelectFloatingLabel';
import InputFloatingLabel from './components/InputFloatingLabel/InputFloatingLabel';
import { countries } from './app/constants';
import PhoneFloatingLabel from './components/PhoneFloatingLabel/PhoneFloatingLabel';
import OptionalQuestion from './components/OptionalQuestion/OptionalQuestion';
import CustomButton from './components/CustomButton/CustomButton';
import CustomCheckBox from './components/CustomCheckBox/CustomCheckBox';

function App() {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [value4, setValue4] = useState(false)
  const [value5, setValue5] = useState(false)

  return (
    <div className="App">
      <InputFloatingLabel lineCount='1' label='Title' type='text' 
        value={value1} onChangeValue={setValue1}
        icon={<SvgCalendar width='32px' height='24px' fillColor='blue' />}
        iconClickable={false} onIconClick={() => console.log('Icon clicked!')} />

      <SelectFloatingLabel label='Title' 
        value={value2} onChangeValue={setValue2}
        options={countries()} />
      
      <PhoneFloatingLabel label='Mobile Phone Number' 
        value={value3} onChangeValue={setValue3} />

      <OptionalQuestion title='Question Title'
        trueOption='Yes' falseOption='No'
        value={value4} onChangeValue={setValue4} />

      <CustomButton text='Click me!' onClick={() => console.log('clicked')} className=''
        hasIcon={true} svg={<SvgOK className='text-primary' width='32px' height='32px' />} />

      <CustomCheckBox text='Check me!' isChecked={value5} onChangeChecked={setValue5} />
    </div>
  );
}

export default App;
