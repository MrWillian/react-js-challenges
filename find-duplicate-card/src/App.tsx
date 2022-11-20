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
    let auxiliarSelectedCards = [...selectedCards];
    let hitTheTarget = false;

    auxiliarRevealGrid[rowIndex][columnIndex] = true;
    setRevealGrid(auxiliarRevealGrid);


    console.log('entrou', auxiliarSelectedCards);

    if (auxiliarSelectedCards.length > 1 && auxiliarSelectedCards[0] === auxiliarSelectedCards[1]) {
      hitTheTarget = true;
      console.log('entrou');
    }

    if (hitTheTarget) alert("Bem no alvo!!! :D");
    setSelectedCards([...selectedCards, grid[rowIndex][columnIndex]]);

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
