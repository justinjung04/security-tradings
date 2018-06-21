import React from 'react';
import { connect } from 'react-redux';

import deleteSecurity from '../../firebase/deleteSecurity';
import * as selectors from '../../redux/selectors';
import * as actions from '../../redux/actions';
import getCurrencyRate from '../../services/getCurrencyRate';
import roundToTwoDecimalPlaces from '../../services/roundToTwoDecimalPlaces';

import './SecurityListItem.scss';

class SecurityListItem extends React.PureComponent {
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
    const { security, currencyRates, activeCurrency, transactionList } = this.props;
    const filteredList = transactionList.filter(({ securityId }) => securityId === security.id);
    const results = filteredList.reduce((result, { action, date, unit, cost, currency }) => {
      const rate = (currency === activeCurrency) ? 1 : getCurrencyRate(currencyRates, date, currency, activeCurrency);
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

    return (
      <div className='SecurityListItem'>
        <div className={`badge ${security.type}`}>{security.type}</div>
        <div className='name'>{`${security.name} (${security.symbol})`}</div>
        <div className='units'>{results.units}</div>
        <div className='acb'>{roundToTwoDecimalPlaces(results.acb)}</div>
        <div className='acb-per-unit'>{roundToTwoDecimalPlaces(results.acbPerUnit)}</div>
        <div className='realized-gain'>{roundToTwoDecimalPlaces(results.realizedGain)}</div>
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