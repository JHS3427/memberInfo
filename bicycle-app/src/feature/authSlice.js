import { createSlice } from '@reduxjs/toolkit'
import { Login } from '../pages/Login2'

const initialState = {
    isLogin : false
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
        kakaoLogin(state,action){
            state.isLogin=!state.isLogin;
            const {token} = action.payload;
            const loginInfo = {"token":token,"userId":"kakao"}
            localStorage.setItem("loginInfo",JSON.stringify(loginInfo));
        }
    }
})

export const {login,logout,kakaoLogin} = authSlice.actions

export default authSlice.reducer