
import { useEffect, useState } from 'react';

import './App.css';
import MessageBox from './components/MessageBox/MessageBox';
import IconMessageBox from './components/MessageBox/IconMessageBox';
import WideView from './views/WideView/WideView';
import SmallView from './views/SmallView/SmallView';
import { useSelector } from 'react-redux';
import LightDark from './components/LightDark/LightDark';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';

function App() {
  const widthBound = 726;
  const darkMode = useSelector(state => state.settings.darkMode);
  const language = useSelector(state => state.settings.language);
  const [smallView, setSmallView] = useState(window.innerWidth <= widthBound);
  const [messageToShow, setMessageToShow] = useState('');
  const [showDone, setShowDone] = useState(false);
  const initAvatar = useSelector(state => state.personal.avatar);

  useEffect(() => {
    if(initAvatar.toLowerCase().startsWith("http")) {
      localStorage.setItem('avatar', '');
    }
    else {
      localStorage.setItem('avatar', initAvatar);
    }
  }, [])

  const showMessage = (text) => {
    setMessageToShow(text);
  }

  const showDoneHandler = () => {
    setShowDone(true);
    setTimeout(() => {
      setShowDone(false)
    }, 1000);
  }

  const updateWidth = () => {
    if(!smallView && window.innerWidth <= widthBound) {
      setSmallView(true);
    }
    else if(smallView && window.innerWidth > widthBound) {
      setSmallView(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  })

  

  return (
    <div dir={language == 'en' ? 'ltr' : 'rtl'} style={{backgroundColor: darkMode ? 'black' : 'white'}} >
      <div className={`${smallView ? 'w-100' : 'container-md vh-100'} d-flex flex-column`} >
        <div dir='ltr' className='w-100 bg-primary d-flex flex-row justify-content-evenly align-items-center' style={{height: '60px'}} >
          <LanguageSwitch />
          <LightDark />
        </div>
        {smallView
        ?
          <SmallView showDone={() => showDoneHandler()} showMessage={(msg) => showMessage(msg)} />
        :
          <WideView showDone={() => showDoneHandler()} showMessage={(msg) => showMessage(msg)} />
        }
      </div>
    
    {messageToShow&&
      <MessageBox text={messageToShow} onClose={() => showMessage('')} onDone={() => showDoneHandler()} />
    }
    {showDone&&
      <IconMessageBox onClose={() => setShowDone(false)} />
    }
    </div>
  );
}

export default App;
