import React, { Component } from 'react';
import firebase from 'firebase';
import '../App.css';
import Header from './Header';
import EditMaxFile from './EditMaxFile';
import LoadData from './LoadData';
import sampleData from '../sample-data';
import AddPatchForm from './AddPatchForm';
import Login from './Login';
import base, { firebaseApp } from '../base';
import { slugify } from '../helpers';

class App extends Component {
  state = {
    maxfiles: {},
    uid: null,
    owner: null,
    showAddForm: false
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.userId}/maxfiles`, {
      context: this,
      state: 'maxfiles',
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

  authHandler = async (authData) => {
    // const userId = slugify(authData.user.displayName);
    // this.props.history.push(`/user/${userId}`);
    const userId = this.props.match.params.userId
    const user = await base.fetch(userId, { context: this });
    console.log(user);
    if(!user.owner) {
      await base.post(`${userId}/owner`, {
        data: authData.user.uid
      })
      this.setState({
        uid: authData.user.uid,
        owner: user.owner || authData.user.uid
      })
    }
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };


  render() {
    if (!this.state.uid) {
      return (
        <Login authenticate={this.authenticate} />
      );
    }
    return (
      <div className="Max-App">
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

export default App;
