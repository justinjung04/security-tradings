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
        <div>
          <div className='TransactionListItemHeader'>
            <div className='date'>Date</div>
            <div className='name'>Name</div>
            <div>Units</div>
            <div>Cost/Proceed</div>
            <div>Currency</div>
          </div>
          {transactionList.map((transaction, i) => (
            <TransactionListItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  transactionList: selectors.getTransactionList(state)
});

export default connect(mapStateToProps)(TransactionList);