import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import EditMaxFile from './EditMaxFile';
import LoadData from './LoadData';
import sampleData from '../sample-data';
import AddPatchForm from './AddPatchForm';
import base from '../base';

class App extends Component {
  state = {
    maxfiles: {},
    showAddForm: false
  };

  componentDidMount() {
    this.ref = base.syncState(`maxfiles`, {
      context: this,
      state: 'maxfiles'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addPatch = (patch) => {
    const maxfiles = { ...this.state.maxfiles };
    maxfiles[`patch${Date.now()}`] = patch;
    this.setState({
      maxfiles
    });
  }

  updatePatch = (key, updatedFile) => {
    const maxfiles = { ...this.state.maxfiles };
    maxfiles[key] = updatedFile;
    this.setState({ maxfiles });
  }

  showForm = () => {
    this.setState({ showAddForm: !this.state.showAddForm })
  }

  loadSampleData = () => {
    this.setState({ maxfiles: sampleData });
  };

  render() {
    return (
      <div className="Max-App">
        <Header />
        <div className="container">
          <LoadData loadSampleData={this.loadSampleData} />
          <button onClick={this.showForm}>{this.state.showAddForm ? 'Hide' : 'Add Patch'}</button>
          {this.state.showAddForm && <AddPatchForm addPatch={this.addPatch} />}
          <div className="file-container">
            {Object.keys(this.state.maxfiles).map(key => (
              <EditMaxFile 
                key={key}
                index={key}
                details={this.state.maxfiles[key]}
                updatePatch={this.updatePatch}
                />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
