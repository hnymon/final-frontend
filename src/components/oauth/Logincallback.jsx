import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessCookie, setAccessCookie, setRefreshCookie } from "../cookie/cookie";
import { CartCountContext } from "../layout/Layout";
import GetTokenToHeader from "../../token/GetTokenToHeader";

const LoginCallback = () =>{
    const navigate = useNavigate();
    
    const token = new URL(window.location.href).searchParams.get("accessToken");
    const refreshToken = new URL(window.location.href).searchParams.get("refreshToken");
    const { cartCount, setCartCount } = useContext(CartCountContext);
    
    const getCartCount = () =>{
        const headers = GetTokenToHeader();
        axios
          .get("/cart/count", headers)
          .then((response) => {
            setCartCount(response.data);
            console.log('장바구니 데이타', response ,response.data);
          })
          .catch((error) => {
            console.error('장바구니 아이템 개수 조회 오류:', error);
          });
    }

    useEffect(() => {
        if(token){
            // localStorage.setItem("token", token)
            // localStorage.setItem("refreshToken", refreshToken)
            console.log(token);
            console.log(refreshToken);
            setAccessCookie(token);
            setRefreshCookie(refreshToken);

            getCartCount();
            
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