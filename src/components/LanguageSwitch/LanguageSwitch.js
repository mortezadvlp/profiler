import './LanguageSwitch.css';

export default function LanguageSwitch({checked = false, setChecked = ()=>{}}) {


    return (
        <div className="lw-toggle-button-cover">
            <div id="button-3" className="lw-button lw-r">
                <input className="lw-checkbox" type="checkbox" value={checked} onChange={() => setChecked()} />
                <div className="lw-knobs"></div>
                <div className="lw-layer"></div>
            </div>
        </div>
    );
}