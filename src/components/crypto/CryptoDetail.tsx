import React from 'react';

import './Crypto.scss';

import axios from 'axios';

export interface ICrypto {
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

const CryptoDetail: React.FC = () => {
  const [crypto, setCrypto]: [ICrypto[], (posts: ICrypto[]) => void] = React.useState(defaultProps);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  React.useEffect(() => {
    axios
      .get<ICrypto[]>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=sek&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d")
      .then(response => {
        setCrypto(response.data);
        setLoading(false);
        console.log(response.data);
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
    <div>
        {crypto.map((crypto) => {
        return (
            <div key={crypto.id}>
                <img src={crypto.image} alt="image" />
            </div>
        )})}
    </div>
  )
}

export default CryptoDetail;