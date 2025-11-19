import React from "react";
import { axiosGet, axiosPost } from "../../utils/dataFetch.js";

export const getTravelRepairList = async (number) => {
        const url = "/travel/repair"; //DB 경우
//         console.log("url => ", url);
        const jsonData = await axiosGet(url);
//         console.log("json => ", jsonData);

        return jsonData;
}

export const getTravelRepairDetailList = async (did) => {
    const url = "/travel/repairDetail"; //DB 경우
//    console.log("url => ", url);
    const jsonData = await axiosPost(url, {"did":did});
    console.log("json => ", jsonData);

    return jsonData;
}

