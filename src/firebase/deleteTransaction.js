import firebase from 'firebase/app';

export default (userId, transaction) => {
  firebase.database().ref(`${userId}/transactions/${transaction.id}`).remove();
};