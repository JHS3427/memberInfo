import { axiosData, axiosPost } from "../../utils/dataFetch.js";

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
        stationId: selectedStation.stationId,
        stationName: selectedStation.name,
        paymentMethod:paymentMethod
    };
    console.log("결제 이벤트 >>", rentalPayload);
    

    try {
        const url = "http://localhost:8080/api/rental/checkout";
        const result = await axiosPost(url, rentalPayload);

        console.log("백엔드로부터의 최종 응답:", result);

        return result;
    } catch(error) {
        console.error("결제 요청 중 서버 통신 에러 발생:", error);
        return { status: "ERROR", message: error.message };
    }

}