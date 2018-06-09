import React from 'react';
import { connect } from 'react-redux';

import CurrencySelector from '../CurrencySelector';

import * as selectors from '../../redux/selectors';

import './SecurityForm.scss';

class SecurityForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.typeInput = React.createRef();
    this.nameInput = React.createRef();
    this.symbolInput = React.createRef();
    this.state = {
      currency: props.initialCurrency
    };
  }

  setCurrency = (e) => {
    this.setState({ currency: e.target.value });
  }

  onSubmit = () => {
    const { userId } = this.props;
    if (type === 'add') {
      const type = this.typeInput.current.value;
      const name = this.nameInput.current.value;
      const symbol = this.symbolInput.current.value;
      console.log(type, name, symbol);
      // firebase.database().ref(`${userId}/securities/`);
    } else if (type === 'buy') {
      // const newTransactionRef = firebase.database().ref(`${userId}/transactions`).push();
      // newTransactionRef.set({

      // });
    } else if (type === 'sell') {
      
    }
  }

  render() {
    const { currency } = this.state;
    const { type } = this.props;
    return (
      <div className='SecurityForm'>
        <div className='title'>{`${type.charAt(0).toUpperCase() + type.slice(1)} security`}</div>
        <div className='row'>
          <div className='label'>Type</div>
          <select ref={this.selectInput}>
            <option value='crypto'>Crypto</option>
            <option value='stock'>Stock</option>
            <option value='option'>Option</option>
            <option value='bond'>Bond</option>
          </select>
        </div>
        <div className='row'>
          <div className='label'>Name</div>
          <input ref={this.nameInput} type='text' />
        </div>
        <div className='row'>
          <div className='label'>Symbol</div>
          <input ref={this.symbolInput} type='text' />
        </div>
        {type === 'purchase' &&
          <React.Fragment>
            <div className='row'>
              <div className='label'>Units purchased</div>
              <input type='number' />
            </div>
            <div className='row'>
              <div className='label'>Total price</div>
              <input type='number' />
            </div>
            <div className='row'>
              <div className='label'>Purchase currency</div>
              <CurrencySelector value={currency} onChange={this.setCurrency} />
            </div>
          </React.Fragment>
        }
        <div className='buttons'>
          <button onClick={this.onSubmit}>Submit</button>
          <button>Cancel</button>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => ({
  userId: selectors.getUserId(state),
  initialCurrency: selectors.getActiveCurency(state)
});

export default connect(mapStatesToProps)(SecurityForm);