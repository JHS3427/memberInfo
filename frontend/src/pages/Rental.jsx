import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { Maps } from '../components/rental/Maps.jsx';
import { addData, setFilteredList, setSelectedStation } from '../feature/rental/rentalMarkerSlice.js';
import { showMarkerAPI } from '../feature/rental/rentalMarkerAPI.js';

const getDistance = (startLat, startLon, endLat, endLon) => {
    // 주 지점이 같은 경우 0km 반환
    if ((startLat === endLat) && (startLon === endLon)) {
        return 0;
    }

    //상수 정의
    // 지구의 평균 반지름 (단위: km)
    const earthRadiusKm = 6371;
    
    // 도를 라디안으로 변환
    const degreesToRadians = Math.PI / 180;

    // 위도 및 경도 차이를 라디안으로 변환
    const latDifferenceRad = (endLat - startLat) * degreesToRadians;
    const lonDifferenceRed = (endLon - startLon) * degreesToRadians;

    // Haversine 공식의 값 계산
    const haversineValueA = 
        Math.sin(latDifferenceRad / 2) * Math.sin(latDifferenceRad / 2 ) +
        Math.cos(startLat * degreesToRadians) * Math.cos(endLat * degreesToRadians) *
        Math.sin(lonDifferenceRed / 2) * Math.sin(latDifferenceRad / 2 );

    // Haversine 공식의 c값 계산 (두 지점 사이의 호의 중심 각, 라디안)
    const centralAngleArc = 2 * Math.atan2(Math.sqrt(haversineValueA), Math.sqrt(1 - haversineValueA));

    // 최종 거리 계산 (거리 = 반지름 * 호의 길이)
    const distanceKm = earthRadiusKm * centralAngleArc;

    return distanceKm;
}

const Rantal = () => {
    //로직을 리덕스로 변경하기 전까지 사용하던 상태관리 함수
    // const [maps, setMaps] = useState([]);

    // 사용자가 위치 사용 권한을 거부했을 시 기본 좌표 반영
    const [latLon, setLatLon] = useState({ lat: 37.575877, lng: 126.976897 });

    //마커의 정보를 담고있는 store에 등록된 데이터
    const selectedMarker = useSelector((state)=> state.rentalData.selectedStation);

    // useDispatch()를 사용하기 위해서 dispatch 변수 선언 그리고 할당 함.
    const dispatch = useDispatch();

    // store에서 필터링된 마커 리스트를 자겨올 변수
    const [filteredMaps, setFilteredMaps] = useState([]);

    // store에 등록된 전체 데이터를 사용하기 위해 useSelector로 데이터 추출
    const allBikeStations = useSelector((state) => state.rentalData.bikeList);

    useEffect(() => {
        const bikePullData = async () => {

            const data = await showMarkerAPI();

            // 불러온 자전거 데이터를 Redux store에 저장 (전역 상태 관리용) or 마커의 전체 데이터를 포함하고 있음
            dispatch(addData(data));

            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                const userLat = latitude;
                const userLon = longitude;
                

                // 중심좌표 설정 (사용자 위치)
                setLatLon({ lat: userLat, lng: userLon })
            });

        };
        bikePullData();
    }, [])

    // allBikeStations(Redux 데이터)나 latLon(사용자 위치)이 변경될 때마다 필터링을 다시 수행
    useEffect(() => {
        // 사용자 위치가 설정되었고, Redux에 데이터가 로딩되었을 때만 필더링 수행
        if(allBikeStations.length > 0){
            
            const maxDistanceKm = 0.5; // 반경 2km
            const maxMarkers = 10;

            const filteredStations = allBikeStations.filter(station => {
                const distance = getDistance(
                    latLon.lat,
                    latLon.lng,
                    station.latitude, // JSON 데이터의 위도 속성
                    station.longitude // JSON 데이터의 경도 속성
                );
                // 거리가 2km 이하인 경우에만 true 반환
                return distance <= maxDistanceKm
            });

            
            const finalFilteredStations = filteredStations.slice(0, maxMarkers);
            dispatch(setFilteredList(finalFilteredStations));

            //필더링된 결과를 렌더링에 사용할 로컬 상태에 저장
            setFilteredMaps(filteredStations);
        }
    }, [allBikeStations, latLon]);

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Maps data={selectedMarker} onClose={() => { dispatch(setSelectedStation(null)) }} />
            <Map center={latLon} style={{ width: "100%", height: "calc(100vh - 52px)" }}
                onDragEnd={(map)=>{
                    //지도의 새로운 중심 좌표를 가져와서 latLon 상태 업데이트
                    const newCenter = map.getCenter();
                    setLatLon({
                        lat: newCenter.getLat(),
                        lng: newCenter.getLng(),
                    });
                }}
            >
                {
                    filteredMaps && filteredMaps.map((station, index) => {
                        return <MapMarker key={`${station.id}-${index}`}
                            position={{ lat: station.latitude, lng: station.longitude }}
                            onClick={() => {dispatch(setSelectedStation(station))}}>
                        </MapMarker>
                    })
                }
            </Map>
        </div>
    )
}
export default Rantal;