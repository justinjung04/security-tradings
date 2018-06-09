import firebase from 'firebase/app';

export default (uid, currency) => {
  firebase.database().ref(`${uid}/settings/currency`).set(currency);
};