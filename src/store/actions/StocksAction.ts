import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { StocksAction, StocksData, GET_STOCKS, SET_LOADING, SET_ERROR, StocksError } from '../stockTypes';

export const getStocks = (name: string): ThunkAction<void, RootState, null, StocksAction> => {
  return async dispatch => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=sek&order=market_cap_desc&per_page=100&page=1&sparkline=false');

      if(!res.ok) {
        const resData: StocksError = await res.json();
        throw new Error(resData.message);
      }

      const resData: StocksData = await res.json();
      dispatch({
        type: GET_STOCKS,
        payload: resData
      });
    }catch(err) {
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}

export const setLoading = (): StocksAction => {
  return {
    type: SET_LOADING
  }
}

export const setError = (): StocksAction => {
  return {
    type: SET_ERROR,
    payload: ''
  }
}