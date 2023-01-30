
import { inputComponentHeight } from '../../app/constants';
import './OptionalQuestion.css';


export default function OptionalQuestion({ 
    className = '', title = 'Question Title', trueOption = 'Yes', falseOption = 'No' ,
    value = false, onChangeValue
}) {




    return (
        <div className={className} >
            <div className='w-100 border border-1 border-primary rounded-1 p-1 d-flex flex-row gap-2 justify-content-between'
                style={{minHeight: inputComponentHeight}}>
                <span className='text-dark my-auto text-wrap' >{title}</span>
                <div className='d-flex flex-row gap-2 my-auto' >
                    <button className={`option-button px-3 ${value ? 'bg-primary text-white' : 'bg-transparent text-dark option-button-white'} `} 
                        onClick={() => onChangeValue(true)}>{trueOption}</button>
                    <button className={`option-button px-3 ${!value ? 'bg-primary text-white' : 'bg-transparent text-dark option-button-white'} `} 
                        onClick={() => onChangeValue(false)} >{falseOption}</button>
                </div>
            </div>
        </div>
        
    );

}

