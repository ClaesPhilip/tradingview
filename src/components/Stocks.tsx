// import React from 'react';

// type StockProps = {
//     name: string,
//     price: number,
//     image?: string,
//     priceChange?: number | undefined,
//     symbol?: string,
//     volume?: { toLocaleString: () => number; },
// }

// export const Stocks: any ({name, price, image, priceChange, symbol, volume}: StockProps) => {
//     return (
//         <div className="stocks-container">
//             <div className="stocks-row">
//                 <div className="stocks">
//                     <img src={image} alt="stock-image"/>
//                         <h1>{Stocks.name}</h1>
//                         <p className="stocks-symbol">{symbol}</p>
//                 </div>
//                 <div className="stocks-data">
//                     <p className="stocks-price">${price}</p>
//                     <p className="stocks-volume">${volume}</p>
//                     {Stocks.priceChange < 0 ? (
//                         <p className="stock-percent red">{priceChange}%</p>
//                     ) : (<p className="stock-percent green">{priceChange}%</p>)
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Stocks;


import React, { FunctionComponent } from 'react'; // we need this to make JSX compile

type StockProps = {
    name: string,
    current_price: number,
    image?: string,
    priceChange: number,
    symbol?: string,
    volume?: { toLocaleString: () => number; },
}

export const Stocks: FunctionComponent<StockProps> = ({ name, current_price, image, priceChange, symbol, volume}) => 
        <div className="stocks-container">
             <div className="stocks-row">
                 <div className="stocks">
                     <img src={image} alt="stock-image"/>
                         <h1>{name}</h1>
                         <p className="stocks-symbol">{symbol}</p>
                 </div>
                 <div className="stocks-data">
                     <p className="stocks-price">{current_price}</p>
                     <p className="stocks-volume">${volume}</p>
                     {priceChange < 0 ? (
                         <p className="stock-percent red">{priceChange}%</p>
                     ) : (<p className="stock-percent green">{priceChange}%</p>)
                     }
                 </div>
            </div>
        </div>

// export default Stocks;

// const el = <Stocks title="Welcome!" paragraph="To this example" />