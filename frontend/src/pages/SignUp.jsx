/*
    조해성
    설명 : 회원가입 페이지이지만 현재 틀만 만들어 둔 상태.
    후일 개선 사항 : 해당 내용을 작성 중 에러 처리, 저장 기능 등 기능 추가 예정.
*/

import '../styles/signup.css';
import React, {useState} from 'react'


const ConsoleBox = ({ 
    id, type, name, 
    formData, focusIn, focusOut, handleChange, placeholderJudge}) =>{
  return(
    <>
      <input id={id} type={type} name ={name} // id 사용이유 : 하단의 label에서 htmlfor쓰려고. name : 폼 데이터에 쓰려고. 나눠둔 이유 : 같이쓰면 헤깔려서.
        value = {formData[id]}
        onFocus={focusIn}
        onBlur={focusOut}
        onChange={handleChange}/>
      {placeholderJudge[id]===""&& formData[id]===""?
        <label id={id} htmlFor={id} className="NamePlaceholderIn">{id}을 입력해주세요</label>:
          placeholderJudge[id]!=""&& formData[id]===""?
            <label id={id} htmlFor={id} className="NamePlaceholderOut">{id}을 입력해주세요</label>:
            <label id={id} htmlFor={id} className="NamePlaceholderOut">{id}을 입력하셨습니다.</label>
      }
      </>
  );
}


export const SignUp = () => {


  const initialArray =  {id : "", pass : "", passcheck:"", name : "", age:"", sex:"", address:"", emailAddress:"", phone:""};
  const [formData, setFormData]=useState(initialArray);
  const [placeholderJudge, setPlaceholderJudge] = useState(initialArray);

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData({...formData,  [name] : value})
    console.log(name);
    console.log(formData);
  }
  const focusIn = (e) =>{
    const {name} = e.target;
    setPlaceholderJudge({...placeholderJudge,  [name] : "true"})
  }

  const focusOut= (e) =>{
    const {name} = e.target;
    setPlaceholderJudge({...placeholderJudge,  [name] : ""})
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
    <div className="SignUpPage">
      <h1 className="SignTitle">회원가입 페이지입니다.</h1>
      <div className = "IdPassSection">
        <div className="IdBox">          
          <ConsoleBox id="id" type="text" name="id" {...sharedData}/>
          <button 
          type='button'
          className = 'IdDuplCheck'>가나다라마</button>
        </div>
        <div className="PassBox">
          <ConsoleBox id="pass" type="password" name="pass" {...sharedData}/>
          <ConsoleBox id="passcheck" type="password" name="passcheck" {...sharedData}/>
        </div>
      </div>
      <div className= "PrivateInfoSection">
        <div className = "PrivateInfoBox">
          <ConsoleBox id="name" type="text" name="name" {...sharedData}/>
          <ConsoleBox id="age" type="text" name="age" {...sharedData}/>
          {/* <ConsoleBox id="sex" type="text" name="sex" {...sharedData}/> */}
          <ConsoleBox id="address" type="text" name="address" {...sharedData}/>
        </div>
      </div>
    </div>
    </>
  );
}

