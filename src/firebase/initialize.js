import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import apiKey from '../api-key';
import * as actions from '../redux/actions';
import addEventHandlers from './addEventHandlers';
import removeEventHandlers from './removeEventHandlers';

export default (dispatch) => {
  firebase.initializeApp({
    authDomain: 'security-tradings.firebaseapp.com',
    databaseURL: 'https://security-tradings.firebaseio.com',
    projectId: 'security-tradings',
    storageBucket: 'security-tradings.appspot.com',
    messagingSenderId: '383918451149',
    apiKey
  });

  let userId = '';
  firebase.auth().onAuthStateChanged((user) => {
    dispatch(actions.setLoaded(true));
    if (user) {
      const { uid, displayName } = user;
      dispatch(actions.setUser(uid, displayName));
      addEventHandlers(uid, dispatch);
      userId = uid;
    } else {
      dispatch(actions.setUser('', ''));
      removeEventHandlers(userId);
    }
  });
};