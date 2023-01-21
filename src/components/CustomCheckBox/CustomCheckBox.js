
import { SvgCheckEmpty, SvgCheckFill } from '../../app/constantComponents';
import './CustomCheckBox.css';

export default function CustomCheckBox({ text = 'Select me!', className = '', isChecked = false, onChangeChecked }) {


    return (
        <div className='d-flex flex-row px-1 py-1'>
            <div role='button' onClick={() => onChangeChecked(!isChecked)} >
                {isChecked
                ?
                <SvgCheckFill className='text-primary' />
                :
                <SvgCheckEmpty className='text-primary' />
                }
            </div>
            <span className='text-dark my-auto text-wrap ps-1' role='button' onClick={() => onChangeChecked(!isChecked)} >{text}</span>
        </div>
    );
}
