import { useLocation } from "react-router-dom"


export function IdPwSearch(){

  const location = useLocation();
  // location.state 객체에서 type 값을 구조 분해 할당으로 가져옴
  const { type } = location.state

    return(
        <>
        <div>
            <h1>여기는 선택창입니다. 아이디 찾기 탭과 비밀번호 바꾸기 탭이 들어갈겁니다</h1>
            <ul>
                <li>계정 아이디 찾기</li>
                <li>계정 비밀번호 변경하기</li>
            </ul>
        </div>
        {type==="findId"?
            <div>
                <h1>여기는 아이디찾기 내용이 들어갈 부분입니다</h1>
                <ul>이 ul태그에 삼항 연산자를 사용하여 아이디찾기 탭과 비밀번호 바꾸기 탭이 들어갈 예정입니다.
                </ul>
            </div>:
            <div>
            <h1>여기는 비밀번호 변경 내용이 들어갈 부분입니다</h1>
            <ul>이 ul태그에 삼항 연산자를 사용하여 아이디찾기 탭과 비밀번호 바꾸기 탭이 들어갈 예정입니다.
            </ul>
        </div>}
        
        </>
    )
}