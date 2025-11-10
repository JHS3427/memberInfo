import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMarkerList } from '../../feature/travel/mapAPI.js';

function Map({ handleMenuClick, handleMapGoBack  }) {
  const dispatch = useDispatch();
  const markerList = useSelector((state) => state.map.markerList);

  const [number, setNumber] = useState(3);
  const mapRef = useRef(null); // 지도 객체 저장용
  const defaultCenter = useRef({ lat: 36.5, lng: 127.8 }); // 중심좌표(남한)

  useEffect(() => {
//    안될때 값확인 1
//    console.log("111");
      // fetch 함수를 만든이유는 await getMarkerList(number);를 먼저 실행하려면 async가 필요해서 함수로 만들어서 먼저 실행하게하고 유무에 따라 마커출력 진행
      // 그래서 await를 먼저 해야하는 일이 잇다면 함수로 감싸서 사용
      const fetch = async() => {
//      안될때 값확인 2 (진행이 통과해서 들어오는지를 확인)
//      console.log("222");
        const data = await getMarkerList(number);
//      DB에서 데이터를 잘 받아왔는지 체크
//      console.log("map => ",data);
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

                const greenMarkerSrc  = 'http://localhost:3000/images/marker_green.png';
                const redMarkerSrc = 'http://localhost:3000/images/marker_red.png';
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
                      lat - 0.001, // 위로 살짝 올리기
                      lng
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

                // 지도 클릭 시 모든 오버레이 닫기
                // window.kakao.maps.event.addListener(map, "click", () => {
                //   if (activeOverlay) {
                //     activeOverlay.setMap(null);
                //     activeOverlay = null;
                //   }
                //   markers.forEach((m) => m.setImage(greenMarkerImage));
                // });
              });
            }
        }
    }
    fetch();

  }, [number]);

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