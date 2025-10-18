import { useEffect } from "react";
import { getkakaotoken } from "../feature/authAPI.js";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export function Auth(){
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("authcode: ",code);

    useEffect(()=>{
        dispatch(getkakaotoken(code))
        if(localStorage.getItem("loginInfo"))
        {
            navigate('/')
        }
        else{
        }
    },[])

    return(<></>);
}