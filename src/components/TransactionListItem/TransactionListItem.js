import React from 'react';
import { connect } from 'react-redux';

import CurrencySelector from '../CurrencySelector';
import deleteTransaction from '../../firebase/deleteTransaction';
import * as selectors from '../../redux/selectors';

import './TransactionListItem.scss';

class TransactionListItem extends React.PureComponent {
  constructor() {
    super();
    this.currencySelector = React.createRef();
    this.state = {
      isEditing: false
    };
  }

  toggleEdit = () => {
    if (this.currencySelector.current) {
      console.log(this.currencySelector.current.value);
    }
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  }

  deleteTransaction = () => {
    const { userId, transaction } = this.props;
    deleteTransaction(userId, transaction);
  }

  render() {
    const { isEditing } = this.state;
    const { transaction } = this.props;

    return (
      <div className='TransactionListItem'>
        <div>{transaction.action}</div>
        <div>{transaction.id}</div>
        {isEditing
          ? <React.Fragment>
              <div>{transaction.unit}</div>
              <div>{transaction.price}</div>
              <CurrencySelector ref={this.currencySelector} defaultValue={transaction.currency} />
              <button onClick={() => {}}>save</button>
              <button onClick={this.toggleEdit}>cancel</button>
            </React.Fragment>
          : <React.Fragment>
              <div>{transaction.unit}</div>
              <div>{transaction.price}</div>
              <div>{transaction.currency}</div>
              <button onClick={this.toggleEdit}>edit</button>
              <button onClick={this.deleteTransaction}>delete</button>
            </React.Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: selectors.getUserId(state)
});

export default connect(mapStateToProps)(TransactionListItem);
