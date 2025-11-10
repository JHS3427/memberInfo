import React from "react";
import { createMenu, createDetail } from "./travelFoodSlice.js";
import { axiosData, groupByRows, axiosGet, axiosPost } from "../../utils/dataFetch.js";

export const getTravelFoodList = async (number) => {
    const url = "/travel/food"; //DB 경우
    // console.log("url => ", url);
    const jsonData = await axiosGet(url);
    // console.log("json => ", jsonData);

    return jsonData;
}

export const getTravelFoodDetailList = async (did) => {
    const url = "/travel/foodDetail"; //DB 경우
//    console.log("url => ", url);
    const jsonData = await axiosPost(url, {"did":did});
//    console.log("json => ", jsonData);

    return jsonData;
}
