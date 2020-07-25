(async () => {
  const USD2EUR_CONVERSION_FACTOR = 1.2;

  const transactions = [
    { amount: 100 },
    { amount: 200 },
    { amount: 330 },
    { amount: 40 },
    { amount: 50 },
  ];

  const sumRichTransactions = async () =>
    transactions
      .map((transaction) => transaction.amount * USD2EUR_CONVERSION_FACTOR)
      .filter((amount) => amount > 100)
      .reduce((sum, amount) => sum + amount, 0);

  console.log(await sumRichTransactions());
})();
