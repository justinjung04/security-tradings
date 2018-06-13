import firebase from 'firebase/app';

import * as actions from '../redux/actions';

const onSettingsUpdated = (dispatch) => (snapshot) => {
  const dataObject = snapshot.val();
  const { currency = 'USD' } = dataObject;
  dispatch(actions.setActiveCurrency(currency));
};

const onSecuritiesUpdated = (dispatch) => (snapshot) => {
  const dataObject = snapshot.val();
  const securityList = Object.keys(dataObject || {}).map(key => ({ id: key, ...dataObject[key] }));
  dispatch(actions.setSecurityList(securityList));
};

const onTransactionsUpdated = (dispatch) => (snapshot) => {
  const dataObject = snapshot.val();
  const transactionList = Object.keys(dataObject || {}).map(key => ({ id: key, ...dataObject[key] }));
  dispatch(actions.setTransactionList(transactionList));
};

export default (uid, dispatch) => {
  firebase.database().ref(`${uid}/settings`).on('value', onSettingsUpdated(dispatch));
  firebase.database().ref(`${uid}/securities`).on('value', onSecuritiesUpdated(dispatch));
  firebase.database().ref(`${uid}/transactions`).on('value', onTransactionsUpdated(dispatch));
};