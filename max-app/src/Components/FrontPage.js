import React from 'react';
import Login from './Login';
import firebase from 'firebase';
import { firebaseApp } from '../base'; 
import { slugify } from '../helpers';

class FrontPage extends React.Component {
    goToUser = async (authData) => {
        const userId = slugify(authData.user.displayName);
        this.props.history.push(`/user/${userId}`);
      };
    
      authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
      };

    render() {
        return (
            <div className="entry">
                <h2>Welcome to Max Version Control!</h2>
                <button onClick={this.goToUser}>Enter Here!</button>
            </div>
          );
    }
}

export default FrontPage;