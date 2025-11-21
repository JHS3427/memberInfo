import axios from 'axios';
import { axiosData } from "../../utils/dataFetch.js";

const getCookie = (name) => {
    // JavaScript 표준 API를 사용하여 쿠키에서 XSRF-TOKEN 값을 추출
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const axiosPost = async (url, formData) => {

    // 1. 쿠키에서 CSRF 토큰 (기본 이름: XSRF-TOKEN)을 가져옵니다.
    const csrfToken = getCookie('XSRF-TOKEN');
    console.log("획득된 CSRF 토큰 값:", csrfToken);

    const headers = {
        "Content-Type": "application/json",
    };

    // 2. 토큰이 있다면 요청 헤더에 추가 (Spring Security 기본 헤더 이름: X-XSRF-TOKEN)
    if (csrfToken) {
        headers['X-XSRF-TOKEN'] = csrfToken; // 👈 이 헤더 이름이 중요합니다.
    }
    console.log("전송될 HTTP 헤더:", headers);

    // 3. 요청 실행
    const response = await axios.post(url, formData, { headers: headers });
    return response.data;
}

export const showMarkerAPI = async () => {
        return axiosData("/data/rentalMarker.json");
}

export const getRentalPayment = (priceInfo, paymentMethod) => async(dispatch, getState) => {
    const state = getState();

    const selectedStation = state.rentalData.selectedStation;
    const userId = state.auth.userId;

    if(!selectedStation || !userId) {
        console.error("결제 실패: 사용자 정보 또는 대여소 정보 누락");
        return {status:"FAILURE", message:"필수 데이터 누락"};
    }

    const rentalPayload = {
        paymentAmount: priceInfo,
        userId: userId,
        stationId: selectedStation?.id || "UNKNOWN",
        stationName: selectedStation?.name || "UNKNOWN",
        paymentMethod:paymentMethod
    };

    try {
        const url = "http://172.16.250.24:8080/rental/payment";
        // const url = "http://localhost:8080/payment/kakao/ready";
        const result = await axiosPost(url, rentalPayload);

        console.log("백엔드로부터의 최종 응답:", result);

        return result;
    } catch(error) {
        console.error("결제 요청 중 서버 통신 에러 발생:", error);
        return { status: "ERROR", message: error.message };
    }

}