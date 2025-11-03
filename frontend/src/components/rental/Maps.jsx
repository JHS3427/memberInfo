import { useState } from 'react';
import cityBikeImage from '../../utils/cityBikeImage.js';
import RentalPayment from './RentalPayment.jsx';

const imageKey = ["seoulBike"];
const imagePath = cityBikeImage[imageKey];


export function Maps({ data, onClose }) {
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    if (!data) return null;
    return (
        <>
            <div className='map_marker_data_info'>
                <h3>{data.name}</h3>
                <img
                    className='map_marker_data_info_img'
                    src={imagePath}
                    alt="자전거 이미지"
                />
                <ul className='map_marker_data_info_list'>
                    <li>
                        <span>위도: <em>{data.latitude}</em></span>
                        <span>경도: <em>{data.longitude}</em></span>
                    </li>
                    <li>
                        <span>자전거 수: {data.free_bikes}</span>
                        <span>빈 거치대: {data.empty_slots}</span>
                    </li>
                    <li>
                        <span>어린이 자전거 : {data.extra.kid_bikes}</span>
                    </li>
                </ul>
                <form>
                    <button type='button' className='boarding' onClick={() => setPaymentModalOpen(true)}>대여하기</button>
                    <button className='map_marker_data_info_closs' onClick={onClose}>닫기</button>
                </form>
                {isPaymentModalOpen && (
                    <RentalPayment
                        className={`bike_rental_payment_info`}
                        data={isPaymentModalOpen}
                        onClose={() => setPaymentModalOpen(false)}
                    />
                )}
            </div>
        </>
    );
}

// 추후 제거될 함고용 자료
// "stations": [
//       {
//         "name": "1426. 면목도시개발아파트 1동 앞", 현재 공유 바이크 스테이션의 주소
//         "latitude": 37.57358932, // 스테이션의 위도 값 1
//         "longitude": 127.08682251, // 스테이션의 경도 값 1
//         "empty_slots": 0, //현재 자전거를 반남할 수 있는 슬롯 1
//         "extra": {
//           "kid_bikes": 2, // 스테이션에 어린이를 탑승할 수 있는 자전거의 대수
//           "slots": 10, // 스테이션의 남은 자리
//         }