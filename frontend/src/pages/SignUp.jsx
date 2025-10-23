/*
    조해성
    설명 : 회원가입 페이지이지만 현재 틀만 만들어 둔 상태.
    후일 개선 사항 : 해당 내용을 작성 중 에러 처리, 저장 기능 등 기능 추가 예정.
*/

export function SignUp(){
    return(
        <>
        <div>
            <h1>회원가입 페이지</h1>
            <ul>
                <li>아이디 <input type="text" name="id"/></li>
                <li>비밀번호 <input type="password" name="pass"/></li>
                <li>이름 <input type="text" name="id"/></li>
                <li>나이 <input type="text" name="id"/></li>
                <li>주소 <input type="text" name="id"/></li>
                <li>성별 <input type="text" name="id"/></li>
                <li>이메일 주소 <input type="text" name="id"/></li>
                <li>휴대폰 번호 <input type="text" name="id"/></li>
                <li><button type = "submit">가입</button></li>
                <li><button type = "reset">비우기</button></li>
            </ul>
        </div>
        </>
    );
}