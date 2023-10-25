import React, { useState } from 'react';
import TradingViewChart from '../Chart/chart';

function Trade() {
    const [count, setCount] = useState(0);
    const [xdcprice, setXdcprice] = useState("");
    
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

    return (

        <div>
            <h2>{xdcprice}</h2>
            <h1>Tradingview</h1>
            <TradingViewChart />
        </div>
    );
}

export default Trade;