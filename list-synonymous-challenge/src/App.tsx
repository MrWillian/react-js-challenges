import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [ word, setWord ] = useState<string>('');
  const [ synonymous, setSynonymous ] = useState<string[]>([]);

  const getSynonymous = () => {
    axios.get(`https://api.datamuse.com/words?rel_syn=${word}`)
      .then(response => console.log('response', response.data))
      .catch(err => console.log('error', err));
  }

  const handleSubmitFormAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getSynonymous();
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-form">
          <input 
            type="text" 
            className="App-form-input" 
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button type="submit" className="App-form-button" onClick={(e) => handleSubmitFormAction(e)}>Enviar</button>
        </form>
        <ul className="App-list">
          <li className="App-list-item">teste 1</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
