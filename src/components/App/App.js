import React from 'react';
import { connect } from 'react-redux';

import SignIn from '../SignIn';
import SecurityForm from '../SecurityForm';
import SecurityList from '../SecurityList';
import TransactionList from '../TransactionList';

import * as selectors from '../../redux/selectors';
import removeEventHandlers from '../../firebase/removeEventHandlers';
import signOut from '../../firebase/signOut';

import './App.scss';

class App extends React.PureComponent {
  componentWillUnmount() {
    const { userId } = this.props;
    removeEventHandlers(userId);
  }

	render() {
    const { isLoaded, userId, userName } = this.props;

		return (
      <React.Fragment>
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
                    <SecurityList />
                    <TransactionList />
                  </React.Fragment>
                : <SignIn />
              }
            </React.Fragment>
          }
        </div>
        <SecurityForm />
      </React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
  isLoaded: selectors.isAppLoaded(state),
  userId: selectors.getUserId(state),
  userName: selectors.getUserName(state)
});

export default connect(mapStateToProps)(App);