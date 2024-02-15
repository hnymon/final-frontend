import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessCookie, setAccessCookie, setRefreshCookie } from "../cookie/cookie";

const LoginCallback = () =>{
    const navigate = useNavigate();
    
    const token = new URL(window.location.href).searchParams.get("accessToken")
    const refreshToken = new URL(window.location.href).searchParams.get("refreshToken")



    useEffect(() => {
        if(token){
            // localStorage.setItem("token", token)
            // localStorage.setItem("refreshToken", refreshToken)
            console.log(token);
            console.log(refreshToken);
            setAccessCookie(token);
            setRefreshCookie(refreshToken);
            console.log(getAccessCookie);

            alert("소셜 로그인 성공!");
            navigate("/");
        }else{
            alert("소셜 로그인 실패...");
        }
    }, [token, refreshToken, navigate]);
    return null;

    // useEffect(() => {

    //     console.log('로그인');
    //     console.log(token);
    //     console.log(refreshToken);
    //     // if(getCookie('accessToken') !==''){
    //     //     console
    //     //     // localStorage.setItem("token", token)
    //     //     // localStorage.setItem("refreshToken", refreshToken)

    //     //     alert("소셜 로그인 성공!");
    //     //     navigate("/");
    //     // }else{
    //     //     alert("소셜 로그인 실패...");
    //     // }
    // }, []);
    // return null;



}

export default LoginCallback;