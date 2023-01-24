
import { useState } from 'react';

import './App.css';
import SampleUse from './components/SampleUse';
import MenuPanel from './components/MenuPanel/MenuPanel';

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="App d-flex flex-row align-content-stretch vh-100">
      <MenuPanel className='h-100' currentTab={currentTab} onChangeCurrentTab={setCurrentTab}
        onSaveChanges={() => console.log('Changes saved!')} />
      <SampleUse className='overflow-auto w-100 h-100 p-2' />
    </div>
  );
}

export default App;
