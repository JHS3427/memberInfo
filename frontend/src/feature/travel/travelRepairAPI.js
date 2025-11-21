import React from "react";
import { createRepair } from "./travelRepairSlice.js";
import { axiosGet, axiosPost } from "../../utils/dataFetch.js";

export const getTravelRepairList = (number) => async(dispatch) =>{
    const url = "/travel/repair";
    const jsonData = await axiosGet(url);

    dispatch(createRepair({"travelRepairList":jsonData}));
}

export const getTravelRepairDetailList = async (did) => {
    const url = "/travel/repairDetail"; //DB 경우
//    console.log("url => ", url);
    const jsonData = await axiosPost(url, {"did":did});
    console.log("json => ", jsonData);

    return jsonData;
}

