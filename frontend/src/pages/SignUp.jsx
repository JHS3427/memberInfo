/*
    조해성
    설명 : 회원가입 페이지이지만 현재 틀만 만들어 둔 상태.
    후일 개선 사항 : 해당 내용을 작성 중 에러 처리, 저장 기능 등 기능 추가 예정.
*/

import '../styles/signup.css';
import React, {useState} from 'react'
import { useDaumPostcodePopup } from 'react-daum-postcode';

const ConsoleBox = ({ 
    id, type, name, 
    formData, focusIn, focusOut, handleChange, placeholderJudge}) =>{
      const stringPlacer = {
        id : ["ID를 입력해주세요","ID를 입력하셨습니다"], 
        pass : ["비밀번호를 입력해주세요","비밀번호를 입력하셨습니다"], 
        passcheck:["비밀번호를 똑같이 입력해주세요","비밀번호가 다릅니다","비밀번호를 똑같이 입력하셨습니다","비밀번호가 비었습니다"], 
        name : ["이름을 입력해주세요","이름을 입력하셨습니다"], 
        age:["나이를 입력해주세요","나이를 입력하셨습니다"], 
        gender:"", 
        detailAddress:["상세 주소를 입력해주세요","상세 주소를 입력하셨습니다"], 
        emailAddress:["이메일 주소를 입력해주세요","이메일 주소를 입력하셨습니다"], 
        phone:["전화번호를 입력해주세요","전화번호를 입력하셨습니다"]
      }

  return(
    <>
      {placeholderJudge[id]==="aftertrue" && formData[id]===""?
      <input id={id} type={type} name ={name} // id 사용이유 : 하단의 label에서 htmlfor쓰려고. name : 폼 데이터에 쓰려고. 나눠둔 이유 : 같이쓰면 헤깔려서.
        value = {formData[id]}
        onFocus={focusIn}
        onBlur={focusOut}
        onChange={handleChange}
        style={{border : "2px solid red"}}
        />:
      <input id={id} type={type} name ={name} // id 사용이유 : 하단의 label에서 htmlfor쓰려고. name : 폼 데이터에 쓰려고. 나눠둔 이유 : 같이쓰면 헤깔려서.
        value = {formData[id]}
        onFocus={focusIn}
        onBlur={focusOut}
        onChange={handleChange}
        />
        }
      {placeholderJudge[id]===""&& formData[id]===""?
        <label id={id} htmlFor={id} className="NamePlaceholderIn">{stringPlacer[id][0]}</label>:
          placeholderJudge[id]==="true"?
            <label id={id} className="NamePlaceholderOut">{stringPlacer[id][0]}</label>:
            id != "passcheck"?
              (formData[id]!=""?
                <label id={id} className="NamePlaceholderOut">{stringPlacer[id][1]}</label>:
                <label id={id} htmlFor={id} className="NamePlaceholderOutWaring">{stringPlacer[id][0]}</label>
              ):
              (formData.pass!=formData.passcheck?
                <label id={id} htmlFor={id} className="NamePlaceholderOutWaring">{stringPlacer[id][1]}</label>:
                formData.passcheck===""?
                <label id={id} htmlFor={id} className="NamePlaceholderOutWaring">{stringPlacer[id][3]}</label>:
                <label id={id} className="NamePlaceholderOut">{stringPlacer[id][2]}</label>
              )
      }
      </>
  );
}


export const SignUp = () => {

  /**
   * 얘는 나중에 auth api로 빼고, 후일 개인정보 수정때 가져다 쓰기
   */
  const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);
  const [address, setAddress] = useState('');//얘는 state로 빼야할듯
  const [zonecode, setZonecode] = useState('');//얘는 state로 빼야할듯

  /**
   * 얘는 나중에 auth api로 빼고, 후일 개인정보 수정때 가져다 쓰기
   */
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

    setAddress(fullAddress); // setAddress를 호출하여 부모 컴포넌트의 상태를 업데이트
    setZonecode(placezonecode)
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",fullAddress,placezonecode)
  };

  /**
   * 얘도 나중에 auth api로 빼고, 후일 개인정보 수정때 가져다 쓰기
   */
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const initialArray =  {id : "", pass : "", passcheck:"", name : "", age:"", gender:"", detailAddress:"", emailAddress:"",emailList:"", phone:""};
  const [formData, setFormData]=useState(initialArray);
  const [placeholderJudge, setPlaceholderJudge] = useState(initialArray);

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData({...formData,  [name] : value})
    console.log(formData)
  }
  const focusIn = (e) =>{
    const {name} = e.target;
    setPlaceholderJudge({...placeholderJudge,  [name] : "true"})
  }

  const focusOut= (e) =>{
    const {name} = e.target;
    setPlaceholderJudge({...placeholderJudge,  [name] : "aftertrue"})
  }

  const sharedData = {
    "formData":formData,
    "focusIn":focusIn,
    "focusOut":focusOut,
    "handleChange":handleChange,
    "placeholderJudge" :  placeholderJudge
  }

  return (
    <>
    <form>
      <div className="SignUpPage">
        <h1 className="SignTitle">회원가입 페이지입니다.</h1>
        <div className = "IdPassSection">
          <h1 className="IdPassTitle">접속 정보란입니다</h1>
          <div className="IdBox">          
            <ConsoleBox id="id" type="text" name="id" {...sharedData}/>
            <button 
            type='button'
            className = 'IdDuplCheck'>중복확인</button>
          </div>
          <div className="PassBox">
            <ConsoleBox id="pass" type="password" name="pass" {...sharedData}/>
            <ConsoleBox id="passcheck" type="password" name="passcheck" {...sharedData}/>
            <button 
            type='button'
            className = 'passlook'>비번보기</button>
          </div>
        </div>
        <div className= "PrivateInfoSection">
          <h1>개인 정보란 입니다</h1>
          <div className = "PrivateInfoBox">
            <ConsoleBox id="name" type="text" name="name" {...sharedData}/>
            <ConsoleBox id="age" type="text" name="age" {...sharedData}/>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="default">성별 선택</option>
              <option value="남자">남성</option>
              <option value="여자">여성</option>
              <option value="기타 혹은 선택거부">통기타/일렉기타/성별기타</option>
            </select>
            <button
              type="button" 
              onClick={handleClick}>주소검색</button>
            {address}
            <ConsoleBox id="detailAddress" type="text" name="detailAddress" {...sharedData}/>
          </div>
        </div>
        <div className = "PrivateConnInfoSection">
          <h1>연락처를 작성해주세요</h1>
          <div className = "PrivateConnInfoBox">
            <div className = "EmailAddressBox">
              <div className = "EmailAddressFront">
                <ConsoleBox id="emailAddress" type="text" name="emailAddress" {...sharedData}/>
              </div>
              <div className = "EmailAddressBack">
                {formData.emailList==="default" ||formData.emailList=== ""?<span></span>:<span>@</span>}
                <select id="emailList" name="emailList" value={formData.emailList} onChange={handleChange}>
                  <option value="default">직접 입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.com">daum.com</option>
                  <option value="gmail.com">gmail.com</option>
                </select>
              </div>
            </div>
            <ConsoleBox id="phone" type="text" name="phone" {...sharedData}/>
          </div>
        </div>
      </div>
      <button type='submit' onSubmit={""}>제출</button>

    </form>
    </>
  );
}

