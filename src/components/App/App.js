import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';

import SignIn from '../SignIn';
import Modal from '../Modal';
import CurrencySelector from '../CurrencySelector';
import SecurityForm from '../SecurityForm';

import * as selectors from '../../redux/selectors';
import removeEventHandlers from '../../firebase/removeEventHandlers';
import signOut from '../../firebase/signOut';
import updateCurrency from '../../firebase/updateCurrency';

import './App.scss';

class App extends React.PureComponent {
  componentWillUnmount() {
    const { userId } = this.props;
    removeEventHandlers(userId);
  }

  onChangeActiveCurrency = (e) => {
    const { userId } = this.props;
    updateCurrency(userId, e.target.value);
  }

	render() {
    const { isLoaded, userId, userName, currencyList, activeCurrency } = this.props;
		return (
			<div className='App'>
        <h1>Security tradings</h1>
        {isLoaded &&
          <React.Fragment>
            {userId
              ? <React.Fragment>
                  <div className='user-info'>
                    {`Welcome ${userName} `}
                    <button onClick={signOut}>Sign out</button>
                  </div>
                  <div className='main-currency'>
                    <div className='label'>Currency:</div>
                    <CurrencySelector value={activeCurrency} onChange={this.onChangeActiveCurrency} />
                  </div>
                  <SecurityForm type='add' />
                </React.Fragment>
              : <SignIn />
            }
          </React.Fragment>
        }
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
  isLoaded: selectors.isAppLoaded(state),
  userId: selectors.getUserId(state),
  userName: selectors.getUserName(state),
  currencyList: selectors.getCurrencyList(state),
  activeCurrency: selectors.getActiveCurency(state)
});

export default connect(mapStateToProps)(App);