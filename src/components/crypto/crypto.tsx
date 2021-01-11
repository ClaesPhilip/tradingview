import React from 'react';
import { Link } from 'react-router-dom';

import './Crypto.css';

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const Cryptocurrency: React.FC = () => {
  const [cryptos, setCryptos]: [ICrypto[], (posts: ICrypto[]) => void] = React.useState(defaultProps);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");
  const [search, setSearch]: [string, (search: string) => void] = React.useState("");

  React.useEffect(() => {
    axios
      .get<ICrypto[]>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=sek&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d")
      .then(response => {
        setCryptos(response.data);
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

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
      maxWidth: 1300,
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "30px",
      marginBottom: "30px",
    },
  });

  const classes = useStyles();

  return (
  <div className="japp">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <p className="crypto-matches">100 matches</p>
            <input className="" placeholder='Search' type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Cymbol</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Volume</TableCell>
            <TableCell align="right">Market cap</TableCell>
            <TableCell align="right">24h</TableCell>
            <TableCell align="right">7d</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cryptos.map((cryptos) => {
            if (search === "" || cryptos.name.toLowerCase().includes(search.toLowerCase())) {
              return (
            <TableRow key={cryptos.id}>
              <TableCell component="th" scope="row">
                <img src={cryptos.image} alt="image" />
                <Link to={`/crypto/${cryptos.id}`}>{cryptos.name.toLocaleUpperCase()}</Link>
              </TableCell>
              <TableCell align="right">{cryptos.symbol.toLocaleUpperCase()}</TableCell>
              <TableCell align="right">{cryptos.current_price} SEK</TableCell>
              <TableCell align="right">{cryptos.total_volume} SEK</TableCell>
              <TableCell align="right">{cryptos.market_cap} SEK</TableCell>
              <TableCell align="right">{cryptos.price_change_percentage_24h} %</TableCell>
              <TableCell align="right">{cryptos.price_change_percentage_7d_in_currency} %</TableCell>
            </TableRow>
          )}})}
        </TableBody>
        {error && <p className="error">{error}</p>}
      </Table>
    </TableContainer>
  </div>
  )
}

export default Cryptocurrency;






