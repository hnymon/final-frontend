import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const FormContainer = styled.div`
    margin: 50px auto;
    max-width: 600px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    td {
        padding: 10px;
        border: 1px solid #ddd;
    }
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
`;

const StyledButton = styled.input`
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // axios를 사용하여 서버로 데이터 전송
            const response = await axios.post("/login", { username, password });
            
            // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
            if (response.data) {
                // 로그인 성공
                alert("로그인 성공!");
                
                // 토큰을 로컬 스토리지에 저장
                localStorage.setItem("token", response.data.token);
                
                // 로그인 후 리다이렉트 또는 다른 작업 수행
                // 예: 리다이렉트는 React Router를 사용하여 수행할 수 있음
                // history.push("/dashboard");
            } else {
                // 로그인 실패
                alert("로그인 실패. 아이디 또는 비밀번호를 확인해주세요.");
            }
        } catch (error) {
            console.log("Error sending data: ", error);
        }
    };

    return (
        <FormContainer>
            <FormHeader>로그인</FormHeader>
            <form onSubmit={handleSubmit}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>
                                <StyledInput
                                    type="text"
                                    onChange={(event) => setUsername(event.target.value)}
                                    value={username}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <StyledInput
                                    type="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                />
                            </td>
                        </tr>
                    </tbody>
                </StyledTable>
                <br />
                <StyledButton type="submit" value="로그인" />
            </form>
        </FormContainer>
    );
};

export default Login;
