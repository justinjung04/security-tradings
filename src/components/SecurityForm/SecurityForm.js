import React from 'react';
import { connect } from 'react-redux';

import CurrencySelector from '../CurrencySelector';

import * as selectors from '../../redux/selectors';
import * as actions from '../../redux/actions';
import addSecurity from '../../firebase/addSecurity';
import addTransaction from '../../firebase/addTransaction';

import './SecurityForm.scss';

class SecurityForm extends React.PureComponent {
  constructor() {
    super();
    const today = new Date();
    this.defaultDate = `${today.getFullYear()}-${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}-${today.getDate()}`;
    this.typeInput = React.createRef();
    this.nameInput = React.createRef();
    this.symbolInput = React.createRef();
    this.dateInput = React.createRef();
    this.unitInput = React.createRef();
    this.priceInput = React.createRef();
    this.currencyInput = React.createRef();
  }

  onClickSubmit = () => {
    const { userId, action, resetUserAction } = this.props;
    switch (action.type) {
      case 'add':
        addSecurity(userId, {
          type: this.typeInput.current.value,
          name: this.nameInput.current.value,
          symbol: this.symbolInput.current.value
        });
        break;
      case 'buy':
      case 'sell':
        addTransaction(userId, {
          action: action.type,
          securityId: action.security.id,
          securityName: action.security.name,
          securitySymbol: action.security.symbol,
          date: this.dateInput.current.value,
          unit: Number(this.unitInput.current.value),
          price: Number(this.priceInput.current.value),
          currency: this.currencyInput.current.value
        });
        break;
    }
    resetUserAction();
  }

  render() {
    const { action, activeCurrency, resetUserAction } = this.props;
    const display = (action.type === '') ? 'none' : 'flex';

    return (
      <div className='SecurityForm' style={{ display }}>
        <h3>Form</h3>
        <div className='row'>
          <div className='label'>Type</div>
          {action.type === 'add'
            ? <select ref={this.typeInput}>
                <option>Crypto</option>
                <option>Stock</option>
                <option>Option</option>
                <option>Bond</option>
              </select>
            : <div>{action.security.type}</div>
          }
        </div>
        <div className='row'>
          <div className='label'>Name</div>
          {action.type === 'add'
            ? <input ref={this.nameInput} /> 
            : <div>{action.security.name}</div>
          }
        </div>
        <div className='row'>
          <div className='label'>Symbol</div>
          {action.type === 'add'
            ? <input ref={this.symbolInput} />
            : <div>{action.security.symbol}</div>
          }
        </div>
        {(action.type === 'buy' || action.type === 'sell') &&
          <React.Fragment>
            <div className='row'>
              <div className='label'>Units</div>
              <input ref={this.unitInput} />
            </div>
            <div className='row'>
              <div className='label'>Price</div>
              <input ref={this.priceInput} />
            </div>
            <div className='row'>
              <div className='label'>Currency</div>
              <CurrencySelector ref={this.currencyInput} defaultValue={activeCurrency} />
            </div>
            <div className='row'>
              <div className='label'>Date</div>
              <input ref={this.dateInput} type='date' defaultValue={this.defaultDate} />
            </div>
          </React.Fragment>
        }
        <div className='buttons'>
          <button onClick={this.onClickSubmit}>Submit</button>
          <button onClick={resetUserAction}>Cancel</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: selectors.getUserId(state),
  action: selectors.getUserAction(state),
  activeCurrency: selectors.getActiveCurency(state)
});

const mapDispatchToProps = (dispatch) => ({
  resetUserAction: () => dispatch(actions.setUserAction(''))
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityForm);