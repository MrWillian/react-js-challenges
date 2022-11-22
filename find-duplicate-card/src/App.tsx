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
  ]);

  const [selectedCards, setSelectedCards] = useState<Array<number | null>>([]);

  const handleCardClick = (rowIndex: number, columnIndex: number) => {
    let auxiliarRevealGrid = [...revealGrid];
    let hitTheTarget = false;

    auxiliarRevealGrid[rowIndex][columnIndex] = true;
    setSelectedCards([...selectedCards, grid[rowIndex][columnIndex]]);

    setTimeout(() => {
      if (selectedCards[0] === grid[rowIndex][columnIndex]) {
        hitTheTarget = true;
      } else if (selectedCards.length > 0) {
        auxiliarRevealGrid[rowIndex][columnIndex] = false;
      }

      setRevealGrid(auxiliarRevealGrid);

      if (hitTheTarget) {
        alert("Bem no alvo!!! :D");
        setSelectedCards([]);
      } else if (selectedCards.length > 0) {
        alert("Errou! :(");
      }
    }, 250);
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
