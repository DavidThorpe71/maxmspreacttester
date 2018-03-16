import React, { Component } from 'react';
import Header from './Header';
import EditMaxFile from './EditMaxFile';
import LoadData from './LoadData';
import sampleData from '../sample-data';
import AddPatchForm from './AddPatchForm';

class App extends Component {

  render() {
    return (
      <div className="user-page">
        <Header />
        <div className="container">
          <h1 className="name">{this.props.match.params.userId}'s Max Files</h1>
          <LoadData loadSampleData={this.loadSampleData} />
          <button onClick={this.showForm}>{this.state.showAddForm ? 'Hide' : 'Add Patch'}</button>
          {this.state.showAddForm && <AddPatchForm addPatch={this.addPatch} showForm={this.showForm} />}
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

export default UserPage;