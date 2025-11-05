import { axiosData } from "../../utils/dataFetch.js";

export const showMarkerAPI = async () => {
        return axiosData("/data/rentalMarker.json");
}