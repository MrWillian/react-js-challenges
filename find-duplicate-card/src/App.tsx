import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [grid, setGrid] = useState([[], []]);
  const [revealGrid, setRevealGrid] = useState([[false, false, false], [false, false, false]]);
  const [firstCardSelected, setFirstCardSelected] = useState<Map<number, number[]>>(new Map());

  useEffect(() => {
    generateAleatoryGrid();
  }, []);

  useEffect(() => {
    checkIfIsWinner();
  }, [revealGrid]);

  const generateAleatoryGrid = () => {
    let row: any[] = [];
    let numbersToSelect = [1, 1, 2, 2, 3, 3];
    let emojisToCards = ['👼🏻', '🎄', '🎅🏼'];
    let selectedNumber, aleatoryIndex;
    for (let i = 0; i < 2; i++) {
      row[i] = [];
      for (let j = 0; j < 3; j++) {
        aleatoryIndex = (Math.random() * numbersToSelect.length | 0);
        selectedNumber = numbersToSelect[aleatoryIndex];
        row[i][j] = emojisToCards[selectedNumber - 1];
        numbersToSelect.splice(aleatoryIndex, 1);
      }
    }
    setGrid(row);
  }

  const checkIfIsWinner = () => {
    let winner = !(revealGrid.some(item => item.some(element => element === false)));
    if (winner) {
      alert("Parabéns, você venceu o jogo!!! :D\nEle será reiniciado...");
      generateAleatoryGrid();
      setRevealGrid([[false, false, false], [false, false, false]]);
    }
  }

  const handleCardClick = (rowIndex: number, columnIndex: number) => {
    let auxiliarRevealGrid = [...revealGrid];
    let hitTheTarget = false;
    let auxiliarMap = new Map();

    auxiliarRevealGrid[rowIndex][columnIndex] = true;
    auxiliarMap.set(grid[rowIndex][columnIndex], [rowIndex, columnIndex]);

    setFirstCardSelected(auxiliarMap);

    setTimeout(() => {
      if (firstCardSelected.has(grid[rowIndex][columnIndex])) {
        hitTheTarget = true;
      } else if (firstCardSelected.size > 0) {
        auxiliarRevealGrid[rowIndex][columnIndex] = false;
        for (var value of firstCardSelected.values()) {
          const entries = Object.entries(value).map(entry => Object.assign(entry, { 0: +entry[0] }));
          auxiliarRevealGrid[entries[0][1]][entries[1][1]] = false;
        }
      }

      setRevealGrid(auxiliarRevealGrid);

      if (hitTheTarget || firstCardSelected.size > 0) {
        setFirstCardSelected(new Map());
      }
    }, 200);
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
