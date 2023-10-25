import React, { useState } from 'react';

function Liquidity() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>XDC Network</h1>
      <h2>XDC</h2>
        <div className="column2">
            Pool Info
            Total APR
            Total Liquidity
            <button className="buttonLong">Add Liquidity</button>
            <button className="buttonShort">Remove Liquidity</button>



        </div>
    </div>
  );
}

export default Liquidity;