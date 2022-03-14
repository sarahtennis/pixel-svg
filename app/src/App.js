import React, { useState } from 'react';
import './App.css';
import PixelGrid from './components/PixelGrid/PixelGrid';
import ColorPicker from './components/ColorPicker/ColorPicker';
import OpacityPicker from './components/OpacityPicker/OpacityPicker';

function App() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedOpacity, setSelectedOpacity] = useState(0.5);

  return (
    <div className="App">
      <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}></ColorPicker>
      <OpacityPicker selectedColor={selectedColor} selectedOpacity={selectedOpacity} setSelectedOpacity={setSelectedOpacity}></OpacityPicker>
      <PixelGrid color={selectedColor} opacity={selectedOpacity}></PixelGrid>
    </div>
  );
}

export default App;
