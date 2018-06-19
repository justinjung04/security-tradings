import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../redux/selectors';

import './SecurityListItemHeader.scss';

class SecurityListItemHeader extends React.PureComponent {
  render() {
    const { activeCurrency, children } = this.props;
    return (
      <div className='SecurityListItemHeader'>
        <div className='name'>Name</div>
        <div className='units'>Units</div>
        <div className='cost'>
          Cost
          <span className='currency'>({activeCurrency})</span>
        </div>
        <div className='acb'>
          ACB
          <span className='currency'>({activeCurrency})</span>
        </div>
        <div className='selector'>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  activeCurrency: selectors.getActiveCurrency(state)
});

export default connect(mapStateToProps)(SecurityListItemHeader);