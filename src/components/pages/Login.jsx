import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../../img/Logo_n.png';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh; /* 화면 세로 중앙 정렬을 위해 */
`;

const LogoImage = styled.img`
    width: 150px; /* 적절한 크기로 조절 */
`;

const FormContainer = styled.div`
    margin: 20px auto;
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
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // axios를 사용하여 서버로 데이터 전송
            const response = await axios.post("/login", { username, password });
            const token = response.headers.authorization.split(" ")[1];
            // console.log(axios.defaults.headers.common.Authorization = `Bearer ${token}`); 

            // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
            if (response) {
                // 토큰을 로컬 스토리지에 저장
                localStorage.setItem("token", token);
                console.log("로그인 성공");
                console.log(token);
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
            
           
            <StyledNavLink to="/signup">
                회원가입
            </StyledNavLink>
        </PageContainer>
    );
};

export default Login;