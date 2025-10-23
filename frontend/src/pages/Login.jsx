/*
설명 : 로그인을 위한 페이지입니다
    소셜 로그인의 경우 현재 백엔드로 가는 길을 막기 위해 무력화시켜둔 상태입니다.
    일반 로그인의 경우 아이디(test), 비밀번호(1234)를 입력하면 islogin=true로 바뀌고, 이에따라 페이지 하단이 변경됩니다. 
*/



import {useState,useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getLogin,getFlatformName} from '../feature/auth/authAPI';
import { Link } from 'react-router-dom';
export function Login() {
    //플랫폼에 oauth 요청을 위한 필요 정보 값.
    const Rest_api_key='ef9794cb2ff6a12a26f6432f5ec9a04b' //카카오 EST API KEY
    const NAVER_CLIENT_ID = "qxdiERkzD3t06kqHGYdp"; // 네이버 발급받은 Client ID
    const STATE = "flase";

    const redirect_uri = 'http://localhost:3000/auth' //Redirect URI
    // 플랫폼별 oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${redirect_uri}`;

    //로그인 여부 확인
    const isLogin = useSelector((state)=>state.auth.isLogin)
    
    //소셜로그인이 아닌 일반 로그인을 위한 값 세팅.
    const initialsetting = {id:"",pass : ""};
    const [formData,setFormData] = useState(initialsetting);
    const [errors,setErrors] = useState(initialsetting);
    const idRef = useRef(null);
    const passRef = useRef(null);
    const dispatch = useDispatch();

    const handleSocialLogin = (e)=>{
        const flatformName = e.target.id;
        if(flatformName === "kakao")
        {
            // 팀프로젝트 업로드를 위해 백엔드쪽으로 가는 길 임시 차단.
            // sessionStorage.setItem("social","kakao");
            // window.location.href = kakaoURL;
        }
        else if (flatformName === "naver")
        {
            // 팀프로젝트 업로드를 위해 백엔드쪽으로 가는 길 임시 차단.
            // sessionStorage.setItem("social","naver");
            // window.location.href = NAVER_AUTH_URL;
        }
    }

    //로그인 페이지에 직접 입력하는 경우 칸에 값이 입력됨에 따라 변화함을 감지
    const handleformchange=(e)=>{
        const{name,value} = e.target;
        setFormData({...formData,[name]:value});
        setErrors(initialsetting)
        // console.log(formData.id);
        // console.log(formData.pass);
    }

    //제출버튼을 누르면 변화 발생. - 미완성(에러는 없음)
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

    return (
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
            <button onClick={handleSocialLogin} id = "kakao">카카오 로그인</button>
            <button onClick={handleSocialLogin} id = "naver">네이버 로그인</button>
            <>
                {isLogin?
                <>
                <h1>12123213</h1>
                <Link to="/">홈</Link>
                </>:
                <h1>44444444444444</h1>}
            </>
            <div>
                <Link to ="/signUp">회원가입</Link>
            </div>
        </>
    );
}