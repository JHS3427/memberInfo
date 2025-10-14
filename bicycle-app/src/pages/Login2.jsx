

//외부 로그인의 경우 카톡/네이버/구글 정도? - 이건 다 완료하고 추가사항으로

export function Login(){
    return(
        <>
        <h1>로그인 페이지</h1>
        <form onSubmit={""}>
            <ul>
                <li>아이디 <input type="text" name="id"/></li>
                <li>비밀번호 <input type="password" name="pass"/></li>
                <li><button type = "submit">로그인</button></li>
                <li><button type = "reset">비우기</button></li>
            </ul>
            <h2>외부 로그인</h2>
        </form>
        </>

    );
}