import React from 'react';
import { connect } from 'react-redux';

import deleteSecurity from '../../firebase/deleteSecurity';
import * as selectors from '../../redux/selectors';
import * as actions from '../../redux/actions';

import './SecurityList.scss';

class SecurityList extends React.PureComponent {
  render() {
    const { securityList, transactionList, setUserAction } = this.props;

    return (
      <div className='SecurityList'>
        <h3>Securities</h3>
        {securityList.map((security, i) => {
          const filteredList = transactionList.filter(({ securityId }) => securityId === security.id);
          const totalUnits = filteredList.reduce((total, { action, unit }) => {
            return (action === 'buy') ? total + unit : total - unit;
          }, 0);
          const totalPrice = filteredList.reduce((total, { action, price }) => {
            return (action === 'buy') ? total + price : total - price;
          }, 0);
          const acb = (totalUnits > 0) ? Math.round(totalPrice / totalUnits * 100) / 100 : 'n/a';

          return (
            <div key={i} className='row'>
              <div>{security.type}</div>
              <div>{`${security.name} (${security.symbol})`}</div>
              <div>{totalUnits}</div>
              <div>{totalPrice}</div>
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
  securityList: selectors.getSecurityList(state),
  transactionList: selectors.getTransactionList(state)
});

const mapDispatchToProps = (dispatch) => ({
  setUserAction: (type, security) => dispatch(actions.setUserAction(type, security))
})

export default connect(mapStateToProps, mapDispatchToProps)(SecurityList);