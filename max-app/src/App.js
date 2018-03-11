import React, { Component } from 'react';
import './App.css';
import Maxfile from './Components/Maxfile';
import LoadData from './Components/LoadData';
import sampleData from './sample-data';

class App extends Component {
  state = {
    maxfiles: {}
  };

  loadSampleData = () => {
    this.setState({ maxfiles: sampleData });
  };

  render() {
    return (
      <div className="Max-App">
        <header className="App-Header">
          <h1 className="Title">Max MSP Version control App</h1>
        </header>
        <LoadData loadSampleData={this.loadSampleData} />
        {Object.keys(this.state.maxfiles).map(key => (
          <Maxfile 
            key={key}
            details={this.state.maxfiles[key]}
            />

        ))}
      </div>
    );
  }
}

export default App;
