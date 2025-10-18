import { login,logout,kakaoLogin } from "./authSlice";
import {validateFormCheck,axiosPost} from "../utils/validate.js"

export const getLogin = (formData,param) => async(dispatch) => {
    //파라미터 체크 후 아이디 비번 맞으면 진행
    if(validateFormCheck(param))
    {//여기서 데이터 가져와서 비교하기 진행
        dispatch(login({"userId":formData.id}));
        return true;
    }
}

export const getLogout = () => async(dispatch) =>{
    dispatch(logout());
}

export const getkakaotoken=(token_json) => async(dispatch) =>{
    const json_code = {"authCode": token_json,"id":"1234"};
    const url = "http://localhost:8080/token";
    const kkotoken = await axiosPost(url,json_code);
    console.log("token : ",kkotoken)
    dispatch(kakaoLogin({"token":kkotoken}));
    
}

