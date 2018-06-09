import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../redux/selectors';

import './CurrencySelector.scss';

class CurrencySelector extends React.PureComponent {
  render() {
    const { value, onChange, currencyList } = this.props;
    return (
      <select className='CurrencySelector' value={value} onChange={onChange}>
        {currencyList.map(symbol => <option key={symbol}>{symbol}</option>)}
      </select>
    )
  }
}

const mapStatesToProps = (state) => ({
  currencyList: selectors.getCurrencyList(state)
});

export default connect(mapStatesToProps)(CurrencySelector);