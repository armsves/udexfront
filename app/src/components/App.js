import { ethers } from 'ethers';
import './App.css';
import Sample from './Sample/Sample';
import TradingViewChart from './Chart/chart';
import { abi } from '../artifacts/contracts/SampleContract.sol/SampleContract.json';
import { SampleContract as address } from '../output.json';
import { abi as consumerabi } from '../artifacts/contracts/CustomerContract.sol/CustomerContract.json';
import { CustomerContract as customeraddress } from '../output.json';
import logo from '../assets/logoudex.jpg';

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { getWeb3Modal, createWeb3Provider, connectWallet, EthereumContext, createContractInstance, log } = require('react-solidity-xdc3');

var connectOptions = {
  rpcObj: {
    50: "https://erpc.xinfin.network",
    51: "https://erpc.apothem.network"
  },
  network: "mainnet",
  toDisableInjectedProvider: true
}

function App() {
  const [connecting, setConnecting] = useState(false);
  const [ethereumContext, setethereumContext] = useState({});
  const web3Modal = getWeb3Modal(connectOptions);
  const [accountadd, setaccountadd] = useState("");
  const [accountbalance, setaccountbalance] = useState(0);
  const [xdcprice, setXdcprice] = useState("");

  const connect = async (event) => {
    event.preventDefault();
    const instance = await web3Modal.connect();
    const { provider, signer } = await createWeb3Provider(instance);
    const sample = await createContractInstance(address, abi, provider);
    const consumer = await createContractInstance(customeraddress, consumerabi, provider);
    const account = await signer.getAddress();
    console.log(await signer.getBalance() / 1e18);

    setaccountbalance(await signer.getBalance() / 1e18);
    setaccountadd(account.substring(0, 2) + "..." + account.substring(account.length - 4));
    setethereumContext({ provider, sample, account, consumer })
    log("Connect", "Get Address", await signer.getAddress());
    setConnecting(true);
  }

  let countdown = 5;
  const updateCountdown = () => {
    countdown--;
    if (countdown === 0) {
      countdown = 5;
      fetchCryptoData();
    }
  };

  const fetchCryptoData = () => {
    const apiUrl = 'https://openapi.bitrue.com/api/v1/ticker/price?symbol=XDCETH';
    fetch(apiUrl, {})
      .then(response => response.json())
      .then(data => {
        let xdcpric = "Current Price: " + data.price + " USDT/XDC";
        setXdcprice(xdcpric);
      })
      .catch(error => {
        console.log('Error fetching crypto data:', error);
      });
  };
  setInterval(updateCountdown, 1000);
  fetchCryptoData();

  /*
        <section className="App-content">
        <EthereumContext.Provider value={ethereumContext}>
          <Sample />
        </EthereumContext.Provider>
      </section>
      <ToastContainer hideProgressBar={true} />
      */

  //<TradingViewChart />
  return (
    <div className="App">
      <nav className="bg-dark container">
        <div className="logo">
          <img src={logo} alt="Logo UDEX" width={150} />
        </div>
        <div className="botonderecha">
          Balance: {accountbalance.toFixed(3)} XDC
          <button className="button" onClick={connect} disabled={connecting}>
            {connecting ? accountadd : 'Connect'}
          </button>

        </div>
      </nav>
      <header className="App-header">
        <h1>Perpetual DEX</h1>
        <h2>{xdcprice}</h2>
      </header>

    </div>
  );
}

export default App;