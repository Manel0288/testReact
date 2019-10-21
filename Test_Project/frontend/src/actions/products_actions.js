import axios from 'axios'
import {FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, GET_ERRORS} from "./types";


export const fetchProducts = () => dispatch => {
    dispatch({
        type: FETCH_PRODUCTS_PENDING
    });
    console.log("Inside actions getting products")
    const token = localStorage.getItem('jwtToken');
    const tokenArr = token.split(' ');
    console.log(tokenArr)
    axios.get("/api/users/products", { headers: {"Authorization" : tokenArr[1]} }).then((res) =>{
        console.log(res)
        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    });
}
