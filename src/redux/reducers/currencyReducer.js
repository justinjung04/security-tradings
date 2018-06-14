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
    case 'SET_CURRENCY_RATES':
      return {
        ...currency,
        rates: payload.rates
      };
    default:
      return currency;
  }
}