import {useState,useRef} from 'react';
import { useDispatch } from 'react-redux';
import { getLogin } from '../feature/authAPI.js';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
//외부 로그인의 경우 카톡/네이버/구글 정도? - 이건 다 완료하고 추가사항으로

export function Login(){
    
    const isLogin = useSelector((state)=>state.auth.isLogin)
    
    const initialsetting = {id:"",pass : ""};
    const [formData,setFormData] = useState(initialsetting);
    const [errors,setErrors] = useState(initialsetting);
    const idRef = useRef(null);
    const passRef = useRef(null);
    const dispatch = useDispatch();



    const handleformchange=(e)=>{
        const{name,value} = e.target;//인풋타입의 네임과 벨류값 추출
        setFormData({...formData,[name]:value});
        setErrors(initialsetting)
        // console.log(formData.id);
        // console.log(formData.pass);
    }

    const handleLoginSubmit = (e)=>{
        e.preventDefault();
        const param = {
            idRef : idRef,
            passRef : passRef,
            setErrors : setErrors,
            errors : errors
        }

        const succ = dispatch(getLogin(formData,param));
        
    }

    return(
        <>
            <h1>로그인 페이지</h1>
            <ul>
                <form onSubmit={handleLoginSubmit}>
                    <li>
                        <div>아이디 <input type="text" 
                                name="id"
                                onChange={handleformchange}
                                ref = {idRef}/>
                        </div>
                        <span>{errors.id}</span>
                    </li>
                    <li>
                        <div>비밀번호 <input type="password"
                                name="pass"
                                onChange={handleformchange}
                                ref= {passRef}/>
                        </div>
                        <span>{errors.pass}</span>
                    </li>
                    <li><button type = "submit">로그인</button></li>
                    <li><button type = "reset">비우기</button></li>
                </form>
            </ul>
            <h2>외부 로그인</h2>
            <>
                {isLogin?
                <>
                <h1>12123213</h1>
                <Link to="/">홈</Link>
                </>:
                <h1>44444444444444</h1>}
            </>
        </>
    );
}

//폼의 온서브밋 눌러 > 데이터 비어있는지 확인해>저장된거랑 맞는지 확인해> 통과