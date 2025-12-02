import { SignUp_InputBox } from "../SignUp/InputBox/SignUp_InputBox"

export function MyPage_InputSection({dataChangeButtonOnOff,nameString,handleChange,DataChangeClose,IdDupleCheck,idChecker,DataChangeOpen,info,name}){
    return(
    <>
        {dataChangeButtonOnOff[name]?
        <>
            <span>{nameString[name]} 변경 </span>
            <SignUp_InputBox name = {name} handleChange={handleChange}/>
            <button name={name} onClick={DataChangeClose}> 취소</button>
            {name==="uid"?
                idChecker?<button>중복 체크 OK </button>:<button onClick={IdDupleCheck}>중복 체크</button>
            :""}
        </>:
        <>  
            {info[name]} <button name={name} onClick={DataChangeOpen}> {nameString[name]} 수정</button>
        </>}
    </>
    )
}