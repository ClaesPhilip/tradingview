import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Stocks from './Stocks';

// https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo

const Stocksen = () => {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=sek&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(res => {
      setStocks(res.data)
    }).catch(error => console.log(error))
  }, []);

  const handleChange = (e: any) => {
    setSearch(e.target.value)
  }

  const filteredStocks = stocks.filter(stocks => 
    stocks.name.toLowerCase().includes(search.toLocaleLowerCase())
  )

  return( 
        <div className="stocks-container">
          <div className="stocks-search">
            <h1 className="stocks-text">Search for stocks</h1>
              <form>
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="stocks-input"
                  onChange={handleChange}
                  />
              </form> 
          </div>
          {filteredStocks.map((Stocks: any) => {
            return ( 
            <Stocks
                key={Stocks.id}
                name={Stocks.name}
                current_price={Stocks.current_price}
                priceChange={Stocks.price_change_percentage_24h}
                volume={Stocks.market_cap}
                image={Stocks.image}
                symbol={Stocks.symbol}
            /> 
            );
           
          })}
        </div>
  );
}

export default Stocksen;