import firebase from 'firebase/app';

export default (uid, security) => {
  firebase.database().ref(`${uid}/securities`).push().set(security);
};