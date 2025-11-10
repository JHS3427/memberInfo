import React from "react";
import { axiosGet } from "../../utils/dataFetch.js";

export const getTravelRepairList = async (number) => {
        const url = "/travel/repair"; //DB 경우
//         console.log("url => ", url);
        const jsonData = await axiosGet(url);
//         console.log("json => ", jsonData);

        return jsonData;
}

