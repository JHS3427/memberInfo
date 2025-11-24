import React from "react";
import { createHotel } from "./travelHotelSlice.js";
import { axiosData, groupByRows, axiosGet, axiosPost } from "../../utils/dataFetch.js";

export const getTravelHotelList = (number) => async(dispatch) =>{
    const url = "/travel/hotel";
    const jsonData = await axiosGet(url);

    dispatch(createHotel({"travelHotelList":jsonData}));
}

export const getTravelHotelDetailList = async (did) => {
    const url = "/travel/hotelDetail";
    const jsonData = await axiosPost(url, {"did":did});

    return jsonData;
}

