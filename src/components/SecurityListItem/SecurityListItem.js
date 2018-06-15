import React from 'react';
import { connect } from 'react-redux';

import deleteSecurity from '../../firebase/deleteSecurity';
import * as selectors from '../../redux/selectors';
import * as actions from '../../redux/actions';

import './SecurityListItem.scss';

class SecurityListItem extends React.PureComponent {
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

  onClickBuy = () => {
    const { security, setUserAction } = this.props;
    setUserAction('buy', security);
  }

  onClickSell = () => {
    const { security, setUserAction } = this.props;
    setUserAction('sell', security);
  }

  onClickDelete = () => {
    const { userId, security } = this.props;
    deleteSecurity(userId, security);
  }

  render() {
    const { security, activeCurrency, transactionList } = this.props;
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
      <div className='SecurityListItem'>
        <div>{security.type}</div>
        <div>{`${security.name} (${security.symbol})`}</div>
        <div>{totalUnits}</div>
        <div>{this.roundToTwoDecimalPlaces(totalPrice)}</div>
        <div>{acb}</div>
        <button onClick={this.onClickBuy}>Buy</button>
        <button onClick={this.onClickSell}>Sell</button>
        <button onClick={this.onClickDelete}>Delete</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: selectors.getUserId(state),
  currencyRates: selectors.getCurrencyRates(state),
  activeCurrency: selectors.getActiveCurrency(state),
  transactionList: selectors.getTransactionList(state)
});

const mapDispatchToProps = (dispatch) => ({
  setUserAction: (type, security) => dispatch(actions.setUserAction(type, security))
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityListItem);