import { ethers } from 'ethers';
import './App.css';
import Sample from './Sample/Sample';
import TradingViewChart from './Chart/chart';
import { UDexContract as udexAddress } from '../output.json';
import { abi as abiUDex } from '../artifacts/contracts/UDex.sol/UDex.json';
//import { abi } from '../artifacts/contracts/SampleContract.sol/SampleContract.json';
//import { SampleContract as address } from '../output.json';
import { abi as consumerabi } from '../artifacts/contracts/CustomerContract.sol/CustomerContract.json';
import { CustomerContract as customeraddress } from '../output.json';
import logo from '../assets/logoudex.jpg';

import { BrowserRouter as Router, Route, Routes, Link, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Liquidity from './Liquidity/Liquidity';
import Trade from './Trade/Trade';

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Web3 from 'web3';

const { getWeb3Modal, createWeb3Provider, connectWallet, executeTransaction, EthereumContext, queryData, createContractInstance, log } = require('react-solidity-xdc3');


var connectOptions = {
  rpcObj: {
    50: "https://erpc.xinfin.network",
    51: "https://erpc.apothem.network"
  },
  network: "mainnet",
  toDisableInjectedProvider: true
}

function App() {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abiUDex, "0x5648667E6db246907f3EeA2a5B8dd0a1A96709c1");

  const [connecting, setConnecting] = useState(false);
  const [ethereumContext, setethereumContext] = useState({});
  const web3Modal = getWeb3Modal(connectOptions);
  const [accountadd, setaccountadd] = useState("");
  const [accountbalance, setaccountbalance] = useState(0);
  const [samples, setSamples] = useState({});
  const [providers, setProviders] = useState({});
  const [consumers, setConsumers] = useState({});
  const [UDex1, setUDex1] = useState({});

  const connect = async (event) => {
    event.preventDefault();
    const instance = await web3Modal.connect();
    const { provider, signer } = await createWeb3Provider(instance);
    const UDex = await createContractInstance(udexAddress, abiUDex, provider);
    //const sample = await createContractInstance(address, abi, provider);
    const consumer = await createContractInstance(customeraddress, consumerabi, provider);
    const account = await signer.getAddress();
    //setSamples(sample);
    //console.log("sample", sample)
    console.log("consumerrrrrrr", consumer)
    setProviders(provider);
    console.log("udex", UDex)
    setUDex1(UDex);
    console.log(await signer.getBalance() / 1e18);

    setaccountbalance(await signer.getBalance() / 1e18);
    setaccountadd(account.substring(0, 2) + "..." + account.substring(account.length - 4));
    setethereumContext({ provider, UDex, account, consumer })
    //setethereumContext({ provider, sample, account, consumer })
    log("Connect", "Get Address", await signer.getAddress());
    setConnecting(true);
  }

  const linkStyle = {
    textDecoration: 'none', // Elimina el subrayado
    color: 'white', // Define el color del texto como blanco
    margin: '10px',
    marginLeft: '100px',
    fontSize: '2rem',
    fontWeight: '600',
  };

  const getHelloWorld = async (event) => {
    event.preventDefault();
    console.log(udexAddress);
    console.log(providers);
    let response1 = await queryData('xdc0d72BA97CFA96e2027F5850BE1411214F9Af602b', providers, 'tryfunction');
    log(response1);
    //let response = await contract.methods.tryfunction();
    //console.log(response[0]);
  }

  const [submitting, setSubmitting] = useState(false);
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
    <div className="App bg-dark ">
      <nav className="container">
        <div className="logo">
          <img src={logo} alt="Logo UDEX" width={150} />
        </div>

        <nav className="navbar">
          <Link style={linkStyle} to="Home/">Home</Link>
          <Link style={linkStyle} to="Liquidity/">Liquidity Pools</Link>
          <Link style={linkStyle} to="Trade/">Trade</Link>
        </nav>

        <div className="botonderecha">
          Balance: {accountbalance.toFixed(3)} XDC
          <button className="button" onClick={connect} disabled={connecting}>
            {connecting ? accountadd : 'Connect'}
          </button>

        </div>
      </nav>
      <Routes>
        <Route path="/Home/" element={<Home UDex={UDex1} provider={providers} />} />
        <Route path="/Liquidity/" element={<Liquidity />} />
        <Route path="/Trade/" element={<Trade />} />
      </Routes>

    </div>
  );
}

export default App;