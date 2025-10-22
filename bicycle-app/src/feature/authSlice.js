import { createSlice } from '@reduxjs/toolkit'
import { Login } from '../pages/Login2'

const initialState = {
    isLogin : false,
    accessKakao : false,
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login(state,action){
            state.isLogin=!state.isLogin;
            const {userId} = action.payload;
            const loginInfo = {"token":"1234","userId":userId}
            //로컬스토리지에 토큰이랑 아이디 정보 입력
        },
        logout(state){
            state.isLogin=!state.isLogin;

        },
        socialLogin(state,action){
            state.isLogin=!state.isLogin;
            const {token , social} = action.payload;
            const loginInfo = {"token":token,"userId":"kakao_or_naver","social": social}
            localStorage.setItem("loginInfo",JSON.stringify(loginInfo));
        }
    }
})

export const {login,logout,socialLogin} = authSlice.actions

export default authSlice.reducer