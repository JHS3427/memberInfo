import React, { useState } from 'react'
import { getRentalPayment } from '../../feature/rental/rentalPaymentAPI';
import RentalBikeList from './RentalBikeList';


const RentalPayment = ({ className, onClose }) => {
    
    const [userInfo, setUserInfo] = useState({
    
    });
    
    // 렌탈 시간 상태관리 함수
    const [rentalTime, setRentalTime] = useState(0);

    // 시작 금액
    const pricePerHour = 500;

    // 기본 대여시작 시간인 60분 단위를 고정
    const timeUnit =30;

    // 렌탈 금액 초기 값
    let calculatedPrice = 0;

    // 1. rentalTime에 따라 금액을 계산
    if (rentalTime >= 300) {
        // 2. 300분(종일권) 이상 선택 시 5,000원으로 고정
        calculatedPrice = 5000;
    } else {
        // 3.30분 단위 증가에 맞춰 500원씩 증가
        calculatedPrice = (rentalTime / timeUnit) * pricePerHour;
    }

    // 버튼 클릭 시 시간이 1시간 단위인30분씩 더해지는 클릭 이벤트 함수
    function handleTimeIncrease() {
        // 최대 240분 이하까지 시간이 늘어나게 설정
        if (rentalTime < 270) {
            //클릭시 30분씩 ( + )
            setRentalTime(rentalTime +30)
        }
    }
    
    // 버튼 클릭 시 시간이 1시간 단위인30분씩 빠지는 클릭 이벤트 함수
    function handleTimeDecrease() {
        // 0이하로 내려가지 않는게 설정
        if (rentalTime > 0) {
            // 클릭 시 값이 30분씩 ( - ) 
            setRentalTime(rentalTime -30)
        }
    }

    // 종일권을 위한 사람을 위해서 클릭시 최고 값을 부여 (5시간)
    function handleTimeAllDay() {
        //클릭 시 최고 시간인 300분(5시간을 부여)
        setRentalTime(300)
    }

    // 결제 버튼 클릭 시 결제 정보를 API 파일로 전송
    const handlePayment = async () => {
        const result = await getRentalPayment(calculatedPrice);
        return result;
    }

    return (
        <>
            <div className={className}>
                <h3>결제 화면</h3>
                <RentalBikeList
                    className={`bike_station_name_list`}
                />
                <div className='payment_time_event'>
                    <button
                        className='payment_handletime_decrease'
                        type='button'

                        onClick={handleTimeDecrease}>-</button>
                    <span>{rentalTime}</span>
                    <span>분</span>
                    <button
                        className='payment_handletime_increase'
                        type='button'
                        onClick={handleTimeIncrease}>+</button>
                </div>
                <div className='payment_time_allday_box'>
                    <button
                        className='payment_handleTime_allday'
                        type='button'
                        onClick={handleTimeAllDay}
                    >All Day</button>
                    <p>( 30분당 500&nbsp;&#8361; / 300분 기준 종일권 5,000&nbsp;&#8361; )</p> {/* 추후 JSON 데이터로 전환 예정 */}
                </div>
                <div className='payment_price_info'>
                    <ul>
                        <li className='price_info'>
                            <em>결제 금액</em>
                            <span>{calculatedPrice.toLocaleString('ko-KR')}&nbsp;&#8361;</span>
                        </li>
                    </ul>
                    <div>
                        <strong>결제 수단</strong>
                        <ul className='payment_choice'>
                            <li>
                                <span>카카오 페이</span>
                                <input 
                                    type="radio" 
                                    name='paymentCheckd'
                                    value="naverpay"
                                />
                            </li>
                            <li>
                                <span>네이버 페이</span>
                                <input 
                                    type="radio" 
                                    name='paymentCheckd'
                                    value="naverpay"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <form action="">
                    <button type='button' onClick={handlePayment}>결제</button>
                    <button
                        className='payment_info_close'
                        type='button'
                        onClick={onClose}>돌아가기</button>
                </form>
            </div>
        </>
    )
}

export default RentalPayment;