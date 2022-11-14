import React, { useState, useEffect } from 'react';
import './App.css';

type Point = { x: number, y: number }

function App() {
  const [ points, setPoints ] = useState<Point[]>([]);

  useEffect(() => {
    console.log(points);
  }, [points]);

  const handleNewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX: pointX, clientY: pointY } = e;
    setPoints([...points, { x: pointX, y: pointY }]);
  }

  const handleUndoCircle = () => {
    const pointToRemove = points.pop();
    setPoints(points.filter(point => point !== pointToRemove));
  }

  const handleRedoCircle = () => {}

  return (
    <>
      <button onClick={handleUndoCircle} className="action-buttons">Undo</button>
      <button onClick={handleRedoCircle} className="action-buttons">Redo</button>
      <div className="App" onClick={handleNewClick}>
        {points.map((point, index) => (
          <>
            <div 
              key={index} 
              className="circle" 
              style={{
                left: point.x - 10 + "px", 
                top: point.y - 10 + "px",
              }} 
            />
            <span className="labels" style={{
                left: point.x - 10 + "px", 
                top: point.y - 10 + "px",
              }} >{point.x}</span>
            <span className="labels" style={{
                left: point.x + "px", 
                top: point.y + "px",
              }} >{point.y}</span>
          </>
        ))}
      </div>
    </>
  );
}

export default App;
