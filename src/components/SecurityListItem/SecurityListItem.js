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
    const results = filteredList.reduce((result, { action, date, unit, cost, currency }) => {
      const rate = (currency === activeCurrency) ? 1 : this.getCurrencyRate(date, currency, activeCurrency);
      if (rate < 0) {
        return result;
      } else if (action === 'buy') {
        const units = result.units + unit;
        const acb = result.acb + (cost * rate);
        const acbPerUnit = acb / units;
        return { ...result, units, acb, acbPerUnit };
      } else {
        const units = result.units - unit;
        const acb = result.acb * units / result.units;
        const realizedGain = result.realizedGain + ((cost * rate) - result.acbPerUnit * unit);
        return { ...result, units, acb, realizedGain };
      }
    }, {
      units: 0,
      acb: 0,
      acbPerUnit: 0,
      realizedGain: 0
    });

    // const acb = filteredList.reduce((result, { action, date, unit, cost, currency }) => {
    //   const rate = (currency === activeCurrency) ? 1 : this.getCurrencyRate(date, currency, activeCurrency);
    //   return (action === 'buy' && rate > 0) ? result + (cost * rate) : result - (cost * rate);
    // }, 0);

    // const acbPerUnit = (units > 0) ? this.roundToTwoDecimalPlaces(acb / units) : 'n/a';

    return (
      <div className='SecurityListItem'>
        <div className={`badge ${security.type}`}>{security.type}</div>
        <div className='name'>{`${security.name} (${security.symbol})`}</div>
        <div className='units'>{results.units}</div>
        <div className='acb'>{this.roundToTwoDecimalPlaces(results.acb)}</div>
        <div className='acb-per-unit'>{this.roundToTwoDecimalPlaces(results.acbPerUnit)}</div>
        <div className='realized-gain'>{this.roundToTwoDecimalPlaces(results.realizedGain)}</div>
        <div className='buttons'>
          <button onClick={this.onClickBuy}>Buy</button>
          <button onClick={this.onClickSell}>Sell</button>
          <button onClick={this.onClickDelete}>Delete</button>
        </div>
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