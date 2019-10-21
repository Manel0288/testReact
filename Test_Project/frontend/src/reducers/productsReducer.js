import { FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS } from '../actions/types';

const initialState = {
    pending: false,
    products: []
}

export default function(state = initialState, action){
    switch(action.type) {
        case FETCH_PRODUCTS_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                products: action.payload
            }
        default:
            return state;
    }
}

// export const getProducts = state => state.products;
// export const getProductsPending = state => state.pending;
// export const getProductsError = state => state.error;