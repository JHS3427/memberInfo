import React from 'react';
import {
    addCartItem, updateCartCount,
    showCartItem, updateTotalPrice,
    updateCartItem, removeCartItem, checkCartItem, clearCart
} from './cartSlice.js';
import { axiosData } from '../../utils/dataFetch.js';

export const removeCart = (cid) => async(dispatch) => {
    dispatch(removeCartItem({"cid": cid}));
    dispatch(updateTotalPrice());
    dispatch(updateCartCount());
}

export const updateCart = (cid, type) => async (dispatch) => {
    dispatch(updateCartItem({"cid":cid, "type":type})); //수량변경
    dispatch(updateTotalPrice());
    dispatch(updateCartCount());
}


export const showCart = () => async (dispatch) => {
    const [mountainData, roadData, lifeStyleData, electricData] = await Promise.all([
        axiosData("/data/mountain/mountainData.json"),
        axiosData("/data/road/roadData.json"),
        axiosData("/data/lifestyle/lifeStyleData.json"),
        axiosData("/data/electric/electricData.json")
    ]);

    const allProducts = [...mountainData, ...roadData, ...lifeStyleData, ...electricData]; // (lifestyleData 등도 추가)

    dispatch(showCartItem({"items": allProducts}));
    dispatch(updateTotalPrice());
}

export const addCart = (pid, category) => async (dispatch) => {
    dispatch(addCartItem({"cartItem":{"pid":pid, "category":category, "qty":1}}));
    dispatch(updateCartCount());
}

export const checkItem = (cid) => async(dispatch) => {
    dispatch(checkCartItem({"cid":cid}));
    dispatch(updateTotalPrice());
}

// export const allClearCart = () => async(dispatch) => {
//
// }