import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../feature/authSlice.js'

export const store = configureStore({
    reducer : {
        "auth" : authSlice
    },
})