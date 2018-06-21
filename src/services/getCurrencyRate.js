export default (currencyRates, date, currencyFrom, currencyTo) => {
  let dateString = date;
  let count = 0;
  while (!currencyRates[dateString] && count < 2) {
    const nextDay = new Date(dateString);
    nextDay.setDate(nextDay.getDate() + 1);
    dateString = `${nextDay.getUTCFullYear()}-${nextDay.getUTCMonth() < 9 ? '0' : ''}${nextDay.getUTCMonth() + 1}-${nextDay.getUTCDate() < 10 ? '0' : ''}${nextDay.getUTCDate()}`;
    count++;
  }
  if (count === 2) {
    return -1;
  }
  const rate1 = currencyRates[dateString][currencyFrom] || 1;
  const rate2 = currencyRates[dateString][currencyTo] || 1;
  return rate1 / rate2;
} 