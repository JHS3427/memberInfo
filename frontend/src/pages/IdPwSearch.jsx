import { useLocation } from "react-router-dom"
import { useState } from "react";
import { AuthInputBox , AuthInputButton} from "../components/auth/AuthInput";
import '../styles/IdPwSearch.css';
import { SearchingUserInfo } from "../feature/auth/authAPI";

export function IdPwSearch(){

  const location = useLocation();
  
  const searchUserinfoInit = {"uemail" : null, "uname":null,"uid":null,"selectedTap":null,"authCodeIdPw":null}
  const { type } = location.state
  const [pageType, setPageType] = useState(type);
  const [searchUserinfo,setSearchUserinfo] = useState(searchUserinfoInit);
  const [inputLevel,setInputLevel] = useState({"searchingInfo":true,"authcodeInput":null,"showOrChange":null})
  // location.state 객체에서 type 값을 구조 분해 할당으로 가져옴

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
    setSearchUserinfo(prev=>({...prev,["selectedTap"]:value}))
  }

  const sendingUserInfo = async() =>{
    if(await SearchingUserInfo(searchUserinfo))
    {
        setInputLevel(prev=>({...prev,["searchingInfo"]:null}))
        setInputLevel(prev=>({...prev,["authcodeInput"]:true}))
        //여기에 백에서 메일 쏘는거 입력
        console.log(searchUserinfo);
        alert("메세지 보냈습니다. 확인해보세요.")
    }
    else{
        alert("없다.")
    }
  }
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
                        <AuthInputButton buttonType = "Id" Clicker={handleselectedTap} onClick={sendingUserInfo}/>
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
                        <AuthInputButton buttonType = "Pw" Clicker={handleselectedTap} onClick={sendingUserInfo}/>
                    </div>
                </div>
            }//onclick으로 DB확인해서 있으면 다음거 렌더링
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
        </div>
    )
}