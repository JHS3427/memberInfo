import { login,logout } from "./authSlice";
import {validateFormCheck} from "../utils/validate.js"

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