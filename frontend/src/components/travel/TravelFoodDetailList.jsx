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
                        business={travelFoodDetailList.business}
                        phone={travelFoodDetailList.phone}
                        other={travelFoodDetailList.other}
                        menu={travelFoodDetailList.menu}
                        mainImages={travelFoodDetailList.mainImages}
                        imageList={travelFoodDetailList.imageList}
                        review = {travelFoodDetailList.review}                        
                    />
            }  
        </>          
    );
}