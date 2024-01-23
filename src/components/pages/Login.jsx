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
    const [currentnMember, setCurrentnMember] = useState({
        cusername :"",
        cuserrole :"",
    }); 
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
                // 토큰으로 username, role 가져오기
                // const responseC = await axios.post("/getIdRole", null, {
                //     headers: {
                //       Authorization: `Bearer ${token}`,
                //     },
                //   });
                // console.log("test : "+responseC.data.currentMember.username)
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
