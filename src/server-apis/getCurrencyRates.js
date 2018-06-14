import * as actions from '../redux/actions';

export default (dispatch) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const currencyRates = JSON.parse(xhr.response).data;
      dispatch(actions.setCurrencyRates(currencyRates));
    }
  };
  xhr.open("GET", `/currency-rates`, true);
  xhr.send();
};