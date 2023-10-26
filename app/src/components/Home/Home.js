import React, { useState } from 'react';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>UDex descentralized perpetual exchange on XDC</h1>
    <h3>We want to be the first Dex on XDC blockchain</h3>
    </div>
  );
}

export default Home;