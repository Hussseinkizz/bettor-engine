// Todo: Make all decimals fixed to 2 decimal places!
const odds = [
  { x: 2.25, y: 1.9 },
  { x: 3.25, y: 1.3 },
  { x: 4.25, y: 2.9 },
  { x: 2.0, y: 3.9 },
  { x: 2.0, y: 2.2 },
];

function ArbCal(x, y, setStake) {
  const stake = setStake ?? 1;

  // step 1
  const percentA = (1 / x) * 100;
  const percentB = (1 / y) * 100;

  // console.log("log 1", percentA,percentB)

  // step 2
  const totalPercent = percentA + percentB;
  // console.log("log 2", totalPercent)

  // step 3
  const stakeSplitA = (stake * percentA) / totalPercent;
  const stakeSplitB = (stake * percentB) / totalPercent;
  // console.log('log 3', stakeSplitA, stakeSplitB)

  // step 4
  const returnProfitA = stakeSplitA * x;
  const returnProfitB = stakeSplitB * y;
  // console.log("log 4", returnProfitA, returnProfitB)

  // step 5
  const profitMarginA = returnProfitA - stake;
  const profitMarginB = returnProfitB - stake;
  // console.log('log 5', profitMarginA, profitMarginB);

  // step 6, final...
  const grandProfit = ((profitMarginA + profitMarginB) / 2) * (1 / 100);
  // console.log("log 6", grandProfit);

  if (grandProfit < 0.1) {
    return {
      results: null,
      message: 'No viable arbitrage found!',
    };
  }
  return {
    results: {
      x: x,
      y: y,
      stake: stake,
      arbitrage: `${grandProfit}%`,
    },
    message: 'No viable arbitrage found!',
  };
}

odds.forEach((oddSet) => {
  const arb = ArbCal(oddSet.x, oddSet.y);
  console.log(arb);
});
