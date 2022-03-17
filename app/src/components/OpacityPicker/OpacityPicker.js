import React, { useEffect, useRef, useState } from 'react';
import './OpacityPicker.css';

export function hexToRGB(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function OpacityPicker(props) {
  function getOpacityPickerStyle() {
    const { r, g, b } = hexToRGB(props.selectedColor);
    return {
      'backgroundImage': `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0), rgb(${r}, ${g}, ${b}, 1))`
    }
  }

  // convert to rgba in final write to svg
  return (
    <div className="opacity-picker-container">
      <div className="opacity-picker">
        <input type="range" step="0.01" min="0" max="1" style={getOpacityPickerStyle()} value={props.selectedOpacity} onChange={(e) => props.setSelectedOpacity(e.target.value)}></input>
        <div className="opacity-picker-background"></div>
      </div>
      <input type="number" step="0.01" min="0" max="1" value={props.selectedOpacity} onChange={(e) => props.setSelectedOpacity(e.target.value)} ></input>
    </div>
  );
}

export default OpacityPicker;
