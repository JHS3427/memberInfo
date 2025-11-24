import { useEffect, useState } from 'react';

import { TravelRepairDetail } from "./TravelRepairDetail.jsx";

import { getTravelRepairDetailList } from '../../feature/travel/travelRepairAPI.js';
import { getTravelSaveList, updateTravelSaveList } from '../../feature/travel/travelSaveAPI.js';

export function TravelRepairDetailList({ selectedDid }) {
    const [travelRepairDetailList, setTravelRepairDetailList] = useState([]);
    const [travelSaveList, setTravelSaveList] = useState([]);

    const loginInfoString = localStorage.getItem("loginInfo");
    const loginInfo = JSON.parse(loginInfoString);
    const uid = loginInfo.userId;

    useEffect(() => {
      async function fetchDetailData() {
        const dataDetail = await getTravelRepairDetailList(selectedDid);
        setTravelRepairDetailList(dataDetail);
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

    const handleLikeUpdate = async (uid, newRid) => {
        const rid = JSON.stringify(newRid);
        const dataSave = await updateTravelSaveList(uid, rid, "repair");
        setTravelSaveList(dataSave);
    }

    return(
        <>
            {travelRepairDetailList &&
                    <TravelRepairDetail
                        did={travelRepairDetailList.did}
                        uid = {uid}
                        rname={travelRepairDetailList.rname}
                        rlike={travelRepairDetailList.rlike}
                        score={travelRepairDetailList.score}
                        tag={travelRepairDetailList.tag}
                        location={travelRepairDetailList.location}
                        repair={travelRepairDetailList.repair}
                        address={travelRepairDetailList.address}
                        localAddress={travelRepairDetailList.localAddress}
                        business={travelRepairDetailList.business}
                        phone={travelRepairDetailList.phone}
                        other={travelRepairDetailList.other}
                        menu={travelRepairDetailList.menu}
                        mainImages={travelRepairDetailList.mainImages}
                        imageList={travelRepairDetailList.imageList}
                        review = {travelRepairDetailList.review}
                        save = {travelSaveList.rid}
                        handleLikeUpdate = {handleLikeUpdate}
                    />
            }  
        </>          
    );
}