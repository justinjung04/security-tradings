import { combineReducers } from 'redux';

import appReducer from './appReducer';
import currencyReducer from './currencyReducer';
import userReducer from './userReducer';
import initialStates from './initialStates';

export default combineReducers({
  app: appReducer(initialStates.app),
  currency: currencyReducer(initialStates.currency),
  user: userReducer(initialStates.user)
});