import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import ButtonWrapper from './MovieButtonWrapper';

export default function App() {

  const [movieData, setMovieData] = useState({});

/*   API requests movie data and trickles the json down to each individual button wrapper
  Button wrappers contain all the required information to populate every other necessary component top down
  Can be done cleaner with stores */
  useEffect(() => {
    axios.get('https://swapi.dev/api/films/').then(res => {
      setMovieData(res.data.results);
    }).catch(err => {
      console.error(err);
    })
  }, []);

    return (
      <div className="App">
        <header className="App-header">
          {
            Object.entries(movieData).map(([key, value]) => {
              return (      
                <ButtonWrapper variant="light" key={key} movie={value}/>
              )
            })
          }         
        </header>
      </div>
    )
}

