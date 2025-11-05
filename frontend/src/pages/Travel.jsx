import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from 'react';
import { TravelMenu } from "../components/commons/TravelMenu.jsx";
import { TravelFood } from "../components/commons/TravelFood.jsx";
import { TravelWalk } from "../components/commons/TravelWalk.jsx";
import { TravelDetail } from "../components/commons/TravelDetail.jsx";
import Map from '../components/commons/Map.jsx';
import { getTravelMenuList } from '../feature/travel/travelMenuAPI.js';
import { getTravelFoodList } from '../feature/travel/travelFoodAPI.js';
import { getTravelWalkList } from '../feature/travel/travelWalkAPI.js';
import { getTravelFoodDetailList } from '../feature/travel/travelFoodAPI.js';
// import { getTravelWalkDetailList } from '../feature/travel/travelWalkAPI.js';

export function Travel() {
    const dispatch = useDispatch();
    const travelMenuList = useSelector((state) => state.travelMenu.travelMenuList);
    // const travelFoodList = useSelector((state) => state.travelFood.travelFoodList);
    const travelWalkList = useSelector((state) => state.travelWalk.travelWalkList);
    const travelFoodDetailList = useSelector((state) => state.travelFood.travelFoodDetailList);
    // const travelWalkDetailList = useSelector((state) => state.travelWalkDetail.travelWalkDetailList);
 
    const [travelFoodList, setTravelFoodList] = useState([]);
    const [number, setNumber] = useState(3);

    useEffect(() => {
            dispatch(getTravelMenuList(number));
            // dispatch(getTravelFoodList(number));      
            dispatch(getTravelWalkList(number));
            dispatch(getTravelFoodDetailList(number));
            // dispatch(getTravelWalkDetailList(number));

            async function fetchData() {
              const data = await getTravelFoodList(number); 
              console.log(data); 
              setTravelFoodList(data); 
            }
            fetchData();
    }, [number]);

    console.log(travelFoodList);

    // 버튼들 보이기/숨기기 상태 관리
    const [showMenus, setShowMenus] = useState(false);
    const [showFoods, setShowFoods] = useState(false);
    const [showWalks, setShowWalks] = useState(false);
    const [selectedPid, setSelectedPid] = useState(null); //클릭된 pid 저장

    const handleClick = (type) => {
        const travel_left_menus = document.querySelector('.travel-left-menus');
        const travel_left_Detail = document.querySelector('.travel-left-detail');

        // 마커 클릭 시 버튼 출력
        if(type === "coord"){
          setShowMenus(true);
          travel_left_menus.style.top = "0";
        }

        // 타입에 맞는 정보 출력
        if(type === "food") {
          setShowFoods(true);
          setShowWalks(false);
          travel_left_Detail.style.left = "0";
        }else if(type === "walk"){
          setShowWalks(true);
          setShowFoods(false);
          travel_left_Detail.style.left = "0";
        }

    }

    const handleDetail = (type, pid = null) => {
      const detail_back = document.getElementById("travel_detail_back");
      const detail = document.getElementById("travel_detail");

      // 상세 정보창 출력
      if(detail && type === "food" || type === "walk") {
        if (pid) {
          setSelectedPid(pid);
        }
        detail_back.style.display = "block";
        detail.style.display = "block";
      }

      // 상세 정보창 닫기
      if(detail && type === "close"){
        detail_back.style.display = "none";
        detail.style.display = "none";
        setSelectedPid(null);
      }

    }

    //선택된 pid에 맞는 상세 데이터 찾기
    let selectedDetail;
    if (travelFoodDetailList) {
      const flatList = travelFoodDetailList.flat();  // 2차원 배열일 수도 있으니까 평탄화
      selectedDetail = flatList.find(item => item.pid === selectedPid);
    } else {
      selectedDetail = undefined; // travelFoodDetailList가 없으면 그냥 undefined
    }

    return(
        <div className="content">
            <div className="center-layout travel-form">
                <div className="travel-left">
                    <nav className="travel-left-menus">
                        {/* showMenus가 true일 때만 버튼 보이기 */}
                        {showMenus && (
                          <>
                            {travelMenuList && travelMenuList.map((rowArray, idx) =>
                                { return rowArray && rowArray.map((travelMenu, idx) =>
                                    <TravelMenu name={travelMenu.name} type={travelMenu.type} icon={travelMenu.icon} handleClick={handleClick} key={idx} />
                                )}
                            )}
                          </>
                        )}
                    </nav>
                    <div className="travel-left-detail">
                        {/* showFoods, showWalks가 true일 때만 버튼 보이기 */}
                        {showFoods && (
                          <ul className='food-list'>                            
                            {travelFoodList && travelFoodList.map((travelFood, idx) =>
                                    /** TravelFood를 TravelFoodList인 컴포넌트(<TravelFoodList>)를 생성하여 그 안에 넣어서 말하자면 한번 더 컴포넌트화 햇어야한다. 그래야 Travel.jsx도 보기 편하고 교체가 수월하다.  */
                                  <TravelFood 
                                              pid={travelFood.fid}
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
                                              type="food" />
                            )}                              
                          </ul>
                        )}
                        {showWalks && (
                          <ul className='walk-list'>
                            {travelWalkList && travelWalkList.map((rowArray, idx) =>
                                { return rowArray && rowArray.map((travelWalk, idx) =>          
                                  <TravelWalk pid={travelWalk.pid} name={travelWalk.name} like={travelWalk.like} distance={travelWalk.distance} image1={travelWalk.image1} image2={travelWalk.image2} image3={travelWalk.image3} description={travelWalk.description} handleDetail={handleDetail} type="walk" /> 
                               )}
                            )}    
                          </ul>
                        )}
                    </div>
                </div>
                <div className="travel-map">
                    <Map handleClick={handleClick} />                    
                </div>
                <div id="travel_detail_back" className="travel-detail-back" />
                <div id="travel_detail" className="travel-detail">
                  {showFoods && selectedDetail && (
                    <>
                      <li className="detail-close-box"><button className="detail-close-button" onClick={() => handleDetail("close")}><i class="fa-solid fa-xmark"></i></button></li> 
                      <div>              
                        <TravelDetail pid={selectedDetail.pid}
                                      image1={selectedDetail.image1}
                                      image2={selectedDetail.image2}
                                      image3={selectedDetail.image3}
                                      name={selectedDetail.name}
                                      location={selectedDetail.location}
                                      food={selectedDetail.food}
                                      like={selectedDetail.like}
                                      address={selectedDetail.address} 
                                      businessHouers={selectedDetail.businessHouers} 
                                      lastOrder={selectedDetail.lastOrder}
                                      phone={selectedDetail.phone}
                                      tag={selectedDetail.tag}
                                      other={selectedDetail.other}
                                      review = {selectedDetail.review}
                                      handleDetail={handleDetail} />
                      </div>  
                    </> 
                  )}
                </div>                
            </div>
        </div>
    );
}