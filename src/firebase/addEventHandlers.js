import firebase from 'firebase/app';

import * as actions from '../redux/actions';

const onSettingsUpdated = (dispatch) => (snapshot) => {
  const { currency = 'USD' } = snapshot.val();
  dispatch(actions.setActiveCurrency(currency));
};

const onSecuritiesUpdated = (dispatch) => (snapshot) => {
  // dispatch
};

export default (uid, dispatch) => {
  firebase.database().ref(`${uid}/settings`).on('value', onSettingsUpdated(dispatch));
  firebase.database().ref(`${uid}/securities`).on('value', onSecuritiesUpdated(dispatch));
};