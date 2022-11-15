import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form className="App-form">
          <input type="text" className="App-form-input" />
          <button type="submit" className="App-form-button">Enviar</button>
        </form>
        <ul className="App-list">
          <li className="App-list-item">teste 1</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
