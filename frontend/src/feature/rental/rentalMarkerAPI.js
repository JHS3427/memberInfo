import { axiosData } from "../../utils/dataFetch.js";

// const apiUrl = "https://api.citybik.es/v2/networks/"; // 공통된 API 기본 주소
// const stations = [
//     // 각 도시별 세부 경로 주소 배열로 저장

//     //서울 따릉이
//     "seoul-bike",

//     // 세종 어울링
//     "eoulling-sejong",

//     // 대전 타슈
//     "tashu",

//     // 창원 누비자
//     "nubija-changwon"

// ];

// export const showMarkerAPI = async () => {
//     const dataPromises = stations.map((stationName) => {
//         return axiosData(`${apiUrl}${stationName}`);
//     });
//     return Promise.all(dataPromises);
// }
export const showMarkerAPI = async () => {
        return axiosData("/data/rentalMarker.json");
}