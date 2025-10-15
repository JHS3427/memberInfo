export const validateFormCheck = ({idRef,passRef,setErrors,errors}) => {
    if(idRef.current.value===""){
        setErrors({...errors,id:"아이디를 입력하세요"})
        idRef.current.focus();
        return false;
    }
    else if(passRef.current.value===""){
        setErrors({...errors,pass:"비밀번호를 입력하세요"})
        passRef.current.focus();
        return false;
    }
    return true;
}