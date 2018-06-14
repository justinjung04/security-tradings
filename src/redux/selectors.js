// app
export const isAppLoaded = (state) => state.app.isLoaded;

// user
export const getUserId = (state) => state.user.id;
export const getUserName = (state) => state.user.name;
export const getUserAction = (state) => state.user.action;

// security
export const getSecurityList = (state) => state.security.list;

// transaction
export const getTransactionList = (state) => state.transaction.list;

// currency
export const getCurrencyList = (state) => state.currency.list;
export const getActiveCurency = (state) => state.currency.active;
export const getCurrencyRates = (state) => state.currency.rates;