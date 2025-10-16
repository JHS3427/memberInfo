import KakaoLogin from "react-kakao-login";

const SocialKakao =()=>{

    const kakaoClientId = 'JavaScript KEY'
    const kakaoOnSuccess = async (data)=>{
      	console.log(data)
        const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };
    return(
        <>
          <KakaoLogin
              token={kakaoClientId}
              onSuccess={kakaoOnSuccess}
              onFail={kakaoOnFailure}
          />
        </>
    )
}

export default SocialKakao
//출처: https://stack94.tistory.com/entry/React-카카오Kakao-로그인-구현해보기#google_vignette [느린 개발자:티스토리]