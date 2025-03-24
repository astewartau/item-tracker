import React from 'react';
import ItemTracker from './ItemTracker';

const headerStyles = {
  fontFamily: '"Mali", sans-serif',
  textAlign: 'center',
  marginTop: '20px',
  color: '#ff66aa'
};

const appContainerStyles = {
  backgroundColor: '#fff0f5',
  minHeight: '100vh',
  padding: '20px'
};

function App() {
  return (
    <div style={appContainerStyles}>
      <header style={headerStyles}>
        <h1>Hello Kitty Island Adventure Tracker</h1>
        <p>Track items on your island!</p>
      </header>
      <ItemTracker />
    </div>
  );
}

export default App;
