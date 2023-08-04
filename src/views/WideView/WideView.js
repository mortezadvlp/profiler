
import { useState } from 'react';
import MenuPanel from '../../components/MenuPanel/MenuPanel';
import EducationalInformation from '../../ProfilePages/EducationalInformation/EducationalInformation';
import PersonalInfoPage from '../../ProfilePages/PersonalInfoPage/PersonalInfoPage';
import PrivacyPage from '../../ProfilePages/PrivacyPage/PrivacyPage';
import WorkExperience from '../../ProfilePages/WorkExperience/WorkExperience';
import './WideView.css'

export default function WideView({ showDone, showMessage, onPrintProfile }) {

    const [currentTab, setCurrentTab] = useState(0);

    return (
        <div className="d-flex flex-row align-content-stretch h-100 overflow-hidden w-100">
            <MenuPanel className='h-100' currentTab={currentTab} onChangeCurrentTab={setCurrentTab} onPrintProfile={() => onPrintProfile()} />
            {(currentTab === 0)
            ?
            <PersonalInfoPage onShowMessage={(msg) => showMessage(msg)} onDone={() => showDone()} />
            :
            (currentTab === 1)
            ?
            <EducationalInformation onShowMessage={(msg) => showMessage(msg)} onDone={() => showDone()} />
            :
            (currentTab === 2)
            ?
            <WorkExperience onShowMessage={(msg) => showMessage(msg)} onDone={() => showDone()} />
            :
            <PrivacyPage onShowMessage={(msg) => showMessage(msg)} onDone={() => showDone()} />
            }
      </div>
    );
}
