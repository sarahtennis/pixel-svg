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
  const picker = useRef(null);
  const slider = useRef(null);
  const [pickerWidth, setPickerWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [dragPosition, setDragPosition] = useState(null);

  useEffect(() => {
    setPickerWidth(picker.current.clientWidth);
  }, []);

  useEffect(() => {
    updateSlider();
  }, [pickerWidth]);

  // useEffect(() => {
  //   if (dragPosition) {
  //     updateSelectedOpacity();
  //   }
  // }, [dragPosition]);

  function updateSlider() {
    setSliderPosition(props.selectedOpacity * 100);
  }

  function getSliderStyle() {
    return {
      'left': `${sliderPosition}%`
    }
  }

  function getOpacityPickerStyle() {
    const { r, g, b } = hexToRGB(props.selectedColor);
    return {
      'backgroundImage': `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0), rgb(${r}, ${g}, ${b}, 1))`
    }
  }

  function onMouseDown(e) {
    const onWindowMouseMove = (e) => {
      const boundingBox = picker.current.getBoundingClientRect();
      let newPercent = 100 - (boundingBox.right - e.clientX) / boundingBox.width * 100;
      if (newPercent > 100) {
        newPercent = 100
      } else if (newPercent < 0) {
        newPercent = 0;
      }
      setSliderPosition(newPercent);
    }

    const onWindowMouseUp = () => {
      // setIsDragging(false);
      window.removeEventListener('mouseup', onWindowMouseUp);
      window.removeEventListener('mousemove', onWindowMouseMove);
    }

    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
  }

  function onWindowMouseMove(e) {
    console.log('mouse move');
  }

  // convert to rgba in final write to svg
  return (
    <div ref={picker} className="opacity-picker" style={getOpacityPickerStyle()}>
      <div className="opacity-picker-slider"
        ref={slider}
        style={getSliderStyle()}
        onMouseDown={onMouseDown}></div>
    </div>
  );
}

export default OpacityPicker;
