import React from 'react';
import { connect } from 'react-redux';

import CurrencySelector from '../CurrencySelector';
import SecurityListItem from '../SecurityListItem';
import SecurityListItemHeader from '../SecurityListItemHeader';

import updateCurrency from '../../firebase/updateCurrency';
import * as selectors from '../../redux/selectors';
import * as actions from '../../redux/actions';

import './SecurityList.scss';

class SecurityList extends React.PureComponent {
  onChangeCurrencySelector = (e) => {
    const { userId } = this.props;
    updateCurrency(userId, e.target.value);
  }

  onClickNewSecurity = () => {
    const { setUserAction } = this.props;
    setUserAction('add', {});
  }

  render() {
    const { activeCurrency, securityList } = this.props;

    return (
      <div className='SecurityList'>
        <h3>Securities</h3>
        <div>
          <SecurityListItemHeader>
            <CurrencySelector value={activeCurrency} onChange={this.onChangeCurrencySelector} />
          </SecurityListItemHeader>
          {securityList.map((security, i) => <SecurityListItem key={i} security={security} />)}
        </div>
        <button className='add-button' onClick={this.onClickNewSecurity}>New security</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: selectors.getUserId(state),
  activeCurrency: selectors.getActiveCurrency(state),
  securityList: selectors.getSecurityList(state)
});

const mapDispatchToProps = (dispatch) => ({
  setUserAction: (type, security) => dispatch(actions.setUserAction(type, security))
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityList);