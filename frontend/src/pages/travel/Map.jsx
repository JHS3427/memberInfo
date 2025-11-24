import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMarkerList } from '../../feature/travel/mapAPI.js';

function Map({ handleMenuClick, handleMapGoBack, handleListDetail, type, selectedDid }) {
  const dispatch = useDispatch();
  const travelFoodList = useSelector((state) => state.travelFood.travelFoodList);
  const travelHotelList = useSelector((state) => state.travelHotel.travelHotelList);
  const travelRepairList = useSelector((state) => state.travelRepair.travelRepairList);
//   const travelStoreList = useSelector((state) => state.travelStore.travelStoreList);

  const [number, setNumber] = useState(3);
  const mapRef = useRef(null); // 지도 객체 저장용
  const markersRef = useRef([]); // 기존 + 새 마커 모두 저장
  const defaultCenter = useRef({ lat: 36.5, lng: 127.8 }); // 중심좌표(남한)

  const baseMarkersRef = useRef([]); // 처음 getMarkerList로 찍은 마커
  const typeMarkersRef = useRef([]); // type별 리스트 마커

  const markerMapRef = useRef({
     food: {},
     hotel: {},
     repair: {}
  });

  useEffect(() => {
      const fetch = async() => {
        const data = await getMarkerList(number);
        if(data){
            if (window.kakao && window.kakao.maps) {
              window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const centerLatLng = new window.kakao.maps.LatLng(
                    defaultCenter.current.lat,
                    defaultCenter.current.lng
                  );

                  const map = new window.kakao.maps.Map(container, {
                    center: centerLatLng,
                    level: 12
                  });
                mapRef.current = map; // 지도 객체 저장

                // 현재 접속한 도메인 가져오기
                const host = window.location.hostname;

                const BASE_URL = host === "localhost"
                  ? "http://localhost:3000"
                  : "http://172.16.250.24:3000";   // 필요 시 포트 포함

                const greenMarkerSrc  = `${BASE_URL}/images/travel_markers/marker_main.png`;
                const redMarkerSrc    = `${BASE_URL}/images/travel_markers/marker_main_select.png`;
                let imageSize = new window.kakao.maps.Size(15, 15);
                let imageOption = {offset: new window.kakao.maps.Point(0, 0)};

                const greenMarkerImage = new window.kakao.maps.MarkerImage(greenMarkerSrc, imageSize, imageOption);
                const redMarkerImage = new window.kakao.maps.MarkerImage(redMarkerSrc, imageSize, imageOption);

                const markers = [];
                let activeOverlay = null;

                data.forEach(({ mname, lat, lng, mlink, type }) => {
                  const markerPosition = new window.kakao.maps.LatLng(lat, lng);

                  const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: greenMarkerImage,
                    map: map,
                  });
  
                  // 오버레이 내용
                  const content = `
                    <div class="map-marker-overlay-box" >
                        <ul class="map-marker-overlay">
                          <li class="map-marker-title" ><span>${mname}</span></li>
                          <li class="map-marker-link" ><a href="${mlink}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
                        </ul>
                    </div>
                  `;

                  const customOverlay = new window.kakao.maps.CustomOverlay({
                    position: markerPosition,
                    content: content,
                    yAnchor: 1.2, // 오버레이 위치 조정
                  });

                  window.kakao.maps.event.addListener(marker, "click", () => {
                    // 마커 이미지 변경
                    markers.forEach(m => m.setImage(greenMarkerImage));
                    marker.setImage(redMarkerImage);

                    // 오버레이 열고 닫기
                    if (activeOverlay) {
                      activeOverlay.setMap(null);
                    }
                    customOverlay.setMap(map);
                    activeOverlay = customOverlay;


                    // 지도 확대
                    const currentLevel = map.getLevel();
                    if (currentLevel > 5) {
                      map.setLevel(currentLevel - 7);
                    }

                    // 마커 중심으로 이동
                    const moveLatLon = new window.kakao.maps.LatLng(
                      lat - 0.001, // 상하
                      lng // 좌우
                    );
                    map.panTo(moveLatLon);

                    const goback_btn = document.querySelector(".goback-button");
                    if (goback_btn) {
                      goback_btn.style.top = "0.3rem";
                    }

                    handleMenuClick(type);

                  });
                  markers.push(marker);
                });
              });
            }
        }
    }
    fetch();

  }, [number]);

  // type이 바뀔 때마다 마커 변경
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;
//
//     const listToRender = type === "food" ? travelFoodList
//                         : type === "hotel" ? travelHotelList
//                         : travelRepairList;

    // type별 리스트 매핑
    const listMap = {
      food: travelFoodList,
      hotel: travelHotelList,
      repair: travelRepairList
//       ,
//       store: travelStoreList    // ⭐ 새로운 타입 추가
    };

    // 선택할 리스트
    const listToRender = listMap[type] || [];

    if (!listToRender || listToRender.length === 0) return;

    window.kakao.maps.load(() => {
      const map = mapRef.current;
      if (!map) return;

      // 기존 type 마커 제거
      typeMarkersRef.current.forEach(m => m.setMap(null));
      typeMarkersRef.current = [];

      const currentLevel = map.getLevel();
//       console.log(currentLevel);
//       if(type === "repair"){
//         if (currentLevel <= 5) {
//             map.setLevel(currentLevel + 1);
//         }
//       }else {
        if (currentLevel > 5) {
            map.setLevel(currentLevel - 1);
        }
//       }

      // 현재 접속한 도메인 가져오기
      const host = window.location.hostname;

      const BASE_URL = host === "localhost"
        ? "http://localhost:3000"
        : "http://172.16.250.24:3000";   // 필요 시 포트 포함

      let orangeMarkerSrc = '';
      let selectMarkerSrc = '';

      if (type === "food") {
        orangeMarkerSrc = `${BASE_URL}/images/travel_markers/marker_food.png`;
        selectMarkerSrc = `${BASE_URL}/images/travel_markers/marker_food_select.png`;

      } else if (type === "hotel") {
        orangeMarkerSrc = `${BASE_URL}/images/travel_markers/marker_hotel.png`;
        selectMarkerSrc = `${BASE_URL}/images/travel_markers/marker_hotel_select.png`;

      } else if (type === "repair") {
        orangeMarkerSrc = `${BASE_URL}/images/travel_markers/marker_repair.png`;
        selectMarkerSrc = `${BASE_URL}/images/travel_markers/marker_repair_select.png`;
      }
//       else { // store
//           orangeMarkerSrc = `${BASE_URL}/images/travel_markers/marker_store.png`;
//           selectMarkerSrc = `${BASE_URL}/images/travel_markers/marker_store_select.png`;
//       }


      const imageSize = new window.kakao.maps.Size(20, 20);
      const imageOption = { offset: new window.kakao.maps.Point(0, 0) };
      const selectImageSize = new window.kakao.maps.Size(45, 45);
      const selectImageOption = { offset: new window.kakao.maps.Point(15, 30) };
      const orangeMarkerImage = new window.kakao.maps.MarkerImage(orangeMarkerSrc, imageSize, imageOption);
      const selectMarkerImage = new window.kakao.maps.MarkerImage(selectMarkerSrc, selectImageSize, selectImageOption);

      let activeOverlay = null;


      listToRender.forEach((item) => {

        const { lat, lng, fname, flink } = item;

        // type에 맞춰 did 설정
        const did =
          type === "food"  ? item.fid :
          type === "hotel" ? item.hid :
                             item.rid;

        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: orangeMarkerImage,
          map,
      });

      // 리스트 선택한 마커 저장
      markerMapRef.current[type][did] = marker;

//         const content = `
//           <div class="map-marker-overlay-box">
//             <ul class="map-marker-overlay">
//               <li class="map-marker-title"><span>${fname}</span></li>
//               <li class="map-marker-link"><a href="${flink}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
//             </ul>
//           </div>
//         `;

//         const customOverlay = new window.kakao.maps.CustomOverlay({
//           position: markerPosition,
//           content,
//           yAnchor: 1.2,
//         });

        window.kakao.maps.event.addListener(marker, "click", () => {
          baseMarkersRef.current.forEach(m => m.setImage(orangeMarkerImage));
          typeMarkersRef.current.forEach(m => m.setImage(orangeMarkerImage));
          marker.setImage(selectMarkerImage);

//           if (activeOverlay) activeOverlay.setMap(null);
//           customOverlay.setMap(map);
//           activeOverlay = customOverlay;

//           if(type === "repair"){
//               if (map.getLevel() > 5) map.setLevel(map.getLevel() - 1);
//           }else{
              if (map.getLevel() > 5) map.setLevel(map.getLevel() - 7);
//           }

          map.panTo(new window.kakao.maps.LatLng(lat - 0.001, lng));

          //상세페이지 열기
          handleListDetail(type, did);
        });

        typeMarkersRef.current.push(marker);
      });
    });
  }, [type, travelFoodList, travelHotelList, travelRepairList]);

  // 리스트에서 선택 항목 지도 마커 클릭
  useEffect(() => {
    if (!selectedDid || !type) return;

    const marker = markerMapRef.current[type]?.[selectedDid];

    if (marker) {
      window.kakao.maps.event.trigger(marker, "click");
    }
  }, [selectedDid, type]);

  const handleGoBack = () => {
     if (mapRef.current) {
       const centerLatLng = new window.kakao.maps.LatLng(
         defaultCenter.current.lat,
         defaultCenter.current.lng
       );

       mapRef.current.panTo(centerLatLng);
       mapRef.current.setLevel(12);

       const goback_btn = document.querySelector(".goback-button");
       if (goback_btn) {
         goback_btn.style.top = "-3rem";
       }

       //type 마커 제거
       typeMarkersRef.current.forEach(marker => marker.setMap(null));
       typeMarkersRef.current = [];

       //마커 이미지 초기화
       baseMarkersRef.current.forEach(marker => marker.setImage(marker.defaultImage));
     }

     if(handleGoBack) {
         handleMapGoBack();
     }
  }

  return (
    <>
      <div className="map" id="map"></div>
      <div className="goback-button" id="" onClick={handleGoBack} ><i class="fa-solid fa-backward-step"></i></div>
    </>
  );
}

export default Map;