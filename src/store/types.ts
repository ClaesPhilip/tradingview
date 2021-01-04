export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';


export interface User {
    firstName: string;
    email: string;
    id: string;
    createdAt: any;
  }
  
  export interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    error: string;
    needVerification: boolean;
    success: string;
  }
  
  export interface SignUpData {
    firstName: string;
    email: string;
    password: string;
  }
  
  export interface SignInData {
    email: string;
    password: string;
  }
  
  // Actions
  interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
  }
  
  interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
  }
  
  interface SignOutAction {
    type: typeof SIGN_OUT;
  }
  
  interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
  }
  
  interface NeedVerificationAction {
    type: typeof NEED_VERIFICATION;
  }
  
  interface SetSuccessAction {
    type: typeof SET_SUCCESS;
    payload: string;
  }
  
  export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | NeedVerificationAction | SetSuccessAction;






// export const GET_STOCKS = "GET_STOCKS";
// export const SET_ALERT = 'SET_ALERT';

// export interface StocksData {
//     id: string;
//     name: string;
//     current_price: number;
//     symbol: string;
//     image: string;
//     market_cap: number;
//     price_change_percentage_24h: number;
//     total_volume: number;
// }

// export interface StocksState {
//     data: StocksData | null;
//     loading: boolean;
//     error: string;
// }

// interface GetStocksAction {
//     type: typeof GET_STOCKS;
//     payload: StocksData;
// }

// export interface AlertAction {
//   type: typeof SET_ALERT;
//   payload: string;
// }

// export interface AlertState {
//   message: string;
// }

// export type StocksAction = GetStocksAction;