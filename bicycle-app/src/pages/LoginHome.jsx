import { Link } from "react-router-dom";

export function LoginHome(){
    return(
        <div>
            <h1>로그인 홈</h1>
            <ul>
                <Link to="/login"><li>로그인</li></Link>
                <Link to="/signup"><li>회원가입</li></Link>
                <li>아이디, 비밀번호 찾기</li>
            </ul>
        </div>
    );
}