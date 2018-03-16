import React, { Component } from 'react';
import Header from './Header';
import EditMaxFile from './EditMaxFile';
import LoadData from './LoadData';

import AddPatchForm from './AddPatchForm';

class UserPage extends Component {
    
    render() {
        return (
        <div className="user-page">
            <Header />
            <div className="container">
            {/* <h1 className="name">{this.props.match.params.userId}'s Max Files</h1> */}
            <LoadData loadSampleData={this.props.loadSampleData} />
            <button onClick={this.props.showForm}>{this.props.showAddForm ? 'Hide' : 'Add Patch'}</button>
            {this.props.showAddForm && <AddPatchForm addPatch={this.props.addPatch} showForm={this.props.showForm} />}
            <div className="file-container">

                {/* {Object.keys(this.props.maxFiles).map(key => (
                <EditMaxFile 
                    key={key}
                    index={key}
                    details={this.props.maxFiles[key]}
                    updatePatch={this.props.updatePatch}
                    /> */}
                ))}
            </div>
            </div>
        </div>
        );
  }
}

export default UserPage;