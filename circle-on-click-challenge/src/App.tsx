import React, { useState } from 'react';
import './App.css';

type Point = { x: number, y: number }

function App() {
  const [ points, setPoints ] = useState<Point[]>([]);
  const [ removedPoints, setRemovedPoints] = useState<Point[]>([]);

  const handleNewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX: pointX, clientY: pointY } = e;
    setPoints([...points, { x: pointX, y: pointY }]);
  }

  const handleUndoCircle = () => {
    const pointToRemove = points.pop();
    setRemovedPoints([...removedPoints, pointToRemove]);
    setPoints(points.filter(point => point !== pointToRemove));
  }

  const handleRedoCircle = () => {
    setPoints([...points, removedPoints[removedPoints.length - 1]]);
    setRemovedPoints(removedPoints.filter((_, index) => index !== removedPoints.length - 1));
  }

  return (
    <>
      <button onClick={handleUndoCircle} className="action-buttons" disabled={points.length < 1 ? true : false}>Undo</button>
      <button onClick={handleRedoCircle} className="action-buttons" disabled={removedPoints.length < 1 ? true : false}>Redo</button>
      <div className="App" onClick={handleNewClick}>
        {points.map((point, index) => (
          <div 
            key={index} 
            className="circle" 
            style={{
              left: point.x - 10 + "px", 
              top: point.y - 10 + "px",
            }} 
          />
        ))}
      </div>
    </>
  );
}

export default App;
