
import { SvgCheckMark, SvgOK } from '../../app/constantComponents';
import './MessageBox.css';

export default function IconMessageBox({ text = 'Message', onClose = () => {} }) {

    return (
        <div className='w-100 h-100 position-fixed top-0 start-0 bg-light bg-opacity-75 d-flex flex-row justify-content-center align-items-center z-top overflow-hidden'
            onClick={() => onClose()} >
            <div className='border-0 rounded-circle bg-primary icon-message-box d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden' >
                <div className='border-0 rounded-circle bg-white icon-animator' >
                </div>
                <SvgOK className='text-primary z-top' width='100%' height='100%' />
            </div>
        </div>
    );

}