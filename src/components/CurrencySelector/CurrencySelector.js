import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../redux/selectors';

import './CurrencySelector.scss';

class CurrencySelector extends React.PureComponent {
  render() {
    const { forwardedRef, defaultValue, value, onChange, currencyList } = this.props;
    return (
      <select className='CurrencySelector' ref={forwardedRef} defaultValue={defaultValue} value={value} onChange={onChange}>
        {currencyList.map(symbol => <option key={symbol}>{symbol}</option>)}
      </select>
    )
  }
}

const mapStateToProps = (state) => ({
  currencyList: selectors.getCurrencyList(state)
});

const ConenctedCurrencySelector = connect(mapStateToProps)(CurrencySelector);

export default React.forwardRef(((props, ref) => <ConenctedCurrencySelector {...props} forwardedRef={ref} />));