import { useEffect } from "react";
import { getkakaotoken } from "../feature/authAPI.js";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export function Auth(){
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const code = new URL(window.location.href).searchParams.get("code");
    const social = sessionStorage.getItem('social');
    console.log("authcode: ",code);

    useEffect(()=>{
        console.log(code);
        console.log(social);
        dispatch(getkakaotoken(code,social))
        if(localStorage.getItem("loginInfo"))
        {
            navigate('/')
        }
        else{
        }
    },[])

    return(<></>);
}