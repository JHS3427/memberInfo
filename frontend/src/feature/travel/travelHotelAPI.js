import React from "react";
import { createMenu } from "./travelHotelSlice.js";
import { axiosData, groupByRows, axiosGet } from "../../utils/dataFetch.js";

export const getTravelHotelList = async (number) => {
        const url = "/travel/hotel"; //DB 경우
//         console.log("url => ", url);
        const jsonData = await axiosGet(url);
//         console.log("json => ", jsonData);

        return jsonData;
}

