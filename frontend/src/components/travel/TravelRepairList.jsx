import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TravelRepair } from "./TravelRepair.jsx";

import { getTravelRepairList } from '../../feature/travel/travelRepairAPI.js';

export function TravelRepairList({ handleListDetail }) {
    const dispatch = useDispatch();

    const travelRepairList = useSelector((state) => state.travelRepair.travelRepairList); //원본 데이터
    const [filteredList, setFilteredList] = useState([]); //검색 데이터
    const [number, setNumber] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
           dispatch(getTravelRepairList(number));
    }, [number, dispatch]);

    useEffect(() => {
        setFilteredList(travelRepairList);
    }, [travelRepairList]);

    const handleDetail = (type, rid = null) => {
        handleListDetail(type, rid);
    }

    const handleSearch = () => {
        if (!searchKeyword.trim()) {
            setFilteredList(travelRepairList);
            return;
        }

        const filtered = travelRepairList.filter(repair => {
            const nameMatch = repair.rname.toLowerCase().includes(searchKeyword.toLowerCase());
            const tagArray = repair.tag ? JSON.parse(repair.tag) : [];
            const tagMatch = tagArray.some(tagItem =>
                tagItem.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            return nameMatch || tagMatch;
        });

        setFilteredList(filtered);
    };

    return(
        <div className="travel-repair-container">
            <div className="search-box">
              <li className="search-input-back">
                  <input
                    type="text"
                    placeholder="정비소 이름을 입력하세요"
                    className="search-input"
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  <button className="search-button" onClick={handleSearch}>
                      <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
              </li>
            </div>

            <ul className="travel-repair-list">
               {filteredList && filteredList.length > 0 ? (
                  filteredList && filteredList.map((travelRepair, idx) =>
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
                          type="repair"
                      />
                  )
               ) : (
                 <li className="no-results">검색 결과가 없습니다.</li>
               )}
            </ul>
        </div>
    );
}