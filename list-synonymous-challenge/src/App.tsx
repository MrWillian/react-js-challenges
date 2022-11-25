import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useQuery } from 'react-query';

function App() {
  const [ word, setWord ] = useState<string>('');
  const { data, refetch, isLoading } = useQuery(["synonymous"], () => getSynonymous(), { 
    refetchOnWindowFocus: false,
    enabled: false
  });

  useEffect(() => {
    refetch();
  }, [word]);

  const getSynonymous = async () => {
    return await axios.get(`https://api.datamuse.com/words?rel_syn=${word}`)
      .then(response => response.data)
      .then(data => data.map((item: any) => item.word))
      .catch(err => console.log('error', err));
  }

  const handleSubmitFormAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault();

  const handleListItemClickAction = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, element: string) => setWord(element);

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
        {isLoading ?? 'Loading...'}
        <ul className="App-list">
          {data?.length > 0 ? data?.map((element: string, index: number) => 
            <li className="App-list-item" key={index} onClick={(e => handleListItemClickAction(e, element))}>{element}</li>
          ) : <>Nenhuma correspondência...</>}
        </ul>
      </header>
    </div>
  );
}

export default App;
