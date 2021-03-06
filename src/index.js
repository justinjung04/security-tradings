import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';

import rootReducer from './redux/reducers/rootReducer';
import * as actions from './redux/actions';
import getCurrencyList from './server-apis/getCurrencyList';
import getCurrencyRates from './server-apis/getCurrencyRates';
import initialize from './firebase/initialize';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const { dispatch } = store;

getCurrencyList(dispatch);
getCurrencyRates(dispatch);
initialize(dispatch);

const render = (App) => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
}

render(App);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App', () => {
    render(require('./components/App').default);
  });

  module.hot.accept('./redux/reducers/rootReducer', () => {
    store.replaceReducer(require('./redux/reducers/rootReducer').default);
  });
}