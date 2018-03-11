import React, { Component } from 'react';
import './App.css';
import Maxfile from './Components/Maxfile'

class App extends Component {
  render() {
    return (
      <div className="Max-App">
        <header className="App-Header">
          <h1 className="Title">Max MSP Version control App</h1>
        </header>
        <Maxfile />
      </div>
    );
  }
}

export default App;
