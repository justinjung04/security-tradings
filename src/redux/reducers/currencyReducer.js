export default (initialCurrency) => (currency = initialCurrency, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CURRENCY_LIST':
      return {
        ...currency,
        list: payload.list
      }
    case 'SET_ACTIVE_CURRENCY':
      return {
        ...currency,
        active: payload.symbol
      };
    default:
      return currency;
  }
}