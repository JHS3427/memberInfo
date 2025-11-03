import { login, logout,socialLogin } from './authSlice.js';
import { validateFormCheck,axiosPost } from "../../utils/validate.js";
import { useDaumPostcodePopup } from 'react-daum-postcode'; // 주소 찾기 관련 import

export const getLogin = (formData, param) => async(dispatch) => {
    if(validateFormCheck(param)) {
        if("test" === formData.id && "1234" === formData.pass) {
            dispatch(login({"userId": formData.id}));
            return true;
        }
    }
    return false;
}

export const getLogout = () => async(dispatch) => {
    dispatch(logout());
    return true;
}

/*
조해성
함수 설명 : 프론트에서 받은 인가 코드와 해당 플랫폼 이름을
            백엔드로 전달하여 토큰을 받아오는 함수입니다.*/
export const getsocialtoken=(token_json,social) => async(dispatch) =>{
    const json_code = {"authCode": token_json,"social":social};
    const url = "http://localhost:8080/token";
    const authtoken = await axiosPost(url,json_code);
    console.log("token : ",authtoken)
    dispatch(socialLogin({"token":authtoken,"social":social}));   
}


//현재 회원가입 페이지에서 사용중. 이후 개인정보 페이지의 수정항목에 재차 사용 예정
/* 주소찾기 관련 코드 모음  ---------------------------------------------> */
export const usePostCode= (formData,setFormData)=>{
    const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleComplete = (data) => {
    let fullAddress = data.address;
    let placezonecode = data.zonecode;
    let extraAddress = '';
    let localAddress = data.sido + ' ' + data.sigungu;

    if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress = fullAddress.replace(localAddress, '');
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setFormData({...formData,  mainAddress : fullAddress})
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",fullAddress,placezonecode)
    };
    const handleClick = () => {
    open({ onComplete: handleComplete });
    };

    return {handleClick}
}
/*--------------------------------------------->주소찾기 관련 코드 모음  끝 */
