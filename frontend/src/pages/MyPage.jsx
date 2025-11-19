//가로는 60%~80%가 적당할듯? 보고 하기

import { useEffect,useState } from "react";
import { getInfo} from '../feature/auth/authAPI';
import '../styles/myPage.css'; // ✨ 새로운 CSS 파일 import

export function InfoBox({info}){

    const user_info = info || {
        uid:"",
        upass:"",
        
    }

    return(
        <>
            <h1>aaaaaaaaaaaaaaaa</h1>
        </>);
}


//useEffect로 데이터 가져오기 - islogin값 확인해서 백에 아이디 보고 요청하기
//정보가지고 authapi로 > authapi에서 백으로 > 백 컨트롤러 > 서비스 > 레포지토리 > 정보 취합 > 서비스 > 컨트롤러 > 프론트 api > 여기로
export function MyPage(){

    const [info, setInfo] = useState(null);

    useEffect(()=>{
        let result;
        const loginInfo = localStorage.getItem("loginInfo");
        console.log(loginInfo)
        const Json_loginInfo = JSON.parse(loginInfo);
        //isLogin하면 스프링이 데이터를 제대로 못받아서 loggedIn으로 변경.
        const loginInfo_goingback={ uid : Json_loginInfo.userId, loggedIn : Json_loginInfo.isLogin}
        console.log(Json_loginInfo.isLogin)
        console.log(Json_loginInfo.userId)
        const getUserInfo = async() =>{
            result = await getInfo(loginInfo_goingback);
            setInfo(result)
        }
        getUserInfo();
    },[])
    return(
        <>
            <div className="myPageContainer">
                <div className="sideBar">
                    <h1 className="sideBarTitle">사이드 탭</h1>
                    <ul className="sideBarList">
                        <li>자전거 장바구니</li>
                        <li>대여 상태 및 기록</li>
                        <li>여행지 찜목록</li>
                    </ul>
                </div>
                <div className="infoSection">
                    <h1 className="infoSectionTitle">개인정보 기록 및 수정</h1>
                    <ul className="infoList">
                        {info?
                            <li>{info.uid}</li>:
                            <li>아이디</li>
                        }
                        <li>패스워드</li>
                        <li>이름</li>
                        <li>나이</li>
                        <li>성별</li>
                        <li>주소</li>
                        <li>이메일</li>
                        <li>개인 연락번호</li>
                        <InfoBox/>
                    </ul>
                    <button className="withdrawButton">회원 탈퇴</button>
                </div>
            </div>
        </>
    );
}