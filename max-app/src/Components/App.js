import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Maxfile from './Maxfile';
import LoadData from './LoadData';
import sampleData from '../sample-data';
import AddPatchForm from './AddPatchForm';

class App extends Component {
  state = {
    maxfiles: {}
  };

  addPatch = (patch) => {
    const maxfiles = { ...this.state.maxfiles };
    maxfiles[`patch${Date.now()}`] = patch;
    this.setState({
      maxfiles
    });
  }

  loadSampleData = () => {
    this.setState({ maxfiles: sampleData });
  };

  render() {
    return (
      <div className="Max-App">
        <Header />
        <LoadData loadSampleData={this.loadSampleData} />
        <AddPatchForm addPatch={this.addPatch} />
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
