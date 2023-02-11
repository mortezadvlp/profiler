
import { useEffect, useState } from 'react';

import './App.css';
import MessageBox from './components/MessageBox/MessageBox';
import IconMessageBox from './components/MessageBox/IconMessageBox';
import WideView from './views/WideView/WideView';
import SmallView from './views/SmallView/SmallView';

function App() {
  const widthBound = 726;
  const [smallView, setSmallView] = useState(window.innerWidth <= widthBound);
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
    <>
    {smallView
    ?
      <SmallView showDone={() => showDoneHandler()} showMessage={(msg) => showMessage(msg)} />
    :
      <WideView showDone={() => showDoneHandler()} showMessage={(msg) => showMessage(msg)} />
    }
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
