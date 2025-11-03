import { useEffect } from "react";

function Map({ handleClick }) {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 중심 좌표
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        const greenMarkerSrc  = 'http://localhost:3000/images/marker_green.png'; 
        const redMarkerSrc = 'http://localhost:3000/images/marker_red.png';   
        let imageSize = new window.kakao.maps.Size(15, 15);
        let imageOption = {offset: new window.kakao.maps.Point(0, 0)};
        
        const greenMarkerImage = new window.kakao.maps.MarkerImage(greenMarkerSrc, imageSize, imageOption);
        const redMarkerImage = new window.kakao.maps.MarkerImage(redMarkerSrc, imageSize, imageOption);

        // 마커 위치 및 타입 배열 (중복 입력 방식)
        const markerData = [
          { lat: 33.450701, lng: 126.570667, type: "coord" },
          { lat: 33.451701, lng: 126.571667, type: "coord" },
          { lat: 33.452701, lng: 126.572667, type: "coord" },
          // 추가로 원하는 만큼 마커 넣기 가능
        ];

        const markers = [];
        let activeOverlay = null;

        markerData.forEach(({ lat, lng, type }) => {
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
                  <li class="map-marker-title" ><span>구의야구공원</span></li>
                  <li class="map-marker-link" ><a href="https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=97fc93d4-e259-4a38-bdb1-45bfcb8691ba" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
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

            handleClick(type);

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
  }, []);


  return (
    <>
      <div className="map" id="map"></div>
    </>
  );
}

export default Map;