import React from 'react';
import { addCartItem, updateCartCount,
    showCartItem, updateTotalPrice,
    updateCartItem, removeCartItem } from './cartSlice.js';
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
    const [mountainData, roadData,lifeStyleData,electricData] = await Promise.all([
        axiosData("/data/mountain/mountainData.json"),
        axiosData("/data/road/roadData.json"),
        axiosData("/data/lifestyle/lifeStyleData.json"),
        axiosData("/data/electric/electricData.json")
    ]);

    // 2. (수정) 받아온 모든 데이터를 하나의 '전체' 배열로 합칩니다.
    const allProducts = [...mountainData, ...roadData, ...lifeStyleData, ...electricData]; // (lifestyleData 등도 추가)

    // 3. '전체' 배열을 리듀서로 보냅니다.
    dispatch(showCartItem({"items": allProducts}));
    dispatch(updateTotalPrice());
}

export const addCart = (pid) => async (dispatch) => {
    dispatch(addCartItem({"cartItem":{"pid":pid, "qty":1}}));
    dispatch(updateCartCount());
}