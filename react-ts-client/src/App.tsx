import React from 'react';
import Nav from './components/nav/nav.component';
import Messages from './components/shared/message/messages.component';

function App() {
  return (
    <div className="App">
      <div className="bg-white border-gray-200 dark:bg-gray-600">
        <Nav />
        <Messages />
        <div className="">banana</div>
      </div>
    </div>
  );
}

export default App;
