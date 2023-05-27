import { useDispatch, useSelector } from 'react-redux';
import './LanguageSwitch.css';
import { changeLanguage } from '../../app/settingsSlice';

export default function LanguageSwitch() {

    const dispatch = useDispatch();
    const isEn = useSelector(state => state.settings.language == 'en');

    const changeLang = (val) => {
        dispatch(changeLanguage(val ? 'fa' : 'en'));
    }

    return (
        <div className="lw-toggle-button-cover">
            <div id="button-3" className="lw-button lw-r">
                <input className="lw-checkbox" type="checkbox" value={isEn} onChange={(e) => changeLang(e.target.checked)} />
                <div className="lw-knobs"></div>
                <div className="lw-layer"></div>
            </div>
        </div>
    );
}