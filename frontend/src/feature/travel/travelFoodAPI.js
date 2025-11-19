import React from "react";
import { createFood } from "./travelFoodSlice.js";
import { axiosData, groupByRows, axiosGet, axiosPost } from "../../utils/dataFetch.js";

//export const getTravelFoodList = async (number) => {
//    const url = "/travel/food";
//    const jsonData = await axiosGet(url);
//
//    createFood({"travelFood":jsonData});
////    dispatch();
//    return jsonData;
//}

export const getTravelFoodList = (number) => async(dispatch) =>{
    const url = "/travel/food";
    const jsonData = await axiosGet(url);

    dispatch(createFood({"travelFoodList":jsonData}));
}

export const getTravelFoodDetailList = async (did) => {
    const url = "/travel/foodDetail";
    const jsonData = await axiosPost(url, {"did":did});

    return jsonData;
}
