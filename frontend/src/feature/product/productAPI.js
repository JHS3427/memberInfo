import React from 'react';
import { createProduct, setProduct } from './productSlice.js';
import { axiosData } from '../../utils/dataFetch.js';

export const getProduct = (category,pid) => async(dispatch) => {
    const jsonData = await axiosData(`/data/${category}/${category}Data.json`);

    const foundProduct = jsonData.find(item => item.pid.toString() === pid.toString());

    dispatch(setProduct(foundProduct));
}

export const getProductList = (category) => async(dispatch) => {
    const jsonData = await axiosData(`/data/${category}/${category}Data.json`);
    return dispatch(createProduct({"products":jsonData}));
}
export const getStore = (sid) => async(dispatch) => {
    const jsonData = await axiosData("/data/productLocation.json");

    dispatch(setProduct(jsonData));
}