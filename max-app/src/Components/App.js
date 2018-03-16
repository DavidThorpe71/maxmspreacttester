import React, { Component } from 'react';
import firebase from 'firebase';
import '../App.css';
import sampleData from '../sample-data';
import Login from './Login';
import base, { firebaseApp } from '../base';
import { slugify } from '../helpers';
import UserPage from './UserPage';

class App extends Component {
  state = {
    maxfiles: {},
    uid: null,
    owner: null,
    showAddForm: false,
    isAuthenticated: false
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
    console.log(authData);
    const userId = slugify(authData.user.displayName);
    this.props.history.push(`/user/${userId}`);
    // const userId = this.props.match.params.userId
    // const user = await base.fetch(userId, { context: this });
    // console.log(user);
    // if(!user.owner) {
    //   await base.post(`${userId}/owner`, {
    //     data: authData.user.uid
    //   })
    //   this.setState({
    //     uid: authData.user.uid,
    //     owner: user.owner || authData.user.uid
    //   })
    // }
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };


  render() {
    if (!this.state.isAuthenticated) {
      return (
        <Login authenticate={this.authenticate}/>
      )
    }

    return (
      <UserPage 
        loadSampleData={this.loadSampleData}
        showForm={this.showForm}
        showAddForm={this.state.showAddForm}
        addPatch={this.addPatch}
        maxFiles={this.state.maxfiles}
        updatePatch={this.updatePatch}
      />
    )
  }
}

export default App;
