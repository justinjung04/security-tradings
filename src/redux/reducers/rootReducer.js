import { combineReducers } from 'redux';

import appReducer from './appReducer';
import userReducer from './userReducer';
import securityReducer from './securityReducer';
import transactionReducer from './transactionReducer';
import currencyReducer from './currencyReducer';
import initialStates from './initialStates';

export default combineReducers({
  app: appReducer(initialStates.app),
  user: userReducer(initialStates.user),
  security: securityReducer(initialStates.security),
  transaction: transactionReducer(initialStates.transaction),
  currency: currencyReducer(initialStates.currency),
});