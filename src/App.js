import React, { useState } from 'react';
import './App.css';
// import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/Nav';
import { PlantContext } from './context/PlantContext';

function App() {
  // const [plants, setPlants] = useState([])

  return (
    <div className="App">
      <div >
          {/* <PlantContext.Provider value={ plants }> */}
            <NavBar />
          {/* </PlantContext.Provider> */}
      </div>
    </div>
  );
}

export default App;
