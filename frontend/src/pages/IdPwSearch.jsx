import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { AuthInputBox , AuthInputButton} from "../components/auth/AuthInput";
import '../styles/IdPwSearch.css';
import { SearchingUserInfo , sendingAuthCode, updateUser} from "../feature/auth/authAPI";

export function IdPwSearch(){

  const location = useLocation();
  
  const searchUserinfoInit = {"uemail" : null, "uname":null,"uid":null,"selectedTap":null,"authCodeIdPw":null,"upass":null,"upassCheck":null}
  // location.state 객체에서 type 값을 구조 분해 할당으로 가져옴
  const { type } = location.state
  const [pageType, setPageType] = useState(type);
  const [searchUserinfo,setSearchUserinfo] = useState(searchUserinfoInit);
  const [inputLevel,setInputLevel] = useState({"searchingInfo":true,"authcodeInput":null,"showOrChange":null})
  const [finalData,setFinalData] = useState(null)

  const pageTypeChange = (newPageType) => {
    setPageType(newPageType);
    setSearchUserinfo(searchUserinfoInit);//탭 변경시 인풋박스 초기화
    setInputLevel(prev=>({...prev,["searchingInfo"]:true}))
    setInputLevel(prev=>({...prev,["authcodeInput"]:null}))
    setInputLevel(prev=>({...prev,["showOrChange"]:null}))
  }

  const handleInfo = (name,value) => {
    setSearchUserinfo(prev=>({...prev,[name]:value}))
  }
  
  const handleselectedTap = (value) => {
    setSearchUserinfo(prev=>({...prev,["selectedTap"]:value}))//이거로 변경이 일어나서 useEffect 발동되고 저장된 정보를 백으로 이동시킴
  }

  const sendingUserInfo = async() =>{
    if(await SearchingUserInfo(searchUserinfo))
    {
        if(inputLevel.searchingInfo)
        {
            setInputLevel(prev=>({...prev,["searchingInfo"]:null}))
            setInputLevel(prev=>({...prev,["authcodeInput"]:true}))
            setInputLevel(prev=>({...prev,["showOrChange"]:null}))
            //여기에 백에서 메일 쏘는거 입력
            console.log("sendingUserInfo : ??");
            console.log(searchUserinfo)
            alert("메세지 보냈습니다. 확인해보세요.")
        }
    }
    else{
        alert("없다.")
        setSearchUserinfo(prev=>({...prev,["selectedTap"]:null}))
    }
  }

  const sendingAuth = async() =>{
    setFinalData(await sendingAuthCode(searchUserinfo))
    console.log("finaldata : " + finalData )
    setInputLevel(prev=>({...prev,["searchingInfo"]:null}))
    setInputLevel(prev=>({...prev,["authcodeInput"]:null}))
    setInputLevel(prev=>({...prev,["showOrChange"]:true}))
  }

  const oncl=()=>{
    console.log(searchUserinfo);
  }

  useEffect(()=>{
    if(searchUserinfo.selectedTap === "Id" || searchUserinfo.selectedTap === "Pw")
    {
        sendingUserInfo();
        setSearchUserinfo(prev=>({...prev,["selectedTap"]:null}))//여러번 누를수도 있으니까 초기화
    }
    else if(searchUserinfo.selectedTap === "Auth")
    {
        sendingAuth();
        setSearchUserinfo(prev=>({...prev,["selectedTap"]:null}))//여러번 누를수도 있으니까 초기화
    }
    else if(searchUserinfo.selectedTap === "passCheck")
    {
        console.log("aaaaaaaaaaa")
        console.log(searchUserinfo)
        if(searchUserinfo.upass!=searchUserinfo.upassCheck)
        {
            console.log("주거잇")
            setSearchUserinfo(prev=>({...prev,["upass"]:null}))
            setSearchUserinfo(prev=>({...prev,["upassCheck"]:null}))
        }
        else
        {
            console.log("살아잇")
            updateUser(searchUserinfo);
        }
        setSearchUserinfo(prev=>({...prev,["selectedTap"]:null}))//여러번 누를수도 있으니까 초기화
    }
    else
    {
        console.log("으악 이게 뭐야")
        console.log("searchUserinfo.selectedTap : " + searchUserinfo.selectedTap)
    }
  },[searchUserinfo.selectedTap])

    return(
        <div className="IdPwSearchContainer"> 
            <div>
                <ul className="IdPwSearchTabNav">
                    <li 
                        onClick={()=>{pageTypeChange("findId")}}
                        className={pageType === "findId" ? "active" : ""}
                    >
                        계정 아이디 찾기
                    </li>
                    <li 
                        onClick={()=>{pageTypeChange("changePass")}}
                        className={pageType === "changePass" ? "active" : ""}
                    >
                        계정 비밀번호 변경하기
                    </li>
                </ul>
            </div>
            {inputLevel.searchingInfo?
            <div className="IdPwSearchContent"> 
            {pageType==="findId"?
                <div>
                    <h1>아이디 찾기를 위한 인증 칸</h1>
                    <ul className="IdPwSearchFormList">
                        <li>이메일 주소 :&nbsp;<AuthInputBox boxType="uemail" handleInfo = {handleInfo} value={searchUserinfo.uemail||''}/></li>
                        <li>본인 이름 :&nbsp;<AuthInputBox boxType="uname" handleInfo = {handleInfo} value={searchUserinfo.uname||''}/></li>
                    </ul>
                    <div className="IdPwSearchAuthButton">
                        <AuthInputButton buttonType = "Id" Clicker={handleselectedTap}/>
                    </div>
                </div>:
                <div>
                    <h1>비밀번호 변경을 위한 인증 칸</h1>
                    <ul className="IdPwSearchFormList">                            
                        <li>이메일 주소 :&nbsp;<AuthInputBox boxType="uemail" handleInfo = {handleInfo} value={searchUserinfo.uemail||''}/></li>
                        <li>본인 이름 :&nbsp;<AuthInputBox boxType="uname" handleInfo = {handleInfo} value={searchUserinfo.uname||''}/></li>
                        <li>아이디 :&nbsp;<AuthInputBox boxType="uid" handleInfo = {handleInfo} value={searchUserinfo.uid||''}/></li>
                    </ul>
                    <div className="IdPwSearchAuthButton">
                        <AuthInputButton buttonType = "Pw" Clicker={handleselectedTap}/>
                    </div>
                </div>
            }
            </div>
            :
            ""}
            
        {inputLevel.authcodeInput?
            <div className="IdPwSearchContent">
                <h1>인증 코드 입력</h1>
                <ul className="IdPwSearchFormList">
                    <li>인증 코드 :&nbsp;<AuthInputBox boxType="authCodeIdPw" handleInfo = {handleInfo}/></li>
                </ul>
                <div className="IdPwSearchAuthButton">
                    <AuthInputButton buttonType = "Auth" Clicker={handleselectedTap}/>
                </div>
            </div>:
            ""
        }
        {inputLevel.showOrChange?
            (finalData==="PW"?
                <>
                    <ul className="IdPwSearchFormList">
                        <li>비밀번호 :&nbsp;<AuthInputBox boxType="upass" handleInfo = {handleInfo} value={searchUserinfo.upass||''}/></li>
                        <li>비밀번호 확인 :&nbsp;<AuthInputBox boxType="upassCheck" handleInfo = {handleInfo} value={searchUserinfo.upassCheck||''}/></li>
                    </ul>
                    <AuthInputButton buttonType = "passCheck" Clicker={handleselectedTap}/>
                    {/* <button buttonType = "" onClick={oncl}>aaaaaa</button> */}
                    {/* 비밀번호 확인버튼 , 비밀번호 전송버튼 만들기 */}
                </>:
                finalData==="wrong or late"?
                <h1>인증코드가 틀렸거나 인증시간을 초과하였습니다. <br/> 처음부터 다시 시도해주세요.</h1>:
                <h1>아이디 : {finalData}</h1>)
            :<></>}
        </div>
    )
}