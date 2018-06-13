import React from 'react';
import { connect } from 'react-redux';

import SignIn from '../SignIn';
import CurrencySelector from '../CurrencySelector';
import SecurityForm from '../SecurityForm';
import SecurityList from '../SecurityList';
import TransactionList from '../TransactionList';

import * as selectors from '../../redux/selectors';
import * as actions from '../../redux/actions';
import removeEventHandlers from '../../firebase/removeEventHandlers';
import signOut from '../../firebase/signOut';
import updateCurrency from '../../firebase/updateCurrency';

import './App.scss';

class App extends React.PureComponent {
  componentWillUnmount() {
    const { userId } = this.props;
    removeEventHandlers(userId);
  }

	render() {
    const { isLoaded, userId, userName, securityList, transactionList, activeCurrency, setUserAction } = this.props;

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
                  {activeCurrency &&
                    <div className='main-currency'>
                      <div className='label'>Currency:</div>
                      <CurrencySelector value={activeCurrency} onChange={(e) => updateCurrency(userId, e.target.value)} />
                    </div>
                  }
                  <SecurityList />
                  <TransactionList />
                  <SecurityForm />
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
  securityList: selectors.getSecurityList(state),
  transactionList: selectors.getTransactionList(state),
  activeCurrency: selectors.getActiveCurency(state)
});

export default connect(mapStateToProps)(App);