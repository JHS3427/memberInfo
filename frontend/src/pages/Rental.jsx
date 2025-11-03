import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { Maps } from '../components/rental/Maps.jsx';
import { addData } from '../feature/rental/rentalMarkerSlice.js';
import { showMarkerAPI } from '../feature/rental/rentalMarkerAPI.js';

const Rantal = ({ center, ...restProps }) => {

    //로직을 리덕스로 변경하기 전까지 사용하던 상태관리 함수
    const [maps, setMaps] = useState([]);
    const [latLon, setLatLon] = useState({ lat: 37.575877, lng: 126.976897 });

    //마커의 정보를 담고있는 컴포넌트 파일을 useState로 관리
    const [selectedMarker, setSelectedMarker] = useState(null);

    // 지도의 중심좌표 설정 변수
    // const initialCenter = center || {lat: 37.575877, lng: 126.976897};

    // useDispatch()를 사용하기 위해서 dispatch 변수 선언 그리고 할당 함.
    const dispatch = useDispatch();

    // store에 등록된 데이터를 사용하기 위해서 useSelector 함수와 함수가 호함하고 있는 state객체를 이용해 데이터를 추출하고 변수에 값을 할당 함.
    // const maps = useSelector((state) => state.rentalData.bikeList);

    useEffect(() => {
        const pullData = async () => {
            const data = await showMarkerAPI();
            setMaps(data);

            // 전체 지역 중, 한 지역만 호출 - 전체 지역을 로딩했을 시 에러가 상당히 심해서 일단 한개의 지역만 로딩(작업을 위해서) 추후 제거 후 아래 변수 활성 예정

            // 4개의 전체 지역을 호출 - 추후 활성화 예정
            // const stations = data.flatMap(item => item.network.stations)

            // 상태관리 함수에 저장하기 위해 사용하던 상태관리 함수
            // setMaps(stations);

            // 불러온 자전거 데이터를 Redux store에 저장 (전역 상태 관리용)
            dispatch(addData(data));

            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setLatLon({ lat: latitude, lng: longitude })
            });

        };
        pullData();
    }, [])

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Maps data={selectedMarker} onClose={() => { setSelectedMarker(null) }} />
            <Map center={latLon} style={{ width: "100%", height: "calc(100vh - 52px)" }}>
                {
                    maps && maps.map((station, index) => {
                        return <MapMarker key={`${station.id}-${index}`}
                            position={{ lat: station.latitude, lng: station.longitude }}
                            onClick={() => setSelectedMarker(station)}>
                        </MapMarker>
                    })
                }
            </Map>
        </div>
    )
}
export default Rantal;