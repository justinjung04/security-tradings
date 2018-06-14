import React from 'react';
import { connect } from 'react-redux';

import CurrencySelector from '../CurrencySelector';

import updateCurrency from '../../firebase/updateCurrency';
import deleteSecurity from '../../firebase/deleteSecurity';
import * as selectors from '../../redux/selectors';
import * as actions from '../../redux/actions';

import './SecurityList.scss';

class SecurityList extends React.PureComponent {
  updateCurrency = (e) => {
    const { userId } = this.props;
    updateCurrency(userId, e.target.value);
  }

  getCurrencyRate = (date, currencyFrom, currencyTo) => {
    const { currencyRates } = this.props;
    let dateString = date;
    let count = 0;
    while (!currencyRates[dateString] && count < 2) {
      const nextDay = new Date(dateString);
      nextDay.setDate(nextDay.getDate() + 1);
      dateString = `${nextDay.getUTCFullYear()}-${nextDay.getUTCMonth() < 9 ? '0' : ''}${nextDay.getUTCMonth() + 1}-${nextDay.getUTCDate() < 10 ? '0' : ''}${nextDay.getUTCDate()}`;
      count++;
    }
    if (count === 2) {
      return -1;
    }
    const rate1 = currencyRates[dateString][currencyFrom] || 1;
    const rate2 = currencyRates[dateString][currencyTo] || 1;
    return rate1 / rate2;
  }

  roundToTwoDecimalPlaces = (num) => {
    return Math.round(num * 100) / 100;
  }

  render() {
    const { activeCurrency, securityList, transactionList, setUserAction } = this.props;

    return (
      <div className='SecurityList'>
        <h3>Securities</h3>
        {activeCurrency &&
          <div className='main-currency'>
            <div className='label'>Currency:</div>
            <CurrencySelector value={activeCurrency} onChange={this.updateCurrency} />
          </div>
        }
        {securityList.map((security, i) => {
          const filteredList = transactionList.filter(({ securityId }) => securityId === security.id);
          const totalUnits = filteredList.reduce((result, { action, unit }) => {
            return (action === 'buy') ? result + unit : result - unit;
          }, 0);
          const totalPrice = filteredList.reduce((result, { action, date, price, currency }) => {
            const rate = (currency === activeCurrency) ? 1 : this.getCurrencyRate(date, currency, activeCurrency);
            return (action === 'buy' && rate > 0) ? result + (price * rate) : result - (price * rate);
          }, 0);
          const acb = (totalUnits > 0) ? this.roundToTwoDecimalPlaces(totalPrice / totalUnits) : 'n/a';

          return (
            <div key={i} className='row'>
              <div>{security.type}</div>
              <div>{`${security.name} (${security.symbol})`}</div>
              <div>{totalUnits}</div>
              <div>{this.roundToTwoDecimalPlaces(totalPrice)}</div>
              <div>{acb}</div>
              <button onClick={() => setUserAction('buy', security)}>Buy</button>
              <button onClick={() => setUserAction('sell', security)}>Sell</button>
              <button onClick={() => deleteSecurity(userId, security)}>Delete</button>
            </div>
          )
        })}
        <button onClick={() => setUserAction('add', {})}>New security</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: selectors.getUserId(state),
  activeCurrency: selectors.getActiveCurency(state),
  currencyRates: selectors.getCurrencyRates(state),
  securityList: selectors.getSecurityList(state),
  transactionList: selectors.getTransactionList(state)
});

const mapDispatchToProps = (dispatch) => ({
  setUserAction: (type, security) => dispatch(actions.setUserAction(type, security))
})

export default connect(mapStateToProps, mapDispatchToProps)(SecurityList);