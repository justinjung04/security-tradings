import React from 'react';
import { connect } from 'react-redux';

import TransactionListItem from '../TransactionListItem';

import * as selectors from '../../redux/selectors';

import './TransactionList.scss';

class TransactionList extends React.PureComponent {
  render() {
    const { transactionList } = this.props;

    return (
      <div className='TransactionList'>
        <h3>Transactions</h3>
        {transactionList.map((transaction, i) => (
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  transactionList: selectors.getTransactionList(state)
});

export default connect(mapStateToProps)(TransactionList);