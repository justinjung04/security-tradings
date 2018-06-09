// app
export const setLoaded = (isLoaded) => ({ type: 'SET_LOADED', payload: { isLoaded } });

// user
export const setUser = (id, name) => ({ type: 'SET_USER', payload: { id, name } });
export const setActiveCurrency = (symbol) => ({ type: 'SET_ACTIVE_CURRENCY', payload: { symbol } });

// currency
export const setCurrencyList = (list) => ({ type: 'SET_CURRENCY_LIST', payload: { list } });

// crypto
export const setCryptoList = (list) => ({ type: 'SET_CRYPTO_LIST', payload: { list } });