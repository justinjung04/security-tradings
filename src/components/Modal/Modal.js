import React from 'react';

import './Modal.scss';

export default class Modal extends React.PureComponent {
  render() {
    const { isVisible, hideModal, children } = this.props;
    return (
      <div className={`Modal ${isVisible ? 'visible' : 'hidden'}`} onClick={hideModal}>
        <div className='inner-wrapper'>
          {children}
        </div>
      </div>
    );
  }
}