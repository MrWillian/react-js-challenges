import React, { useState } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState([
    [0, 1],
    [0, 1]
  ]);

  const [revealGrid, setRevealGrid] = useState([
    [false, false],
    [false, false]
  ])

  const handleCardClick = (rowIndex: number, columnIndex: number) => {
    let auxiliarRevealGrid = [...revealGrid];
    auxiliarRevealGrid[rowIndex][columnIndex] = !auxiliarRevealGrid[rowIndex][columnIndex];
    setRevealGrid(auxiliarRevealGrid);
  }

  return (
    <div className="App">
      {grid.length > 0 ? grid.map((row, rowIndex) => 
        <div className="row" key={rowIndex}>
          {row.map((column, columnIndex) =>
            <div 
              key={columnIndex}
              className={"card" + (revealGrid[rowIndex][columnIndex] ? " active" : "")} 
              onClick={() => handleCardClick(rowIndex, columnIndex)}>
              {revealGrid[rowIndex][columnIndex] ? column : " "}
            </div>
          )}
        </div>
      ) : <></>}
    </div>
  );
}

export default App;
