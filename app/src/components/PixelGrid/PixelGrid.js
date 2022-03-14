import React, { useState } from 'react';
import PixelGridRow from '../PixelGridRow/PixelGridRow';

function PixelGrid(props) {
  const [dimensions, setDimensions] = useState({ rowCount: 10, columnCount: 10 });
  const [grid, setGrid] = useState(initGrid());

  function initGrid() {
    const output = [];
    for (let x = 0; x < dimensions.rowCount; x++) {
      const row = [];
      for (let y = 0; y < dimensions.columnCount; y++) {
        row.push("");
      }
      output.push(row);
    }
    return output;
  }

  function updateGridAtPosition(row, column, color) {
    const updatedGrid = [...grid];
    updatedGrid[row][column] = color;
    setGrid(updatedGrid);
  }

  function getGridStyle() {
    return {
      'gridTemplateColumns': 'auto',
      'gridTemplateRows': `repeat(${dimensions.rowCount}, auto)`
    }
  }

  return (
    <div className="pixel-grid" style={getGridStyle()}>
      {grid.map((row, index) => <PixelGridRow key={`r${index}`} row={row} rowIndex={index} color={props.color} updateGridAtPosition={updateGridAtPosition}></PixelGridRow>)}
    </div>
  )
}

export default PixelGrid;
