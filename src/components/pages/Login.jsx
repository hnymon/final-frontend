import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from '../../img/Logo_n.png';
import NaverLoginButton from "../oauth/NaverLoginButton";
import KakaoLoginButton from "../oauth/KakaoLoginButton";
import GoogleLoginButton from "../oauth/GoogleLogin";
import { setAccessCookie, setRefreshCookie } from "../cookie/cookie";
import GetTokenToHeader from "../../token/GetTokenToHeader";
import { CartCountContext } from "../layout/Layout";
import { Cookies } from "react-cookie";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 81vh; /* 화면 세로 중앙 정렬을 위해 */
    
`;

const LogoImage = styled.img`
    width: 150px; /* 적절한 크기로 조절 */
`;

const FormContainer = styled.div`
    margin: 10px auto 0 auto;
    max-width: 400px; /* 최대 넓이 설정 */
    width: 80%; /* 또는 다른 값을 설정하여 원하는 넓이로 조절 */
    padding: 10px;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: center;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px; /* 테두리 둥글게 설정 */
`;

const StyledButton = styled.input`
    width: 100%;
    padding: 10px;
    background-color: pink;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
`;
const StyledNavLink = styled(NavLink)`
    color: pink;
    border: 5px solid pink;
    border-radius: 4px;
    display: inline-block;
    padding: 10px 20px;
    background-color: white;
    text-decoration: none;
`;


const SocialLogo = styled.div`
    display: flex;
    margin-bottom: 30px;
`

const SaveAndFind = styled.div`
    display: flex;
    justify-content: space-between; /* 왼쪽과 오른쪽에 각각 배치 */
    margin-bottom: 10px;
    width:30%;
`;

const SaveId = styled.div`
    flex: 1; /* 부모 요소 내에서 동적으로 공간을 할당받도록 설정 */
`;

const FindIdOrPwd = styled.div`
    flex: 1; /* 부모 요소 내에서 동적으로 공간을 할당받도록 설정 */
    text-align: right; /* 오른쪽 정렬 */
`;


const Login = () => {
    useEffect(()=>{

    },[])


    const navigate = useNavigate();
    const cookies = new Cookies();
    const getSabveId = () =>{
        if(cookies.get("saveId")!==null||cookies.get("saveId")!==undefined){
            return cookies.get("saveId");
        } else{
            return("");
        }
    };
    const checkBox = () => {
        if(cookies.get("saveId")===undefined){
            return false;
        } else{
            return true;
        }
    }
    const [isChecked, setIsChecked] = useState(checkBox());
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    const [username, setUsername] = useState(getSabveId());
    const [password, setPassword] = useState("");
    const { cartCount, setCartCount } = useContext(CartCountContext);
    const headers = GetTokenToHeader();
    // const getCartCount = () =>{
    //     axios
    //       .get("/cart/count", headers)
    //       .then((response) => {
    //         setCartCount(response.data);
    //         console.log('장바구니 데이타', response.data);
    //       })
    //       .catch((error) => {
    //         console.error('장바구니 아이템 개수 조회 오류:', error);
    //         setCartCount(0);
    //       });
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // axios를 사용하여 서버로 데이터 전송
            const response = await axios.post("/login", { username, password });
            const token = response.headers.authorization.split(" ")[1];
            console.log(response.headers)
            // const authorizationRefresh = response.headers['authorization-refresh'];
            // const refreshToken = authorizationRefresh.split(" ")[1];
            // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
            if(isChecked){
                console.log("아이디저장")
                cookies.set("saveId", username);
            } else{
                cookies.remove("saveId")
            }
            if (response) {
                setAccessCookie(token);
                // 토큰을 로컬 스토리지에 저장
                // localStorage.setItem("token", token);
                // setRefreshCookie('refreshToken', token);
                console.log("로그인 성공");
                console.log(token);

                // getCartCount();
                // console.log("리프레시 토큰", refreshToken);
                // 로그인 성공
                alert("로그인 성공!");
                navigate("/");
                // 토큰으로 username, role 가져오기
                // const responseC = await axios.post("/getIdRole", null, {
                //     headers: {
                //       Authorization: `Bearer ${token}`,
                //     },
                //   });
                // if(responseC.data.result === "Success"){
                //     console.log(responseC.data.result)
                //     console.log(responseC.data.member.username)
                //     console.log(responseC.data.member.memberName)
                //     console.log(responseC.data.member.email)
                //     console.log(responseC.data.member.phoneNum)
                //     console.log(responseC.data.member.role)
                // }else {
                //     console.log(responseC.data.result)
                // }
            } else {
                // 로그인 실패
                alert("로그인 실패. 아이디 또는 비밀번호를 확인해주세요.");
            }
        } catch (error) {
            alert("로그인 실패. 아이디 또는 비밀번호를 확인해주세요.");
            console.log("Error sending data: ", error);
        }
    };



    return (
        <PageContainer>
            <LogoImage src={Logo} alt="logo Img" />
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <StyledTable>
                        <tbody>
                            <tr>
                                <td>
                                    <StyledInput
                                        type="text"
                                        onChange={(event) => setUsername(event.target.value)}
                                        value={username}
                                        placeholder="아이디를 입력해주세요"
                                    />
                                    <br />
                                    <StyledInput
                                        type="password"
                                        onChange={(event) => setPassword(event.target.value)}
                                        value={password}
                                        placeholder="비밀번호를 입력해주세요"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </StyledTable>
                    <br />
                    <StyledButton type="submit" value="로그인" />
                </form>
            </FormContainer>
            <SaveAndFind>
                <SaveId>
                    <input
                        type="checkbox"
                        id="saveIdCheckbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="saveIdCheckbox" style={{cursor:"pointer"}}>아이디 저장</label>
                </SaveId>
                <FindIdOrPwd>
                    <StyledLink to={"/find"}><span>아이디 / 비밀번호 찾기</span></StyledLink>
                </FindIdOrPwd>
            </SaveAndFind>
            <SocialLogo>
                <NaverLoginButton/>
                <KakaoLoginButton/>
                <GoogleLoginButton/>
            </SocialLogo>
            <p>구글 로그인 승인 대기중</p>
            <StyledNavLink to="/signup">
                회원가입
            </StyledNavLink>
            <useGeolocation/>
        </PageContainer>
    );
};

export default Login;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;