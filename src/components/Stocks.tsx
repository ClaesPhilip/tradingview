import React, { FC } from 'react';
import { StocksData } from '../store/stockTypes';

interface StockProps {
    id: StocksData,
    name: StocksData,
    price: StocksData,
    symbol: StocksData,
    data: StocksData
}

const Stocks: FC<StockProps> = ({ id, name, price, symbol }) => {

  return(
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered" style={{marginBottom: 50}}>{name} - {name}</h1>
        <div className="level" style={{alignItems: 'flex-start'}}>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">{name}</p>
              
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">temp</p>
              <div className="title">
                <p className="mb-2">{id}K</p>
                {/* <p className="mb-2">{fahrenheit}<sup>&#8457;</sup></p> */}
                {/* <p>{celsius}<sup>&#8451;</sup></p> */}
              </div>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">humidity</p>
              <p className="title">{price}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">pressure</p>
              <p className="title">{symbol}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">wind</p>
              <p className="title">{price} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stocks;