import React from 'react';
import Nav from './components/nav/nav.component';
import Messages from './components/shared/message/messages.component';
import GridViewHolder from './components/core/grid-view-holder.component';

function App() {
  return (
    <div className="App">
      <div className="bg-white border-gray-200 dark:bg-gray-700">
        <Nav />
        <Messages />
        <div className="h-screen mt-2 text-white">
          <GridViewHolder />
        </div>
      </div>
    </div>
  );
}

export default App;
