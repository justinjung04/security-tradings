import firebase from 'firebase/app';

export default (userId, transactionId, transaction) => {
  firebase.database().ref(`${userId}/transactions/${transactionId}`).update(transaction);
};