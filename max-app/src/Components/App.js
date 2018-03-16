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
    showAddForm: false,
    isAuthenticated: false
  };

  componentDidMount() {
    // const { params } = this.props.match;
    // this.ref = base.syncState(`${params.userId}/maxfiles`, {
    //   context: this,
    //   state: 'maxfiles',
    // });
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    })
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
    const userId = slugify(authData.user.displayName);
    this.props.history.push(`/user/${userId}`);
    const user = await base.fetch(this.props.match.params.userId, { context: this });
    if (!user.owner) {
      await base.post(`${this.props.match.params.userId}/owner`, {
        data: authData.user.uid,
      })
    }
    this.setState({
      isAuthenticated: true,
      uid: authData.user.uid,
      owner: user.owner || authData.user.uid
    });
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.userId}/maxfiles`, {
      context: this,
      state: 'maxfiles',
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    console.log('Logging out!');
    await firebase.auth().signOut();
    this.setState({
      uid: null
    });
    this.props.history.push("/");
  }

  render() {
    const logout = <button onClick={this.logout}>Logout</button>


    if (!this.state.uid) {
      return (
        <Login authenticate={this.authenticate}/>
      )
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
        </div>
    // ***Do something here if user is logged in but the owner of the maxfiles***
      )
    }

    return (
      <div className="Max-App">
        <Header />
        {logout}
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
