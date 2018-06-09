// app
export const isAppLoaded = (state) => state.app.isLoaded;

// user
export const getUserId = (state) => state.user.id;
export const getUserName = (state) => state.user.name;

// currency
export const getCurrencyList = (state) => state.currency.list;
export const getActiveCurency = (state) => state.currency.active;

// crypto
export const getCryptoList = (state) => state.crypto.list;