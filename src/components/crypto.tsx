import React, { FC, useEffect } from 'react';

import '../css/Crypto.css';

import axios from 'axios';

interface ICrypto {
  userId: number;
  id: string;
  name: string;
  market_cap: number;
  current_price: number;
  image: string;
  total_volume: number;
  symbol: string;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: string;
}

const defaultProps:ICrypto[] = [];

const Cryptocurrency: React.FC = () => {
  const [crypto, setCryptos]: [ICrypto[], (posts: ICrypto[]) => void] = React.useState(defaultProps);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");
  const [search, setSearch]: [string, (search: string) => void] = React.useState("");
  const [show, toggleShow] = React.useState(true);

  React.useEffect(() => {
    axios
      .get<ICrypto[]>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d")
      .then(response => {
        setCryptos(response.data);
        setLoading(false);
      }).catch(ex => {
        const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <table className="content-table">    
      <tr className="crypto-search-header">
          <td>100 matchningar</td>
          <td><input placeholder='Search' type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input></td>
      </tr>
    <thead>
      <tr>
        <th>Coin</th>
        <th>Price</th>
        <th>Volume</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {crypto.map((crypto) => {
      if (search === "" || crypto.name.toLowerCase().includes(search.toLowerCase())) {
        return (
          <tr key={crypto.id} >
            <td className="crypto-image">
              <img src={crypto.image} alt="image" />
            </td>
            <td>{crypto.symbol.toLocaleUpperCase()}</td>
            <td>{crypto.id.toLocaleUpperCase()}</td>
            <td>{crypto.current_price} SEK</td>
          </tr>
      );}})}
    </tbody>
      {error && <p className="error">{error}</p>}
</table>
  )
}

export default Cryptocurrency;








