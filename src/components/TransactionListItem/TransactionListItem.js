import React from 'react';
import { connect } from 'react-redux';

import CurrencySelector from '../CurrencySelector';

import editTransaction from '../../firebase/editTransaction';
import deleteTransaction from '../../firebase/deleteTransaction';
import * as selectors from '../../redux/selectors';
import getCurrencyRate from '../../services/getCurrencyRate';

import './TransactionListItem.scss';

class TransactionListItem extends React.PureComponent {
  constructor() {
    super();
    this.dateInput = React.createRef();
    this.unitInput = React.createRef();
    this.costInput = React.createRef();
    this.currencySelector = React.createRef();
    this.state = {
      isEditing: false
    };
  }

  toggleEdit = () => {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  }

  onClickSave = () => {
    const { userId, transaction } = this.props;
    editTransaction(userId, transaction.id, {
      '/date': this.dateInput.current.value,
      '/unit': Number(this.unitInput.current.value),
      '/cost': Number(this.costInput.current.value),
      '/currency': this.currencySelector.current.value,
    });
    this.toggleEdit();
  }

  deleteTransaction = () => {
    const { userId, transaction } = this.props;
    deleteTransaction(userId, transaction);
  }

  render() {
    const { isEditing } = this.state;
    const { transaction, currencyRates, activeCurrency } = this.props;
    const isPending = transaction.currency !== activeCurrency && getCurrencyRate(currencyRates, transaction.date, transaction.currency, activeCurrency) === -1;

    return (
      <div className='TransactionListItem'>
        <div className={`action ${transaction.action} ${isPending ? 'pending' : ''}`}>{transaction.action}</div>
        {isEditing
          ? <React.Fragment>
              <input className='date' ref={this.dateInput} defaultValue={transaction.date} type='date' />
              <div className='name'>{`${transaction.securityName} (${transaction.securitySymbol})`}</div>
              <input ref={this.unitInput} defaultValue={transaction.unit} />
              <input ref={this.costInput} defaultValue={transaction.cost} />
              <CurrencySelector ref={this.currencySelector} defaultValue={transaction.currency} />
              <div className='buttons'>
                <button onClick={this.onClickSave}>save</button>
                <button onClick={this.toggleEdit}>cancel</button>
              </div>
            </React.Fragment>
          : <React.Fragment>
              <div className='date'>{transaction.date}</div>
              <div className='name'>{`${transaction.securityName} (${transaction.securitySymbol})`}</div>
              <div>{transaction.unit}</div>
              <div>{transaction.cost}</div>
              <div>{transaction.currency}</div>
              <div className='buttons'>
                <button onClick={this.toggleEdit}>Edit</button>
                <button onClick={this.deleteTransaction}>Delete</button>
              </div>
            </React.Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: selectors.getUserId(state),
  currencyRates: selectors.getCurrencyRates(state),
  activeCurrency: selectors.getActiveCurrency(state)
});

export default connect(mapStateToProps)(TransactionListItem);
