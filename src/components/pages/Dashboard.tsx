import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../UI/Message';
import { setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';

import '../../css/Dashboard.css';

import axios from "axios";

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

const Dashboard: React.FC = () => {
  const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [crypto, setCryptos]: [ICrypto[], (posts: ICrypto[]) => void] = React.useState(defaultProps);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");
  const [search, setSearch]: [string, (search: string) => void] = React.useState("");
  
  useEffect(() => {
    if(success) {
      dispatch(setSuccess(''));
    }
  }, [success, dispatch]);

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
    <div className='dashboard-home'>
      
    {needVerification && <Message type="success" msg="Please verify your email address." />}
      <h1 className="is-size-1">Welcome {user?.firstName}</h1>
        <Link to='/test'>TEST ME</Link>

        {/* <div className="container"> */}
          <h1 className='coin-text'>Search a currency</h1>
              <input className='coin-input' placeholder='Search' type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <div className="coin-container">
                  <ul className="">
                    {crypto.map((crypto) => {
                    if (search === "" || crypto.name.toLowerCase().includes(search.toLowerCase())) {
                      return (
                        <li className="coin-items" key={crypto.id}>
                          <img src={crypto.image} alt="image" />
                          <h3>{crypto.id}</h3>
                          <p className=''>{crypto.symbol}</p>
                          <p className=''>{crypto.current_price} SEK</p>
                        </li>
                    );}})}
                  </ul>
                </div>
        {/* </div> */}
      {error && <p className="error">{error}</p>}
  </div>
  )
}

export default Dashboard;





























// const options: any = {
//   method: 'GET',
//   url: 'https://coingecko.p.rapidapi.com/coins/markets',
//   params: {vs_currency: 'usd', page: '1', per_page: '100', order: 'market_cap_desc'},
//   headers: {
//     'x-rapidapi-key': '3ac8d4ae88msh5e51fe37d8246cbp1d1d55jsnaf860dc19453',
//     'x-rapidapi-host': 'coingecko.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// const Dashboard: FC = () => {
//   const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if(success) {
//       dispatch(setSuccess(''));
//     }
//   }, [success, dispatch]);


//   return(
//     <section className="section">
//       <div className="container">
//         {needVerification && <Message type="success" msg="Please verify your email address." />}
//         <h1 className="is-size-1">Welcome {user?.firstName}</h1>
//         <Link to='/test'>TEST ME</Link>
        
//       </div>
//     </section>
//   );
// }

// export default Dashboard;