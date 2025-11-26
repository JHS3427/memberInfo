

export const AuthInputBox=({boxType, handleInfo,value})=>{


    const dataRiser=(e)=>{
        const {name, value} = e.target;
        handleInfo(name,value)
    }

    return <input name={boxType} onChange={dataRiser} value={value}/>;
}

export const AuthInputButton = ({buttonType,Clicker,onClick}) =>{

    const setselectedTap=()=>{
        Clicker(buttonType);
        onClick();
    }
    return(
        <>
            {
                buttonType==="Id"?
                    <button onClick={setselectedTap}>아이디 찾기 전 인증 하기</button>:
                    buttonType==="Pw"?
                        <button onClick={setselectedTap}>비밀번호 바꾸기 전 인증 하기</button>:
                        <button onClick={setselectedTap}>인증 요청 하기</button>
            }
        </>
    )
}