import React from 'react';
import { HexColorInput, HexColorPicker, } from 'react-colorful';

function ColorPicker(props) {
  return (
    <div className="color-picker">
      <HexColorPicker color={props.selectedColor} onChange={props.setSelectedColor} />
      <HexColorInput prefixed color={props.selectedColor} onChange={props.setSelectedColor} />
    </div>
  );
}

export default ColorPicker;
