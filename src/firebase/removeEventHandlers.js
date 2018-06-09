import firebase from 'firebase/app';

export default (uid) => {
  firebase.database().ref(`${uid}/settings`).off('value');
  firebase.database().ref(`${uid}/securities`).off('value');
};