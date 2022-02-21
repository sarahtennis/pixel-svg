import React, { useState } from 'react';
import PixelGridSquare from '../PixelGridSquare/PixelGridSquare';

function PixelGridRow(props) {

  function getStyles() {
    return {
      'gridTemplateColumns': `repeat(${props.row.length}, auto)`
    }
  }

  return (
    <div className="pixel-grid-row" style={getStyles()}>
      {props.row.map((square, index) => <PixelGridSquare key={`s${index}`} color={props.color}></PixelGridSquare>)}
    </div>
  )
}

export default PixelGridRow;
