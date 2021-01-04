import { StocksState, StocksAction, GET_STOCKS } from '../stockTypes';

const initialState: StocksState = {
    data: null,
    loading: false,
    error: ''
}

export default (state = initialState, action: StocksAction): StocksState => {
    switch(action.type) {
        case GET_STOCKS:
            return {
                data: action.payload,
                loading: false,
                error: ''
            }
        default: 
            return state;
        }  
    }