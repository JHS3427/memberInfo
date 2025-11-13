import { useEffect, useState } from 'react';

import { TravelHotel } from "./TravelHotel.jsx";

import { getTravelHotelList } from '../../feature/travel/travelHotelAPI.js';

export function TravelHotelList({ handleListDetail }) {
    const [travelHotelList, setTravelHotelList] = useState([]);
    const [filteredList, setFilteredList] = useState([]); //검색 데이터
    const [number, setNumber] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        async function fetchHotelData() {
            const dataHotel = await getTravelHotelList(number);
            setTravelHotelList(dataHotel);
            setFilteredList(dataHotel);
        }
        fetchHotelData();
    }, [number]);

    const handleDetail = (type, hid = null) => {
        handleListDetail(type, hid);
    }

    const handleSearch = () => {
        if (!searchKeyword.trim()) {
            setFilteredList(travelHotelList);
            return;
        }

        const filtered = travelHotelList.filter(hotel => {
            const nameMatch = hotel.hname.toLowerCase().includes(searchKeyword.toLowerCase());
            const tagArray = hotel.tag ? JSON.parse(hotel.tag) : [];
            const tagMatch = tagArray.some(tagItem =>
                tagItem.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            return nameMatch || tagMatch;
        });

        setFilteredList(filtered);
    };

    return(
    <div className="travel-hotel-container">
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

          <ul className="travel-hotel-list">
              {filteredList && filteredList.length > 0 ? (
                filteredList && filteredList.map((travelHotel, idx) =>
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
                )
             ) : (
               <li className="no-results">검색 결과가 없습니다.</li>
             )}
          </ul>
    </div>
    );
}