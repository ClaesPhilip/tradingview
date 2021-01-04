export const GET_STOCKS = "GET_STOCKS";
export const SET_ALERT = 'SET_ALERT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export interface StocksData {
    id: string;
    name: string;
    current_price: number;
    symbol: string;
    image: string;
    market_cap: number;
    price_change_percentage_24h: number;
    total_volume: number;
}

export interface StocksState {
    data: StocksData | null;
    loading: boolean;
    error: string;
}

export interface StocksError {
    cod: string;
    message: string;
  }

interface GetStocksAction {
    type: typeof GET_STOCKS;
    payload: StocksData;
}

export interface AlertAction {
  type: typeof SET_ALERT;
  payload: string;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
  }

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

export interface AlertState {
  message: string;
}

export type StocksAction = GetStocksAction | SetLoadingAction | SetErrorAction;