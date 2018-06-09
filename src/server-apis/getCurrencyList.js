import * as actions from '../redux/actions';

export default (dispatch) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const currencyList = JSON.parse(xhr.response).data;
      currencyList.sort();
      dispatch(actions.setCurrencyList(currencyList));
    }
  };
  xhr.open("GET", `/currency-list`, true);
  xhr.send();
};