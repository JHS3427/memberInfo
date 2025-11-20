//가로는 60%~80%가 적당할듯? 보고 하기

import { useEffect,useState } from "react";
import { getInfo} from '../feature/auth/authAPI';
import { useNavigate } from 'react-router-dom';
import '../styles/myPage.css'; // ✨ 새로운 CSS 파일 import
import { usePostCode} from '../feature/auth/authAPI';

export function InfoBox({info,name,handleDataChange}){

    
    const dataChangeButtonOnOffInit = {uid:false,upass:false,
                                    uname:false,uage:false,
                                    ugender:false,uaddress:false,
                                    uemail:false,uphone:false
    }
    const nameString = {uid:"아이디",upass:"패스워드",
                        uname:"이름",uage:"나이",
                        ugender:"성별",uaddress:"주소",
                        uemail:"이메일",uphone:"전화번호"}

    const [dataChangeButtonOnOff,setDataChangeButtonOnOff] = useState(dataChangeButtonOnOffInit)
    const [postCodeChanger,setPostCodeChanger]=useState(0);//uaddress_main 초기화용 변수

    const [mainAddressVar,setMainAddressVar] = useState({"mainAddress":""});
    const {handleClick} = usePostCode(mainAddressVar,setMainAddressVar); // 리턴이 handleclick임
    
    const DataChangeOpen = (e) =>{
        setDataChangeButtonOnOff({...dataChangeButtonOnOff,[name] : true})
    }
    const DataChangeClose = (e) =>{
        setDataChangeButtonOnOff({...dataChangeButtonOnOff,[name] : false})
        if(name==="uaddress")
        {
            handleDataChange({target:{name:"uaddress_sub",value:""}})
            setPostCodeChanger(1);//uaddress_main 초기화 작업을 위해 세팅
            setMainAddressVar({"mainAddress":""})
        }
        else
        {
            handleDataChange({target:{name:name,value:""}})
        }
    }

    /*dataChangeButtonOnOff의 uaddress가 true가 되면 작동 > uaddress_main을 mainAddressVar.mainAddress값으로 변경
        > 그러다 mainAddressVar.mainAddress값이 바뀌면 다시 세팅 >이후 받아온 handleDataChange에서 name따져서 uaddress가 main이면 console로 출력

     postCodeChanger를 만든 이유 : 바깥에서 uaddress_main 초기화 하려고 시도했는데 안됨. 그래서 useEffect에 넣고 초기화
    */
    useEffect(() => {
        if (mainAddressVar.mainAddress && dataChangeButtonOnOff['uaddress']) {
            handleDataChange({
                target: {
                    name: 'uaddress_main',
                    value: mainAddressVar.mainAddress
                }
            });
        }
        if(postCodeChanger==1)
        {
            handleDataChange({
                target: {
                    name: 'uaddress_main',
                    value: ""
                }
            });
            setPostCodeChanger(0);
        }
    }, [mainAddressVar.mainAddress, postCodeChanger]);

    if (!info) {
        // null을 반환하여 아무것도 렌더링하지 않거나, 로딩 메시지를 반환합니다.
        // MyPage에서 <li>로 감싸고 있으므로, <li> 안의 내용만 반환해야 합니다.
        return <>정보를 불러오는 중...</>; 
    }
    return(
        <>
            <li>{dataChangeButtonOnOff[name]?
                    name==="uaddress"?
                        <>
                            {nameString[name]} 변경 -- 
                            <button name = {name+"_main"} type='button' onClick={handleClick} >주소 찾기</button>
                            <input
                                name = {name+"_main"} 
                                value = {mainAddressVar.mainAddress}
                                readOnly />
                            <input
                                name = {name+"_sub"}
                                onChange={handleDataChange}/>
                            <button onClick={DataChangeClose}> 취소</button>
                        </>
                        :
                        <>
                            {nameString[name]} 변경 -- 
                            <input
                                name = {name}
                                onChange={handleDataChange}/>
                            <button onClick={DataChangeClose}> 취소</button>
                        </>
                    :
                    <>
                        {info[name]} <button onClick={DataChangeOpen}> {nameString[name]} 수정</button>
                    </>
                    }</li>
        </>);
}

//useEffect로 데이터 가져오기 - islogin값 확인해서 백에 아이디 보고 요청하기
//정보가지고 authapi로 > authapi에서 백으로 > 백 컨트롤러 > 서비스 > 레포지토리 > 정보 취합 > 서비스 > 컨트롤러 > 프론트 api > 여기로
export function MyPage(){

    const handleDatainit = {uid:"",upass:"",
                            uname:"",uage:"",
                            ugender:"",uaddress_main:"",uaddress_sub:"",
                            uemail:"",uphone:""
    }
    const editDatainit = {uid:0,upass:0,
                            uname:0,uage:0,
                            ugender:0,uaddress_main:0,uaddress_sub:0,
                            uemail:0,uphone:0
    }

    const navigate=useNavigate();   
    const [info, setInfo] = useState(null);
    const [handleData,setHandleData] = useState(handleDatainit)
    
    const [editer,setEditer] = useState(editDatainit);
    const [editerOnOff,setEditerOnOff] = useState(0);

    const handleChange=(e)=>{
        const {name,value} = e.target
        setHandleData({...handleData,[name]:value})
        if(value==="")
        {
            setEditer({...editer,[name]:0})
        }
        else
        {
            setEditer({...editer,[name]:1})
        }
    }
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
    
    useEffect(()=>{
        let editerOnOff_changer = 0
        for( const [key, value] of Object.entries(editer))
        {
            editerOnOff_changer=editerOnOff_changer+value
            setEditerOnOff(editerOnOff_changer);
        }
    },[editer])

    const clicker = () =>{
        console.log(handleData)
    }

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
                            <InfoBox info={info} name = "uid" handleDataChange={handleChange}/>
                            <InfoBox info={info} name = "upass" handleDataChange={handleChange}/>
                        </>}                       
                        
                        <InfoBox info={info} name = "uname" handleDataChange={handleChange}/>
                        <InfoBox info={info} name = "uage" handleDataChange={handleChange}/>
                        <InfoBox info={info} name = "ugender" handleDataChange={handleChange}/>
                        <InfoBox info={info} name = "uaddress" handleDataChange={handleChange}/>
                        <InfoBox info={info} name = "uemail" handleDataChange={handleChange}/>
                        <InfoBox info={info} name = "uphone" handleDataChange={handleChange}/>
                    </ul>
                    {editerOnOff>0?<button className="withdrawButton" onClick={clicker}>수정 내용 저장</button>:""}
                    
                    <button className="withdrawButton">회원 탈퇴</button>
                </div>
            </div>
        </>
    );
}