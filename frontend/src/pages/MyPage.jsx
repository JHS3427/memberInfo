//가로는 60%~80%가 적당할듯? 보고 하기

import { useEffect,useState } from "react";
import { getInfo} from '../feature/auth/authAPI';
import { useNavigate } from 'react-router-dom';
import '../styles/myPage.css'; // ✨ 새로운 CSS 파일 import

export function InfoBox({info,tag}){

    const dataChangeButtonOnOffInit = {uid:false,upass:false,
                                    uname:false,uage:false,
                                    ugender:false,uaddress:false,
                                    uemail:false,uphone:false
    }
    const tagString = {uid:"아이디",upass:"패스워드",
                        uname:"이름",uage:"나이",
                        ugender:"성별",uaddress:"주소",
                        uemail:"이메일",uphone:"전화번호"}
    const [dataChangeButtonOnOff,setDataChangeButtonOnOff] = useState(dataChangeButtonOnOffInit)

    const DataChangeOpen = (e) =>{
        console.log("tag : ",tag);
        setDataChangeButtonOnOff({...dataChangeButtonOnOff,[tag] : true})
    }
    const DataChangeClose = (e) =>{
        console.log("tag : ",tag);
        setDataChangeButtonOnOff({...dataChangeButtonOnOff,[tag] : false})
    }

    let user_info;
    
    if (!info) {
        // null을 반환하여 아무것도 렌더링하지 않거나, 로딩 메시지를 반환합니다.
        // MyPage에서 <li>로 감싸고 있으므로, <li> 안의 내용만 반환해야 합니다.
        return <>정보를 불러오는 중...</>; 
    }
    return(
        <>
            {/* {user_info?user_info[tag]:"없음"} */}
            <li>{dataChangeButtonOnOff[tag]?
                    <>
                        {tagString[tag]} 변경 -- <input/>
                        <button onClick={DataChangeClose}> 취소</button>
                    </>:
                    <>
                        {info[tag]} <button onClick={DataChangeOpen}> {tagString[tag]} 수정</button>
                    </>
                    }</li>
        </>);
}

//useEffect로 데이터 가져오기 - islogin값 확인해서 백에 아이디 보고 요청하기
//정보가지고 authapi로 > authapi에서 백으로 > 백 컨트롤러 > 서비스 > 레포지토리 > 정보 취합 > 서비스 > 컨트롤러 > 프론트 api > 여기로
export function MyPage(){

    const navigate=useNavigate();   
    const [info, setInfo] = useState(null);
    
    const loginInfoString = localStorage.getItem("loginInfo");
    let socialLogin = false;
    let Json_loginInfo = null;
    
    if (loginInfoString) {
        Json_loginInfo = JSON.parse(loginInfoString);
        socialLogin = Json_loginInfo.isSocial;
    }

    useEffect(()=>{
        let result;
        const loginInfo = localStorage.getItem("loginInfo");
        if (!loginInfoString) // null인 경우
        {
            navigate('/');
            return; // 리다이렉션 후 이후 코드가 불필요하게 실행되는 것을 방지
        }
        const Json_loginInfo = JSON.parse(loginInfo);
        //isLogin하면 스프링이 데이터를 제대로 못받아서 loggedIn으로 변경.
        const loginInfo_goingback={ uid : Json_loginInfo.userId, loggedIn : Json_loginInfo.isLogin, socialDupl : Json_loginInfo.isSocial}
        const getUserInfo = async() =>{
            result = await getInfo(loginInfo_goingback);
            result["upass"] = "패스워드는 비밀입니다"
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
                        {socialLogin?
                        <>
                            <li>소셜 로그인은 아이디를 공개하지 않습니다</li>
                            <li>소셜 로그인은 패스워드를 공개하지 않습니다</li>
                        </>:
                        <>
                            <InfoBox info={info} tag = "uid"/>
                            <InfoBox info={info} tag = "upass"/>
                        </>}                       
                        
                        <InfoBox info={info} tag = "uname"/>
                        <InfoBox info={info} tag = "uage"/>
                        <InfoBox info={info} tag = "ugender"/>
                        <InfoBox info={info} tag = "uaddress"/>
                        <InfoBox info={info} tag = "uemail"/>
                        <InfoBox info={info} tag = "uphone"/>
                    </ul>
                    <button className="withdrawButton">회원 탈퇴</button>
                </div>
            </div>
        </>
    );
}