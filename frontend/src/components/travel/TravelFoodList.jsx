import { useEffect, useState } from 'react';

import { TravelFood } from "./TravelFood.jsx";

import { getTravelFoodList } from '../../feature/travel/travelFoodAPI.js';

export function TravelFoodList({ handleListDetail }) {
    const [travelFoodList, setTravelFoodList] = useState([]); //원본 데이터
    const [filteredList, setFilteredList] = useState([]); //검색 데이터
    const [number, setNumber] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        async function fetchFoodData() {
            const dataFood = await getTravelFoodList(number); 
            setTravelFoodList(dataFood);
            setFilteredList(dataFood);
        }   
        fetchFoodData();
    }, [number]);

    const handleDetail = (type, fid = null) => {
        handleListDetail(type, fid);
    }

    const handleSearch = () => {
        if (!searchKeyword.trim()) {
            setFilteredList(travelFoodList);
            return;
        }

        const filtered = travelFoodList.filter(food => {
            const nameMatch = food.fname.toLowerCase().includes(searchKeyword.toLowerCase());
            const tagArray = food.tag ? JSON.parse(food.tag) : [];
            const tagMatch = tagArray.some(tagItem =>
                tagItem.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            return nameMatch || tagMatch;
        });

        setFilteredList(filtered);
    };

    return(
        <div className="travel-food-container">
              <div className="search-box">
                <li className="search-input-back">
                    <input
                      type="text"
                      placeholder="맛집 이름을 입력하세요"
                      className="search-input"
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </li>
              </div>

              <ul className="travel-food-list">
                 {filteredList && filteredList.length > 0 ? (
                    filteredList && filteredList.map((travelFood, idx) =>
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
                    )
                 ) : (
                   <li className="no-results">검색 결과가 없습니다.</li>
                 )}
              </ul>
        </div>
    );
}