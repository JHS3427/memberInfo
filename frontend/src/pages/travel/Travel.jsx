import { useEffect, useState, useRef } from 'react';

import { TravelMenuList } from "../../components/travel/TravelMenuList.jsx";
import { TravelFoodList } from "../../components/travel/TravelFoodList.jsx";
import { TravelHotelList } from "../../components/travel/TravelHotelList.jsx";
import { TravelRepairList } from "../../components/travel/TravelRepairList.jsx";
import { TravelFoodDetailList } from "../../components/travel/TravelFoodDetailList.jsx";
import { TravelDetail } from "../../components/travel/TravelFoodDetail.jsx";
import Map from './Map.jsx';


// import { getTravelHotelDetailList } from '../feature/travel/travelHotelAPI.js';

export function Travel() {

    // 버튼들 보이기/숨기기 상태 관리
    const [showMenus, setShowMenus] = useState(false);
    const [showFoods, setShowFoods] = useState(false);
    const [showHotels, setShowHotels] = useState(false);
    const [showRepairs, setShowRepairs] = useState(false);
    const [selectedDid, setSelectedDid] = useState(null); //클릭된 did 저장

    const handleMenuClick = (type) => {
        const travel_left_menus = document.querySelector('.travel-left-menus');
        const travel_left_detail = document.querySelector('.travel-left-detail');

        // 마커 클릭 시 버튼 출력
        if(type === "coord"){
          setShowMenus(true);
          travel_left_menus.style.top = "0";
        }

        // 타입에 맞는 정보 출력
        if(type === "food") {
          setShowFoods(true);
          setShowHotels(false);
          setShowRepairs(false);
          travel_left_detail.style.left = "0";
        }else if(type === "hotel"){
          setShowFoods(false);
          setShowHotels(true);
          setShowRepairs(false);
          travel_left_detail.style.left = "0";
        }
        else if(type === "repair"){
          setShowFoods(false);
          setShowHotels(false);
          setShowRepairs(true);
          travel_left_detail.style.left = "0";
        }

    }

    const handleListDetail = (type, did) => {
      const detail_back = document.getElementById("travel_detail_back");
      const detail = document.getElementById("travel_detail");

      // 상세 정보창 출력
      if(detail && type === "food" || type === "hotel") {
        if (did) {
          setSelectedDid(did);
        }
        detail_back.style.display = "block";
        detail.style.display = "block";
      }

      // 상세 정보창 닫기
      if(detail && type === "close"){
        detail_back.style.display = "none";
        detail.style.display = "none";
        setSelectedDid(null);
      }

    }

    const handleMapGoBack = () => {
      const travel_left_detail = document.querySelector(".travel-left-detail");
      if(travel_left_detail) {
        travel_left_detail.style.left = "-40rem";
      }
    }   

    return(
        <div className="content">
            <div className="center-layout travel-form">
                <div className="travel-left">
                    <nav className="travel-left-menus">
                        {/* showMenus가 true일 때만 버튼 보이기 */}
                        {showMenus && (
                          <TravelMenuList handleMenuClick={handleMenuClick}/>
                        )}
                    </nav>
                    <div className="travel-left-detail">
                        {/* showFoods, showHotels가 true일 때만 버튼 보이기 */}
                        {showFoods && (
                          <ul className='food-list'>  
                            <TravelFoodList handleListDetail={handleListDetail}/>                                                                       
                          </ul>
                        )}
                        {showHotels && (
                          <ul className='hotel-list'>
                            <TravelHotelList handleListDetail={handleListDetail}/> 
                          </ul>
                        )}
                        {showRepairs && (
                          <ul className='repair-list'>
                            <TravelRepairList handleListDetail={handleListDetail}/> 
                          </ul>
                        )}
                    </div>
                </div>
                <div className="travel-map">
                    <Map handleMenuClick={handleMenuClick} handleMapGoBack={handleMapGoBack}/>
                </div>
                <div id="travel_detail_back" className="travel-detail-back" />
                <div id="travel_detail" className="travel-detail">
                  {showFoods && selectedDid && (
                    <>
                      <li className="detail-close-box"><button className="detail-close-button" onClick={() => handleListDetail("close")}><i class="fa-solid fa-xmark"></i></button></li> 
                      <div> 
                        <TravelFoodDetailList selectedDid={selectedDid}/>          
                      </div>  
                    </> 
                  )}
                </div>                
            </div>
        </div>
    );
}