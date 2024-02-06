import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../../img/Logo_n.png';
import arrow from '../../img/down_arrow.png';


const FormContainer = styled.div`
    margin: 50px auto;
    max-width: 550px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align:center;

    td {
        padding: 10px;
        border: 1px solid #ddd;
        /* 일반적인 td 스타일 */
    }

    & td:first-child {
        width:110px;
    }

    & td:last-child {
        /* 마지막 td에 대한 스타일 */
    }
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    
`;

const StyledEmailInput = styled.input`
    width: 48%;
    padding: 8px;
    margin-right: 5px;
    box-sizing: border-box;
`;

const StyledSocialInput = styled.input`
    width: 55%;
    padding: 8px;
    margin-right: 5px;
    box-sizing: border-box;
`;
const StyledSocial2Input = styled.input`
    width: 8%;
    padding: 8px;
    box-sizing: border-box;
    margin-right: 5px;
`;


const StyledSelect = styled.select`
    width: 50%;
    padding: 8px;
    box-sizing: border-box;
    margin-top: 5px;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    background-image: url(${arrow}); /* 화살표 아이콘 이미지 경로 */
    background-position: right 10px top 50%; /* 화살표 위치 조절 */
    background-size: 12px; /* 화살표 크기 조절 */
    background-repeat: no-repeat; /* 화살표 반복 제거 */
`;

const StyledButton = styled.input`
    font-size:1.2rem;
    font-weight: bold;
    width: 100%;
    padding: 5px;
    background-color: #bae3ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 20px; /* 원하는 간격으로 조절하세요 */
`;
const LogoImage = styled.img`
    width: 150px; /* 적절한 크기로 조절 */
    margin: 0 auto; /* 가운데 정렬을 위한 margin 추가 */
    display: block; /* 가운데 정렬을 위해 block 요소로 설정 */
`;
// 중복확인 버튼 : 아이디
const StyledCheckButton = styled.button`
    font-weight: bold;
    font-size:0.9rem;
    width: 45%;
    margin-top: 5px;
    margin-right: 20px;
    padding: 8px;
    height: 100%;
    background-color: ${props => (props.disabled ? "#888" : "#ffa3b5")};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;
// 중복확인 버튼 : 이메일
const StyledCheckButton2 = styled.button`
    font-weight: bold;
    font-size:0.9rem;
    width: 45%;
    margin-top: 5px;
    margin-right: 20px;
    padding: 8px;
    height: 100%;
    background-color: ${props => (props.disabled ? "#888" : "#ffa3b5")};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;
// 이메일 인증 버튼 
const StyledCheckButton3 = styled.button`
    width: 100%;
    margin-top: 5px;
    margin-right: 20px;
    padding: 8px;
    height: 100%;
    background-color: ${props => (props.disabled ? "#888" : "#ffa3b5")};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;
// 코드 확인 
const StyledCheckButton4 = styled.button`
    width: 15%;
    margin-left: 20px;
    padding: 8px;
    height: 100%;
    background-color: ${props => (props.disabled ? "#888" : "#a6b8ff")};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const StyledResetButton = styled.button`
    width: 45%;
    padding: 8px;
    height: 100%; 
    background-color: #ffe8bd;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;


// 다시작성 버튼
const StyledResetButton2 = styled.button`
    width: 45%;
    padding: 8px;
    height: 100%;
    background-color: #ffe8bd;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const StyledMaskedSpan = styled.span`
    letter-spacing: 10px; /* 원하는 간격으로 조절하세요 */
    font-weight:bold;
    padding-left: 10px;
    font-size: 20px;
`;




const SignUp = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState({
        memberName: "",
        username: "",
        password: "",
        email: "",
        domain: "",
        phoneNum: "",
        socialNum1:"",
        socialNum2:""
    });

    const [userPasswordCheck, setUserPasswordCheck] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [randomInitial, setRandomInitial]= useState("");

    if(member.domain ===""){
        console.log(member.email)
    } else{
        console.log(member.email+member.domain)   
    }
    // 이메일 중복확인
    const [isEmailCheckButtonDisabled, setIsEmailCheckButtonDisabled] = useState(false);
    const checkEmail = async (event) => {
        event.preventDefault();
        // 추가적인 유효성 검사가 필요하다면 여기에 추가
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(member.email + member.domain)) {
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        }
        try {
            // 적절한 엔드포인트와 데이터를 사용
            const response = await axios.post("/checkEmail", {
                email: member.email,
                domain: member.domain,
            });

            // 응답에 따라 처리
            if (response.data === "Exist") {
                alert("해당 이메일은 이미 사용중입니다.");
            } else if (response.data === "Empty") {
                alert("이메일을 입력하세요.");
            } else {
                alert(response.data);
                setIsEmailCheckButtonDisabled(true);
            }
        } catch (error) {
            console.log("데이터 전송 중 오류 발생: ", error);
        }
    };
    const [isEmailCheckButton2Disabled, setIsEmailCheckButton2Disabled] = useState(false);
    const checkMemberEmail = async (event) => {
        event.preventDefault();
        if (!isEmailCheckButtonDisabled) {
            alert("이메일 중복확인 해주세요.");
            return;
        }
        // 추가적인 유효성 검사가 필요하다면 여기에 추가

        try {
            alert("해당 이메일로 인증코드를 전송합니다.\n 최대 1분이 소요될 수 있습니다.\n 전송 완료시 전송 완료 창이 나옵니다.")
            // 적절한 엔드포인트와 데이터를 사용
            const response = await axios.post("/checkMemberEmail", {
                email: member.email,
                domain: member.domain,
            });
            console.log(response.data);
            if(response.data==="Success"){
                alert("해당 이메일로 인증 코드를 전송했습니다.\n"+
                "아래 입력칸에 입력해주세요.");
            }else{

            }
            
        } catch (error) {
            console.log("데이터 전송 중 오류 발생: ", error);
        }
    };
    const [isEmailCheckButton3Disabled, setIsEmailCheckButton3Disabled] = useState(false);
    const checkCodeSand = async (event) => {
        event.preventDefault();
        if (!randomInitial) {
            alert("코드를 입력해주세요.");
            return;
        }
        // 추가적인 유효성 검사가 필요하다면 여기에 추가

        try {
            // 적절한 엔드포인트와 데이터를 사용
            const response = await axios.post("/checkCode", {
                email: member.email,
                domain: member.domain,
                randomInitial: randomInitial,
            });
            if(response.data==="Success"){
                setIsEmailCheckButton2Disabled(true);
                setIsEmailCheckButton3Disabled(true);
                alert("이메일 인증이 완료되었습니다. \n모든 필드를 채우고 회원가입 버튼을 눌러주세요.")
            }else {
                alert("코드를 확인해주세요.")
            }
            
        } catch (error) {
            console.log("데이터 전송 중 오류 발생: ", error);
        }
    };

    // 다시작성
    const handleReset2 = () => {
        setMember((prevMember) => ({
            ...prevMember,
            email: "",
            domain: "@naver.com", // 기본값으로 설정하거나 필요에 따라 변경
        }));
        setIsEmailCheckButtonDisabled(false); // 다시작성 버튼 클릭 시 이메일 중복확인 버튼 활성화
        setIsEmailCheckButton2Disabled(false);
        setIsEmailCheckButton3Disabled(false);
    };


    const handleChange = (field, value) => {
        if (field === 'username') {
            const usernameRegex = /^[a-zA-Z0-9]{6,12}$/;
            const isInputValid = value.trim() !== '' && usernameRegex.test(value); // 빈 값이 아닌지와 정규식을 통한 유효성 검사
            setIsUsernameValid(isInputValid);
        }
        if (field === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
            setIsPasswordValid(passwordRegex.test(value));
        }
        if (field === 'memberName') {
            // 이름은 한글로만 이루어지고, 2~5글자
            const nameRegex = /^[가-힣]{2,5}$/;
            setIsNameValid(nameRegex.test(value));
        }
        

        setMember({ ...member, [field]: value });
    };

    const handleDomainChange = (event) => {
        const selectedDomain = event.target.value;
        setMember({ ...member, domain: selectedDomain });
    };

    const formatPhoneNumber = (phoneNumber) => {
        // 전화번호 형식 변환 (000-0000-0000)
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };
    
    const handlePhoneNumChange = (event) => {
        // 입력된 값에서 숫자만 추출
        const newValue = event.target.value.replace(/[^0-9]/g, '');
        // 최대 11자리까지만 받음
        const truncatedValue = newValue.slice(0, 11);
        // 형식 적용하여 state 업데이트
        setMember({ ...member, phoneNum: formatPhoneNumber(truncatedValue) });
    };
    // 주민번호 유효성검사
    const handleSocialNum1Change = (event) => {
        // 입력된 값에서 숫자만 추출
        const newValue = event.target.value.replace(/[^0-9]/g, '');
        // 최대 6자리까지만 받음
        const truncatedValue = newValue.slice(0, 6);
    
        // 형식 및 유효성 검사
        if (truncatedValue.length === 6) {
            const year = parseInt(truncatedValue.substring(0, 2), 10);
            const month = parseInt(truncatedValue.substring(2, 4), 10);
            const day = parseInt(truncatedValue.substring(4, 6), 10);
    
            // 연도는 00~99 사이의 값이어야 함
            if (year < 0 || year > 99) {
                alert("올바른 연도 형식이 아닙니다.");
                return;
            }
    
            // 월은 1~12 사이의 값이어야 함
            if (month < 1 || month > 12) {
                alert("올바른 월 형식이 아닙니다.");
                return;
            }
    
            // 일은 1~31 사이의 값이어야 함 (해당 월에 따라 조정 필요)
            if (day < 1 || day > 31) {
                alert("올바른 일 형식이 아닙니다.");
                return;
            }
        }
    
        // 형식 적용하여 state 업데이트
        setMember((prevMember) => ({ ...prevMember, socialNum1: truncatedValue }));
    };
    
    
    const handleSocialNum2Change = (event) => {
        // 입력된 값에서 숫자만 추출
        const newValue = event.target.value.replace(/[^0-9]/g, '');
        // 최대 7자리까지만 받음
        const truncatedValue = newValue.slice(0, 1);
    
        // 형식 및 유효성 검사
        if (truncatedValue.length === 1) {
            const firstDigit = parseInt(truncatedValue.charAt(0), 10);
    
            // 첫 번째 숫자는 1~4 사이의 값이어야 함
            if (firstDigit < 1 || firstDigit > 4) {
                alert("뒷자리 첫 번째 숫자는 1~4까지만 가능합니다.");
                return;
            }
        }
    
        // 형식 적용하여 state 업데이트
        setMember((prevMember) => ({ ...prevMember, socialNum2: truncatedValue }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // 이름 유효성 검사
        if (!isNameValid) {
            alert("이름은 한글로 2~5글자 사이여야 합니다.");
            return;
        }
        if (!isCheckButtonDisabled) {
            alert("ID 중복확인 해주세요.");
            return;
        }
        if (!isEmailCheckButtonDisabled) {
            alert("이메일 중복확인 해주세요.");
            return;
        }
        // 비밀번호 일치 여부 확인
        if (member.password !== userPasswordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return; 
        }
        
        if (!isPasswordValid) {
            alert("비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)");
            return;
        }
        if (!isEmailCheckButton3Disabled) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }
        if (!member.memberName || !member.username || !member.password || !member.email || !member.phoneNum) {
            alert("모든 필드를 채워주세요.");
            return;
        }
        
        // 전화번호 유효성 검사
        const phoneRegex = /^(010|011)\d{8}$/;
        if (!phoneRegex.test(member.phoneNum.replace(/-/g, ''))) {
            alert("올바른 전화번호 형식이 아닙니다.");
            return;
        }
        try {
            // axios를 사용하여 서버로 데이터 전송
            const response = await axios.post("/join", member);
            console.log(response.data);
            // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
            if (response.data === "ok") {
                console.log(response.data);
                alert(response.data);
                navigate("/");
            } else {
                alert(response.data);
                console.log(response.data);
                
            }
        } catch (error) {
            console.log("Error sending data: ", error);
        }
        console.log("폼 제출됨:", member);
    };

    // 아이디 중복검사
    const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(false);
    const checkId = async (event) => {
        event.preventDefault();
        // 아이디 유효성 검사
        if (!isUsernameValid) {
            alert("아이디는 영문과 숫자로 이루어진 6~12글자여야 합니다.");
            return;
        }
        try {
            // axios를 사용하여 서버로 데이터 전송
            const response = await axios.post("/checkId", member);
            console.log(response.data);
            // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
            if (response.data === "Exist") {
                console.log(response.data);
                alert("이미 존재하는 아이디입니다.");
            } else if(response.data === "Empty") {
                console.log(response.data);
                alert("아이디를 입력하세요.");
            } else {
                alert(response.data);
                console.log(response.data);
                setIsCheckButtonDisabled(true);
            }
        } catch (error) {
            console.log("Error sending data: ", error);
        } 
    }

    // 다시작성(아이디)
    const handleReset = () => {
        setMember((prevMember) => ({
            ...prevMember,
            username: "",
        }));
        setUserPasswordCheck("");
        setIsUsernameValid(false);
        setIsCheckButtonDisabled(false); // reset 버튼 클릭 시 CheckId 버튼 활성화
    };
    
    return (
        <FormContainer>
            <LogoImage src={Logo} alt="logo Img" />
            <form onSubmit={handleSubmit}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td>
                                <StyledInput
                                    type="text"
                                    onChange={(event) =>
                                        handleChange("memberName", event.target.value)
                                    }
                                    value={member.memberName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>아이디</td>
                            <td> {/* 아이디 입력란과 중복체크 버튼을 가로로 정렬 */}
                                <StyledInput
                                    type="text"
                                    onChange={(event) =>
                                        handleChange("username", event.target.value)
                                    }
                                    value={member.username}
                                    disabled={isCheckButtonDisabled} // 중복 확인 버튼이 활성화되면 ID 입력란 비활성화
                                    style={{
                                        backgroundColor: isCheckButtonDisabled ? "#ddd" : "white",
                                    }} // 중복 확인 버튼이 활성화되면 배경색을 회색으로 변경
                                />
                                <br />
                               <StyledCheckButton
                                    onClick={checkId}
                                    disabled={isCheckButtonDisabled}
                                >
                                    아이디 중복확인
                                </StyledCheckButton>
                                <StyledResetButton type="button" onClick={handleReset}>다시작성</StyledResetButton>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <StyledInput
                                    type="password"
                                    onChange={(event) =>
                                        handleChange("password", event.target.value)
                                    }
                                    value={member.password}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호 확인</td>
                            <td>
                                <StyledInput
                                    type="password"
                                    onChange={(event) => setUserPasswordCheck(event.target.value)}
                                    value={userPasswordCheck}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>주민등록번호</td>
                            <td >
                                <StyledSocialInput
                                type="text"
                                onChange={handleSocialNum1Change}
                                value={member.socialNum1}
                                />
                                <span style={{fontWeight:"bold"}}>-&nbsp;</span>
                                <StyledSocial2Input
                                style={{fontWeight:"bold"}}
                                type="text"
                                onChange={handleSocialNum2Change}
                                value={member.socialNum2}
                                />
                                <StyledMaskedSpan >******</StyledMaskedSpan>
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>
                                <StyledEmailInput
                                    type="text"
                                    onChange={(event) =>
                                        handleChange("email", event.target.value)
                                    }
                                    disabled={isEmailCheckButtonDisabled}
                                    value={member.email}
                                />
                                <StyledSelect
                                    name="domain"
                                    onChange={handleDomainChange}
                                    value={member.domain}
                                >
                                    <option value="">직접입력</option>
                                    <option value="@naver.com">@naver.com</option>
                                    <option value="@google.com">@google.com</option>
                                    <option value="@daum.net">@daum.net</option>
                                </StyledSelect>
                                <StyledCheckButton2
                                    onClick={checkEmail}
                                    disabled={isEmailCheckButtonDisabled}
                                >
                                    이메일 중복확인
                                </StyledCheckButton2>
                                <StyledResetButton2 type="button" onClick={handleReset2}>
                                    다시작성
                                </StyledResetButton2>
                            </td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td>
                                <StyledInput
                                    type="text"
                                    onChange={handlePhoneNumChange}
                                    value={member.phoneNum}
                                />
                            </td>
                        </tr>
                    </tbody>
                </StyledTable>
                <StyledCheckButton3 
                    onClick={checkMemberEmail}
                    disabled={isEmailCheckButton2Disabled}
                >이메일 인증코드 보내기</StyledCheckButton3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <StyledInput
                        type="text"
                        onChange={(event) => setRandomInitial(event.target.value)}
                        value={randomInitial}
                        disabled={isEmailCheckButton3Disabled}
                        style={{width:"150px" , marginTop:"10px", marginBottom:"10px"}}
                    />
                    <StyledCheckButton4 
                    onClick={checkCodeSand}
                    disabled={isEmailCheckButton3Disabled}
                >코드 확인</StyledCheckButton4>
                </div>
                <StyledButton type="submit" value="회원가입" />
            </form>
        </FormContainer>
    );
};

export default SignUp;
