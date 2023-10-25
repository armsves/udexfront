import React, { useState } from 'react';
import TradingViewChart from '../Chart/chart';

function Trade() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Tradingview</h1>
      <TradingViewChart />
    </div>
  );
}

export default Trade;