import React, { useState } from 'react';

function PixelGridSquare(props) {
  const [isHovered, setIsHovered] = useState(false);

  function onSquareClick() {
    props.updateGridAtPosition(props.rowIndex, props.columnIndex, props.color);
  }

  function getSquareStyle() {
    if (props.square) {
      return {
        "backgroundColor": props.square,
      };
    }
  }

  function getHoverStyle() {
    if (props.color) {
      return {
        "backgroundColor": props.color
      };
    } else {
      return {
        "backgroundColor": "#fff",
        "zIndex": 0,
      };
    }
  }

  return (
    <div className="pixel-grid-square"
      onClick={() => onSquareClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="transparent"></div>
      <div className="filled-color" style={getSquareStyle()}></div>
      {isHovered ? <div className="hovered" style={getHoverStyle()}></div> : null}
    </div >
  )
}

export default PixelGridSquare;
