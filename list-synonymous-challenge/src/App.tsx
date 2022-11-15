import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [ word, setWord ] = useState<string>('');
  const [ synonymous, setSynonymous ] = useState<string[]>([]);

  const getSynonymous = (wordToSearch: string) => {
    axios.get(`https://api.datamuse.com/words?rel_syn=${wordToSearch}`)
      .then(response => response.data)
      .then(data => data.map((item: any) => item.word))
      .then(item => setSynonymous(item))
      .catch(err => console.log('error', err));
  }

  const handleSubmitFormAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getSynonymous(word);
  }

  const handleListItemClickAction = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, word: string) => {
    setWord(word);
    getSynonymous(word);
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
          {synonymous.length > 0 ? synonymous.map((element: string, index: number) => 
            <li className="App-list-item" key={index} onClick={(e => handleListItemClickAction(e, element))}>{element}</li>
          ) : <>Nenhuma correspondência...</>}
        </ul>
      </header>
    </div>
  );
}

export default App;
