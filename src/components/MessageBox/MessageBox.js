
import { useSelector } from 'react-redux';
import { SvgOK } from '../../app/constantComponents';
import { textLabels } from '../../app/constants';
import CustomButton from '../CustomButton/CustomButton';
import './MessageBox.css';

export default function MessageBox({ text = 'Message', questionMode = false, onClose = () => {}, onDone = () => {} }) {

    const darkMode = useSelector(state => state.settings.darkMode);
    const language = useSelector(state => state.settings.language);

    return (
        <div className='w-100 h-100 position-fixed top-0 start-0 bg-light bg-opacity-75 d-flex flex-row justify-content-center align-items-center z-top overflow-hidden'
            onClick={() => onClose()} >
            <div className='message-box-holder' >
                <div className='border-0 rounded-3 bg-primary message-box d-flex flex-column align-items-center p-4' >
                    <div className='h-100 d-flex flex-row justify-content-center align-items-center' >
                        <span className='text-white' >{text}</span>
                    </div>
                    <div className='d-flex flex-row gap-2' >
                        <CustomButton text={textLabels.ok[language]} onClick={() => questionMode ? onDone() : onClose()} hasIcon
                            svg={<SvgOK className='text-primary' width='32px' height='32px' />} />
                        {questionMode&&
                            <CustomButton text={textLabels.cancel[language]} onClick={() => onClose()} hasIcon
                                svg={<SvgOK className='text-primary' width='32px' height='32px' />} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}
