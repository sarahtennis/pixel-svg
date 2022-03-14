import React from 'react';
import { HexColorPicker, } from 'react-colorful';

function ColorPicker(props) {
  return (
    <div className="color-picker">
      <HexColorPicker color={props.selectedColor} onChange={props.setSelectedColor} />
    </div>
  );
}

export default ColorPicker;
