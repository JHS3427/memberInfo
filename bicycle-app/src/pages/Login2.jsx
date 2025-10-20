import {useState,useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getLogin,getFlatformName } from '../feature/authAPI.js';
import { Link } from 'react-router-dom';
//외부 로그인의 경우 카톡/네이버/구글 정도? - 이건 다 완료하고 추가사항으로

export function Login(){

    const Rest_api_key='ef9794cb2ff6a12a26f6432f5ec9a04b' //카카오 EST API KEY
    const NAVER_CLIENT_ID = "qxdiERkzD3t06kqHGYdp"; // 네이버 발급받은 Client ID
    const STATE = "flase";

    const redirect_uri = 'http://localhost:3000/auth' //Redirect URI
    
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${redirect_uri}`;


    const isLogin = useSelector((state)=>state.auth.isLogin)
    
    const initialsetting = {id:"",pass : ""};
    const [formData,setFormData] = useState(initialsetting);
    const [errors,setErrors] = useState(initialsetting);
    const idRef = useRef(null);
    const passRef = useRef(null);
    const dispatch = useDispatch();


    const handleLogin = (e)=>{
        const flatformName = e.target.id;
        //디스패치로 현재 접속시도한 플랫폼 이름 넘겨주고, auth파일에서 해당 플랫폼에 따라 접속시도 바꿔주기.
        if(flatformName === "kakao")
        {
            window.location.href = kakaoURL;
        }
        else if (flatformName === "naver")
        {
            window.location.href = NAVER_AUTH_URL;
        }
    }

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
            <button onClick={handleLogin} id = "kakao">카카오 로그인</button>
            <button onClick={handleLogin} id = "naver">네이버 로그인</button>
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