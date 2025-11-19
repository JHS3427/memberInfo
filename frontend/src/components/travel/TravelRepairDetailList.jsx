import { useEffect, useState } from 'react';

import { TravelRepairDetail } from "./TravelRepairDetail.jsx";

import { getTravelRepairDetailList } from '../../feature/travel/travelRepairAPI.js';

export function TravelRepairDetailList({ selectedDid }) {
      
    const [travelRepairDetailList, setTravelRepairDetailList] = useState([]);
    const [number, setNumber] = useState(3);
    
    useEffect(() => {
      async function fetchDetailData() {
        const dataDetail = await getTravelRepairDetailList(selectedDid);
           console.log(dataDetail);
        setTravelRepairDetailList(dataDetail);
      }
      fetchDetailData();
    }, []);
    console.log(travelRepairDetailList);

    return(
        <>
            {travelRepairDetailList &&
                    <TravelRepairDetail
                        did={travelRepairDetailList.did}
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
                    />
            }  
        </>          
    );
}