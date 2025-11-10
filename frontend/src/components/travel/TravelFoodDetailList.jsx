import { useEffect, useState } from 'react';

import { TravelFoodDetail } from "./TravelFoodDetail.jsx";

import { getTravelFoodDetailList } from '../../feature/travel/travelFoodAPI.js';

export function TravelFoodDetailList({ selectedDid }) {
      
    const [travelFoodDetailList, setTravelFoodDetailList] = useState([]);
    const [number, setNumber] = useState(3);
    
    useEffect(() => {
      async function fetchDetailData() {
        const dataDetail = await getTravelFoodDetailList(selectedDid); 
           console.log(dataDetail);
        setTravelFoodDetailList(dataDetail); 
      }
      fetchDetailData();
    }, []);
    console.log(travelFoodDetailList);

    return(
        <>
            {travelFoodDetailList && 
                    <TravelFoodDetail 
                        did={travelFoodDetailList.did}
                        fname={travelFoodDetailList.fname}
                        flike={travelFoodDetailList.flike}
                        tag={travelFoodDetailList.tag}
                        location={travelFoodDetailList.location}
                        food={travelFoodDetailList.food}
                        address={travelFoodDetailList.address}
                        localAddress={travelFoodDetailList.localAddress}
                        businessHouers={travelFoodDetailList.businessHouers} 
                        lastOrder={travelFoodDetailList.lastOrder}
                        phone={travelFoodDetailList.phone}
                        other={travelFoodDetailList.other}
                        menu={travelFoodDetailList.menu}
                        image1={travelFoodDetailList.image1}
                        image2={travelFoodDetailList.image2}
                        image3={travelFoodDetailList.image3}
                        review = {travelFoodDetailList.review}                        
                    />
            }  
        </>          
    );
}