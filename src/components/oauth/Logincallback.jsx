import { useNavigate } from "react-router-dom";

const LoginCallback = () =>{
    const navigate = useNavigate();
    const token = new URL(window.location.href).searchParams.get("accessToken")
    const refreshToken = new URL(window.location.href).searchParams.get("refreshToken")

    if(token){
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
        alert("소셜 로그인 성공!");
        navigate("/");
    }else{
        alert("소셜 로그인 실패...");
    }

}

export default LoginCallback;