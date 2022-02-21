import React, { useState } from 'react';
import './App.css';
import PixelGrid from './components/PixelGrid/PixelGrid';

function App() {
  const [selectedColor, setSelectedColor] = useState('#FF0000');

  return (
    <div className="App">
      <PixelGrid color={selectedColor}></PixelGrid>
    </div>
  );
}

export default App;
