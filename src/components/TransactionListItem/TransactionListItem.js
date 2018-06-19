import React from 'react';
import { connect } from 'react-redux';

import CurrencySelector from '../CurrencySelector';
import editTransaction from '../../firebase/editTransaction';
import deleteTransaction from '../../firebase/deleteTransaction';
import * as selectors from '../../redux/selectors';

import './TransactionListItem.scss';

class TransactionListItem extends React.PureComponent {
  constructor() {
    super();
    this.dateInput = React.createRef();
    this.unitInput = React.createRef();
    this.priceInput = React.createRef();
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
      '/price': Number(this.priceInput.current.value),
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
    const { transaction } = this.props;

    return (
      <div className='TransactionListItem'>
        <div className={`action ${transaction.action}`}>{transaction.action}</div>
        {isEditing
          ? <React.Fragment>
              <input className='date' ref={this.dateInput} defaultValue={transaction.date} type='date' />
              <div className='name'>{transaction.securityName}</div>
              <input ref={this.unitInput} defaultValue={transaction.unit} />
              <input ref={this.priceInput} defaultValue={transaction.price} />
              <CurrencySelector ref={this.currencySelector} defaultValue={transaction.currency} />
              <div className='buttons'>
                <button onClick={this.onClickSave}>save</button>
                <button onClick={this.toggleEdit}>cancel</button>
              </div>
            </React.Fragment>
          : <React.Fragment>
              <div className='date'>{transaction.date}</div>
              <div className='name'>{transaction.securityName}</div>
              <div>{transaction.unit}</div>
              <div>{transaction.price}</div>
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
  userId: selectors.getUserId(state)
});

export default connect(mapStateToProps)(TransactionListItem);
