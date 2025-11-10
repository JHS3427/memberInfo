import { useEffect, useState } from 'react';

import { TravelFood } from "./TravelFood.jsx";

import { getTravelFoodList } from '../../feature/travel/travelFoodAPI.js';

export function TravelFoodList({ handleListDetail }) {
    const [travelFoodList, setTravelFoodList] = useState([]);
    const [number, setNumber] = useState(3);

    useEffect(() => {
        async function fetchFoodData() {
            const dataFood = await getTravelFoodList(number); 
            setTravelFoodList(dataFood); 
        }   
        fetchFoodData();
    }, [number]);

    const handleDetail = (type, fid = null) => {
        handleListDetail(type, fid);
    }

    return(
        <>
            {travelFoodList && travelFoodList.map((travelFood, idx) =>
                <TravelFood 
                    fid={travelFood.fid}
                    fname={travelFood.fname} 
                    flike={travelFood.flike} 
                    score={travelFood.score} 
                    evaluation={travelFood.evaluation} 
                    tag={travelFood.tag} 
                    image1={travelFood.image1} 
                    image2={travelFood.image2} 
                    image3={travelFood.image3} 
                    fullImage1={travelFood.fullImage1}
                    fullImage2={travelFood.fullImage2}
                    fullImage3={travelFood.fullImage3}
                    description={travelFood.description} 
                    handleDetail={handleDetail} 
                    type="food" 
                />
            )}  
        </>          
    );
}