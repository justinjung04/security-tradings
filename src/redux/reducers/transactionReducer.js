export default (initialTransaction) => (transaction = initialTransaction, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TRANSACTION_LIST':
      return {
        ...transaction,
        list: payload.transactionList
      }
    default:
      return transaction;
  }
}