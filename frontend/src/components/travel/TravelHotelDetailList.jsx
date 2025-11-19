import { useEffect, useState } from 'react';

import { TravelHotelDetail } from "./TravelHotelDetail.jsx";

import { getTravelHotelDetailList } from '../../feature/travel/travelHotelAPI.js';

export function TravelHotelDetailList({ selectedDid }) {
      
    const [travelHotelDetailList, setTravelHotelDetailList] = useState([]);
    const [number, setNumber] = useState(3);
    
    useEffect(() => {
      async function fetchDetailData() {
        const dataDetail = await getTravelHotelDetailList(selectedDid);
           console.log(dataDetail);
        setTravelHotelDetailList(dataDetail);
      }
      fetchDetailData();
    }, []);
    console.log(travelHotelDetailList);

    return(
        <>
            {travelHotelDetailList &&
                    <TravelHotelDetail
                        did={travelHotelDetailList.did}
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
                    />
            }  
        </>          
    );
}