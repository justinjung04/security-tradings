import React from 'react';

import './Security.scss';

export default class Security extends React.PureComponent {
  openBuyModal = () => {
    const { openBuyModal, security } = this.props;;
    openBuyModal(security);
  }

  render() {
    const { security } = this.props;
    return (
      <div className='Security' key={security.name}>
        <img className='image' src={`https://www.cryptocompare.com${security.image}`} />
        <div className='name'>{`${security.name} (${security.symbol})`}</div>
        <div className='units'>{security.units} units</div>
        <div className='price'>${security.price}</div>
        <div className='acb'>{security.units ? `${security.price / security.units} / unit` : 'n/a'}</div>
        <div className='buttons'>
          <button onClick={this.openBuyModal}>Buy</button>
          <button>Sell</button>
          <button>Remove</button>
        </div>
      </div>
    );
  }
}