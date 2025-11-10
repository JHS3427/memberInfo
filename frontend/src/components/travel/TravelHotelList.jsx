import { useEffect, useState } from 'react';

import { TravelHotel } from "./TravelHotel.jsx";

import { getTravelHotelList } from '../../feature/travel/travelHotelAPI.js';

export function TravelHotelList({ handleListDetail }) {
    const [travelHotelList, setTravelHotelList] = useState([]);
    const [number, setNumber] = useState(3);

    useEffect(() => {
        async function fetchHotelData() {
            const dataHotel = await getTravelHotelList(number);
            setTravelHotelList(dataHotel);
        }
        fetchHotelData();
    }, [number]);

    const handleDetail = (type, hid = null) => {
        handleListDetail(type, hid);
    }

    return(
        <>
            {travelHotelList && travelHotelList.map((travelHotel, idx) =>
                <TravelHotel 
                    hid={travelHotel.hid}
                    hname={travelHotel.hname}
                    hlike={travelHotel.hlike}
                    score={travelHotel.score}
                    evaluation={travelHotel.evaluation}
                    tag={travelHotel.tag}
                    image1={travelHotel.image1}
                    image2={travelHotel.image2}
                    image3={travelHotel.image3}
                    fullImage1={travelHotel.fullImage1}
                    fullImage2={travelHotel.fullImage2}
                    fullImage3={travelHotel.fullImage3}
                    description={travelHotel.description}
                    handleDetail={handleDetail}
                    type="hotel" 
                />
            )}  
        </>          
    );
}