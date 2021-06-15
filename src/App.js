import React from 'react';
import './App.css';
import axios from 'axios';
import ButtonWrapper from './ButtonWrapper';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: []
    };
  }

  componentDidMount() {
    axios.get('https://swapi.dev/api/films/').then(res => {
      this.setState({
        movieData: res.data.results,
      })
    }).catch(err => {
      console.error(err);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {
            Object.entries(this.state.movieData).map(([key, value]) => {
              return (      
                <ButtonWrapper variant="light" movie={value}/>
              )
            })
          }
         
        </header>
      </div>
    )
  };
}

