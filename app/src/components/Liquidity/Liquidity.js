import React, { useState } from 'react';

function Liquidity() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Home</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Liquidity;