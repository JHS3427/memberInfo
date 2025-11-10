import { useEffect, useState } from 'react';

import { TravelRepair } from "./TravelRepair.jsx";

import { getTravelRepairList } from '../../feature/travel/travelRepairAPI.js';

export function TravelRepairList({ handleListDetail }) {
    const [travelRepairList, setTravelRepairList] = useState([]);
    const [number, setNumber] = useState(3);

    useEffect(() => {
        async function fetchRepairData() {
            const dataRepair = await getTravelRepairList(number);
            setTravelRepairList(dataRepair);
        }
        fetchRepairData();
    }, [number]);

    const handleDetail = (type, rid = null) => {
        handleListDetail(type, rid);
    }

    return(
        <>
            {travelRepairList && travelRepairList.map((travelRepair, idx) =>
                <TravelRepair 
                    rid={travelRepair.rid}
                    rname={travelRepair.rname}
                    rlike={travelRepair.rlike}
                    score={travelRepair.score}
                    evaluation={travelRepair.evaluation}
                    tag={travelRepair.tag}
                    image1={travelRepair.image1}
                    image2={travelRepair.image2}
                    image3={travelRepair.image3}
                    fullImage1={travelRepair.fullImage1}
                    fullImage2={travelRepair.fullImage2}
                    fullImage3={travelRepair.fullImage3}
                    description={travelRepair.description}
                    handleDetail={handleDetail}
                    type="Repair" 
                />
            )}  
        </>          
    );
}