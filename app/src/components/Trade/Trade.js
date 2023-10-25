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
        const apiUrl = 'https://openapi.bitrue.com/api/v1/ticker/price?symbol=XDCUSDT';
        fetch(apiUrl, {})
            .then(response => response.json())
            .then(data => {
                let xdcpric = "Current Price: " + data.price + " XDC/USDT";
                setXdcprice(xdcpric);
            })
            .catch(error => {
                console.log('Error fetching crypto data:', error);
            });
    };
    setInterval(updateCountdown, 1000);
    fetchCryptoData();

    const [displayLongInfo, setDisplayLongInfo] = useState(true);
    const [displayShortInfo, setDisplayShortInfo] = useState(false);

    const [isLongSelected, setIsLongSelected] = useState(true);
    const [isShortSelected, setIsShortSelected] = useState(false);

    const handleLongClick = () => {
        setDisplayLongInfo(true);
        setDisplayShortInfo(false);
        setIsLongSelected(true);
        setIsShortSelected(false);
    };

    const handleShortClick = () => {
        setDisplayShortInfo(true);
        setDisplayLongInfo(false);
        setIsShortSelected(true);
        setIsLongSelected(false);
    };

    const buttonLongClassName = `buttonLong ${isLongSelected ? 'buttonLongSelected' : ''}`;
    const buttonShortClassName = `buttonShort ${isShortSelected ? 'buttonShortSelected' : ''}`;

    const [price, setPrice] = useState(''); // Estado para el campo de precio
    const [ordertype, setOrdertype] = useState(''); // Estado para el menú desplegable

    const handlePriceChange = (e) => {
        setPrice(e.target.value); // Actualiza el estado del campo de precio
    };

    const handleOrdertypeChange = (e) => {
        setOrdertype(e.target.value); // Actualiza el estado del menú desplegable
    };


    return (
        <div className="container2">
            <div className="column2">
                <h2>{xdcprice}</h2>
                <TradingViewChart />
            </div>
            <div className="column2">
                <button className={buttonLongClassName} onClick={handleLongClick}>
                    Long
                </button>
                <button className={buttonShortClassName} onClick={handleShortClick}>
                    Short
                </button>
                {displayLongInfo && (
                    <div>
                        <div className="column2">
                            <label htmlFor="price">Price </label>
                            <label htmlFor="ordertype"> Ordertype</label>
                        </div>

                        <div className="column2">
                            
                            <input type="number" id="price" value={price} onChange={handlePriceChange} />
                            <select id="ordertype" value={ordertype} onChange={handleOrdertypeChange}>
                                <option value="Market">Market</option>
                                <option value="Limit">Limit</option>
                                <option value="StopLossLimit">Stop Loss Limit</option>
                            </select>
                        </div>
                        <p>Amount</p>
                        <p>Buying power</p>
                        <p>Summary</p>
                        <p>Entry Price</p>
                        <p>Trading Fee</p>
                        <p>Price Impact</p>
                        <button className="buttonLong">Confirm</button>
                    </div>
                )}
                {displayShortInfo && (
                    <div>
                        <p>Price</p>
                        <p>Ordertype</p>
                        <p>Amount</p>
                        <p>Buying power</p>
                        <p>Summary</p>
                        <p>Entry Price</p>
                        <p>Trading Fee</p>
                        <p>Price Impact</p>
                        <button className="buttonShort">Confirm</button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Trade;