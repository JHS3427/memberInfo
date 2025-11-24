import { useEffect, useState } from 'react';

import { TravelFoodDetail } from "./TravelFoodDetail.jsx";

import { getTravelFoodDetailList } from '../../feature/travel/travelFoodAPI.js';
import { getTravelSaveList, updateTravelSaveList } from '../../feature/travel/travelSaveAPI.js';

export function TravelFoodDetailList({ selectedDid }) {
    const [travelFoodDetailList, setTravelFoodDetailList] = useState([]);
    const [travelSaveList, setTravelSaveList] = useState([]);

    const loginInfoString = localStorage.getItem("loginInfo");
    const loginInfo = JSON.parse(loginInfoString);
    const uid = loginInfo.userId;
    
    useEffect(() => {
      async function fetchDetailData() {
        const dataDetail = await getTravelFoodDetailList(selectedDid);
        setTravelFoodDetailList(dataDetail); 
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

    const handleLikeUpdate = async (uid, newFid) => {
        const fid = JSON.stringify(newFid);

        const dataSave = await updateTravelSaveList(uid, fid, "food");
        console.log(dataSave);
        setTravelSaveList(dataSave);
    }

    return(
        <>
            {travelFoodDetailList && 
                    <TravelFoodDetail
                        did={travelFoodDetailList.did}
                        uid = {uid}
                        fname={travelFoodDetailList.fname}
                        flike={travelFoodDetailList.flike}
                        score={travelFoodDetailList.score}
                        tag={travelFoodDetailList.tag}
                        location={travelFoodDetailList.location}
                        food={travelFoodDetailList.food}
                        address={travelFoodDetailList.address}
                        localAddress={travelFoodDetailList.localAddress}
                        business={travelFoodDetailList.business}
                        phone={travelFoodDetailList.phone}
                        other={travelFoodDetailList.other}
                        menu={travelFoodDetailList.menu}
                        mainImages={travelFoodDetailList.mainImages}
                        imageList={travelFoodDetailList.imageList}
                        review = {travelFoodDetailList.review}
                        save = {travelSaveList.fid}
                        handleLikeUpdate = {handleLikeUpdate}
                    />
            }  
        </>          
    );
}