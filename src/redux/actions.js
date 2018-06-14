// app
export const setLoaded = (isLoaded) => ({ type: 'SET_LOADED', payload: { isLoaded } });

// user
export const setUser = (id, name) => ({ type: 'SET_USER', payload: { id, name } });
export const setUserAction = (type, security = {}) => ({ type: 'SET_USER_ACTION', payload: { type, security } });

// security
export const setSecurityList = (securityList) => ({ type: 'SET_SECURITY_LIST', payload: { securityList } });

// transaction
export const setTransactionList = (transactionList) => ({ type: 'SET_TRANSACTION_LIST', payload: { transactionList } });

// currency
export const setCurrencyList = (list) => ({ type: 'SET_CURRENCY_LIST', payload: { list } });
export const setActiveCurrency = (symbol) => ({ type: 'SET_ACTIVE_CURRENCY', payload: { symbol } });
export const setCurrencyRates = (rates) => ({ type: 'SET_CURRENCY_RATES', payload: { rates } });