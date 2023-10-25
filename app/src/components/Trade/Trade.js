import React, { useState } from 'react';
import TradingViewChart from '../Chart/chart';

function Trade() {
    const [count, setCount] = useState(0);
    const [xdcprice, setXdcprice] = useState("");
    const [marketSelected, setMarketSelected] = useState(true);

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
                setXdcprice(data.price);
                if (marketSelected) {
                    setPrice(data.price);
                }
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
        const selectedOrdertype = e.target.value;
        setOrdertype(selectedOrdertype); // Actualiza el estado del menú desplegable

        // Si la opción seleccionada es "Market," deshabilita el campo de precio
        if (selectedOrdertype === 'Market') {
            setMarketSelected(true);
        } else {
            setMarketSelected(false);
        }
    };

    const [amountXDC, setAmountXDC] = useState(''); // Estado para el campo de precio
    const [amountUSDT, setAmountUSDT] = useState(''); // Estado para el campo de precio

    const handleAmountXDCChange = (e) => {
        setAmountXDC(e.target.value); // Actualiza el estado del campo de precio
        setAmountUSDT(e.target.value / xdcprice)
    };

    const handleAmountUSDTChange = (e) => {
        setAmountUSDT(e.target.value); // Actualiza el estado del menú desplegable
        setAmountXDC(e.target.value * xdcprice);
    };

    const [sliderValue, setSliderValue] = useState(1);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
      };

    return (
        <>
        <div className="container2">
            <div className="column2">
                <h2>Current Price: {xdcprice} XDC/USDT</h2>
                <TradingViewChart />
            </div>
            <div className="column2">
                <button className={buttonLongClassName} onClick={handleLongClick}>Long</button>
                <button className={buttonShortClassName} onClick={handleShortClick}>Short</button>
                {displayLongInfo && (
                    <div>
                        <div className="column">
                            <label htmlFor="price">Price </label>
                            <label htmlFor="ordertype"> Ordertype</label>
                        </div>

                        <div className="column">
                            <input type="number" id="price" value={price} disabled={marketSelected} onChange={handlePriceChange} />
                            <select id="ordertype" value={ordertype} onChange={handleOrdertypeChange}>
                                <option value="Market">Market</option>
                                <option value="Limit">Limit</option>
                            </select>
                        </div>
                        <div className="column">
                            <p>Amount</p>
                            XDC <input type="number" id="amountXDC" value={amountXDC} onChange={handleAmountXDCChange} />
                            <p></p>
                            USDT <input type="number" id="amountUSDT" value={amountUSDT} onChange={handleAmountUSDTChange} />
                        </div>
                        <p>Leverage: 
                        
                        <input type="range" id="slider" min="1" max="15" step="1" value={sliderValue}
                            onChange={handleSliderChange} />
                        {sliderValue}
                        </p>
                        <p>Summary</p>
                        <p>Entry Price: {price}</p>
                        <p>Trading Fee: {amountUSDT * 0.01}</p>
                        <button className="buttonLong">Confirm</button>
                    </div>
                )}
                {displayShortInfo && (
                    <div>

                        <button className="buttonShort">Confirm</button>
                    </div>
                )}

            </div>

        </div>
        <div className="openPositions">
                Open Positions
                <div>
                <button className="buttonClosePosition">Close Position</button>
                </div>
                
            </div>
        </>
    );
}

export default Trade;