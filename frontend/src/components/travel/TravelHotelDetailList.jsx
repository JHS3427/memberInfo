import { useEffect, useState } from 'react';

import { TravelHotelDetail } from "./TravelHotelDetail.jsx";

import { getTravelHotelDetailList } from '../../feature/travel/travelHotelAPI.js';
import { getTravelSaveList, updateTravelSaveList } from '../../feature/travel/travelSaveAPI.js';

export function TravelHotelDetailList({ selectedDid }) {
    const [travelHotelDetailList, setTravelHotelDetailList] = useState([]);
    const [travelSaveList, setTravelSaveList] = useState([]);

    const loginInfoString = localStorage.getItem("loginInfo");
    const loginInfo = JSON.parse(loginInfoString);
    const uid = loginInfo.userId;
    
    useEffect(() => {
      async function fetchDetailData() {
        const dataDetail = await getTravelHotelDetailList(selectedDid);
        setTravelHotelDetailList(dataDetail);
      }
      fetchDetailData();
    }, []);

    useEffect(() => {
      async function fetchSaveData() {
        const dataSave = await getTravelSaveList(uid);
        setTravelSaveList(dataSave);
      }
      fetchSaveData();
    }, []);

    const handleLikeUpdate = async (uid, newHid) => {
        const hid = JSON.stringify(newHid);
        const dataSave = await updateTravelSaveList(uid, hid, "hotel");
        setTravelSaveList(dataSave);
    }

    return(
        <>
            {travelHotelDetailList &&
                    <TravelHotelDetail
                        did={travelHotelDetailList.did}
                        uid = {uid}
                        hname={travelHotelDetailList.hname}
                        hlike={travelHotelDetailList.hlike}
                        score={travelHotelDetailList.score}
                        tag={travelHotelDetailList.tag}
                        location={travelHotelDetailList.location}
                        hotel={travelHotelDetailList.hotel}
                        address={travelHotelDetailList.address}
                        localAddress={travelHotelDetailList.localAddress}
                        business={travelHotelDetailList.business}
                        phone={travelHotelDetailList.phone}
                        other={travelHotelDetailList.other}
                        menu={travelHotelDetailList.menu}
                        mainImages={travelHotelDetailList.mainImages}
                        imageList={travelHotelDetailList.imageList}
                        review = {travelHotelDetailList.review}
                        save = {travelSaveList.hid}
                        handleLikeUpdate = {handleLikeUpdate}
                    />
            }  
        </>          
    );
}