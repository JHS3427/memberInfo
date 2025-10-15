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

        },
        logout(state){
            state.isLogin=!state.isLogin;

        }
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer