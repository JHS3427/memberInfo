import React from "react";
import { createMenu, createDetail } from "./travelFoodSlice.js";
import { axiosData, groupByRows, axiosGet } from "../../utils/dataFetch.js";

export const getTravelFoodList = async (number) => {
    const url = "/travel/food"; //DB 경우
    console.log("url => ", url);
    const jsonData = await axiosGet(url);
    console.log("json => ", jsonData);

    return jsonData;
}

export const getTravelFoodDetailList = (number) => async(dispatch) => {
    const jsonData = await axiosData("/data/travelFoodDetails.json"); //비동기
    const rows = groupByRows(jsonData, number); //groupByRows()로 1차원인 jsonData를 2차원 배열로 변경한다 //dataFetch.js에 있음
    dispatch(createDetail({"travelFoodDetailList": rows, "travelFoodDetails": jsonData}));
}
