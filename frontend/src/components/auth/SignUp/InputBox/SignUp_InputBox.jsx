

import { SignUp_Label } from '../InputBox/SignUp_Lable';

export function SignUp_InputBox({id, type, name,formData, focusIn, focusOut, handleChange, placeholderJudge,inputRefs,stringPlacer}){

    const inputed_data = {id, type, name,formData, focusIn, focusOut, handleChange, placeholderJudge,inputRefs,stringPlacer}

    //focus를 하기 위해 ref값(이름) 세팅
    const refToConnect = inputRefs[`${id}Ref`];

    return(
        <>
        <div className='ConsoleBoxWrapper'>
            {/*입력 후 마우스를 다른곳으로 옮겼을 때, 빈칸이면 경고식으로 빨간색 테두리 생김*/}
            {placeholderJudge[id]==="aftertrue" && formData[id]===""?
                <input id={id} type={type} name ={name} 
                    ref={refToConnect}
                    value = {formData[id]}
                    onFocus={focusIn}
                    onBlur={focusOut}
                    onChange={handleChange}
                    style={{borderBottom : "2px solid red"}} // <--- border: "2px solid red" 대신 borderBottom으로 변경
                    />:
                <input id={id} type={type} name ={name} 
                    ref={refToConnect}
                    value = {formData[id]}
                    onFocus={focusIn}
                    onBlur={focusOut}
                    onChange={handleChange}
                    />
                    }
            <SignUp_Label {...inputed_data}/>
        </div>
        </>
    )
}