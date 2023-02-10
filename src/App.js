
import { useState } from 'react';

import './App.css';
import MenuPanel from './components/MenuPanel/MenuPanel';
import PersonalInfoPage from './ProfilePages/PersonalInfoPage/PersonalInfoPage';
import EducationalInformation from './ProfilePages/EducationalInformation/EducationalInformation';
import WorkExperience from './ProfilePages/WorkExperience/WorkExperience';
import PrivacyPage from './ProfilePages/PrivacyPage/PrivacyPage';
import MessageBox from './components/MessageBox/MessageBox';
import IconMessageBox from './components/MessageBox/IconMessageBox';

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [messageToShow, setMessageToShow] = useState('');
  const [showDone, setShowDone] = useState(false);

  const showMessage = (text) => {
    setMessageToShow(text);
  }

  const showDoneHandler = () => {
    setShowDone(true);
    setTimeout(() => {
      setShowDone(false)
    }, 1000);
  }

  return (
    <>
    <div className="App d-flex flex-row align-content-stretch vh-100 overflow-hidden">
      <MenuPanel className='h-100' currentTab={currentTab} onChangeCurrentTab={setCurrentTab}
        onSaveChanges={() => console.log('Changes saved!')} />
      {(currentTab == 0)
      ?
        <PersonalInfoPage onShowMessage={(msg) => showMessage(msg)} onDone={() => showDoneHandler()} />
      :
      (currentTab == 1)
      ?
        <EducationalInformation onShowMessage={(msg) => showMessage(msg)} onDone={() => showDoneHandler()} />
      :
      (currentTab == 2)
      ?
        <WorkExperience onShowMessage={(msg) => showMessage(msg)} onDone={() => showDoneHandler()} />
      :
        <PrivacyPage onShowMessage={(msg) => showMessage(msg)} onDone={() => showDoneHandler()} />
      }
    </div>
    {messageToShow&&
      <MessageBox text={messageToShow} onClose={() => showMessage('')} onDone={() => showDoneHandler()} />
    }
    {showDone&&
      <IconMessageBox onClose={() => setShowDone(false)} />
    }
    </>
  );
}

export default App;
