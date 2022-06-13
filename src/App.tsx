
import React from 'react';
import './App.css';
import DrawingTool from './components/drawingtool';
import PencilTool from './components/penciltool';

function App() {
  return (
    <div className='App' style={{height: 0.5, width: 0.5}}>
      <PencilTool /> 
      <div className= 'button' style={{position: 'relative', justifyContent: 'center'}}>
        <button style={{color: 'blue', backgroundColor: 'black' }}>Clear</button>
      </div>
    </div> 
  );
}

export default App;