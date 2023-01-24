
import { SvgCamera, SvgOK } from '../../app/constantComponents';
import CustomButton from '../CustomButton/CustomButton';
import './MenuPanel.css';
import user_default from '../../images/user_default.png';

const TabButton = ({ text = 'Tab Button', onClick, isSelected = false, className = '' }) => {


    return (
        <div className={`w-100 bg-transparent ${className}`} >
            <button className={`${isSelected ? 'w-100 bg-white' : 'w-75 tab-button-light'} border-0 px-2 py-3 rounded-pill`}
                onClick={() => isSelected ? {} : onClick()} >
                <span className='m-auto fw-bold' >{text}</span>
            </button>
        </div>
    );
}

export default function MenuPanel({ currentTab = 0, onChangeCurrentTab, onSaveChanges, className = '', avatar = '' }) {

    const tabNames = ['Personal Info', 'Educational Info', 'Work Experiances', 'Privacy'];

    return (
        <aside className={`d-flex flex-column ${className}`} style={{minWidth:'300px'}} >
            <div className='w-100 px-5 pt-4 pb-5 text-center border border-primary' style={{width:'300px', height:'270px'}} >
                <div className='m-auto position-relative' >
                    <img className='rounded-circle border' style={{width:'180px', height:'180px'}}
                        src={avatar === '' ? user_default : avatar} />
                    <button className='camera-on-avatar border-0 bg-transparent'
                        onClick={() => {}} >
                        <SvgCamera width='64px' height='64px' className='text-dark' />
                    </button>
                </div>
            </div>
            <div className='d-flex flex-column align-items-center gap-3 h-100 bg-primary px-2 py-3' >
                {tabNames.map((tn, index) => 
                    <TabButton key={index} text={tn} isSelected={currentTab === index} 
                        onClick={() => onChangeCurrentTab(index)} />
                )}
                <CustomButton text='Save Changes' hasIcon={true} className='mt-4'
                    svg={<SvgOK className='text-primary' width='32px' height='32px' />}
                    onClick={onSaveChanges} />
            </div>
        </aside>
    );
}
