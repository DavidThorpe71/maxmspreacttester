import Rebase from 're-base';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBFcTZnEwsLvZ5zq3Z4oxHXb0O5VNHmts4",
    authDomain: "maxmsp-version-control.firebaseapp.com",
    databaseURL: "https://maxmsp-version-control.firebaseio.com",
  };

const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;