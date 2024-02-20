import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import arrow from '../../img/down_arrow.png';
import { useNavigate } from "react-router-dom";
import GetTokenToHeader from "../../token/GetTokenToHeader";
import { removeAccessCookie, removeRefreshCookie } from "../cookie/cookie";

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.div`
    float: left;
    text-align: left; /* 추가: 텍스트 왼쪽 정렬 */
    font-weight: bold;
    color: #333333;
    font-size: 24px;
    margin-top: 10px;
`
const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
    border-top: 3px solid #aaaaaa;
    border-bottom: 3px solid #aaaaaa;
`;
const TableHeader = styled.th`
    width: 31.5%;
    height: 40px;
    padding: 8px;
    text-align: center;
    border-right: 2px solid #cccccc;
    font-size:25px;
`;

const TableCell = styled.td`
    font-size:20px;
    padding: 15px;
    text-align: left;
    position: relative;
    padding-left: 40px;
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
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
`;
const StyledButton = styled.input`
    font-size:1.2rem;
    font-weight: bold;
    width: 45%;
    padding: 5px;
    background-color: #bae3ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 20px;
    margin: 5px; /* 버튼 간의 간격 조정 */
    &:last-child{
        background-color: #ffe8bd;
    }
`;
const StyledDeleteButton = styled.input`
    font-size:1.2rem;
    font-weight: bold;
    width: 20%;
    padding: 5px;
    background-color: #ff7d7d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 10px;
    text-align: center;
    margin: 5px; /* 버튼 간의 간격 조정 */
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
// 다시작성 버튼
const StyledResetButton2 = styled.button`
    width: 45%;
    padding: 8px;
    height: 100%;
    font-weight: bold;
    background-color: #ffe8bd;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const EditMemberInfo = (props) => {
    
    const navigate = useNavigate();
    const [member, setMember] = useState({
        memberNum: "",
        memberName: "",
        username: "",
        password: "",
        email: "",
        domain: "",
        phoneNum: "",
        socialNum1:"",
        socialNum2:""
    });
    const [memberInfo, setMemberInfo] = useState({});
    const [userPasswordCheck, setUserPasswordCheck] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPasswordDisabled, setIsPasswordDisabled] = useState(false);
    const [randomInitial, setRandomInitial]= useState("");
    const [userId, setUserId] = useState("");
    console.log(member)    
    
    useEffect(() => {
        console.log("useEffect")
        const fetchMemberInfo = async () => {
            try {
                const headers = GetTokenToHeader();
                const response = await axios.post("/getMemberInfo", null, headers,
                );
                if (response.data.result === "Success") {
                    setMemberInfo({
                        memberNum: response.data.currentMember.memberNum,
                        memberName: response.data.currentMember.memberName,
                        password: "",
                        email: response.data.currentMember.email,
                        domain:"",
                        phoneNum: response.data.currentMember.phoneNum,
                    });
                    setMember({
                        memberNum: response.data.currentMember.memberNum,
                        memberName: response.data.currentMember.memberName,
                        password: "",
                        email: response.data.currentMember.email,
                        domain:"",
                        phoneNum: response.data.currentMember.phoneNum,
                    })
                    if(response.data.currentMember.socialType === "GOOGLE" || 
                       response.data.currentMember.socialType === "KAKAO" || 
                       response.data.currentMember.socialType === "NAVER"){
                        setUserId(response.data.currentMember.socialType + " 로그인 회원입니다.");
                        setIsPasswordDisabled(true)
                    } else {
                        setUserId(response.data.currentMember.username);
                    }
                }
            } catch (error) {
                console.error("Error fetching member info:", error);
            }
        };
        fetchMemberInfo();
        setUserPasswordCheck("");
        setRandomInitial("");
    }, [props.flag]);

    
    // 이메일 중복확인
    const [isEmailCheckButtonDisabled, setIsEmailCheckButtonDisabled] = useState(true);
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
    const [isEmailCheckButton2Disabled, setIsEmailCheckButton2Disabled] = useState(true);
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
    const [isEmailCheckButton3Disabled, setIsEmailCheckButton3Disabled] = useState(true);
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
            domain: "", // 기본값으로 설정하거나 필요에 따라 변경
        }));
        setIsEmailCheckButtonDisabled(false); // 다시작성 버튼 클릭 시 이메일 중복확인 버튼 활성화
        setIsEmailCheckButton2Disabled(false);
        setIsEmailCheckButton3Disabled(false);
    };
    const handleChange = (field, value) => {       
        if (field === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
            setIsPasswordValid(passwordRegex.test(value));
        }
        if (field === 'memberName') {
            if (!value.trim()) {
                // 이름이 공백인 경우
                setIsNameValid(false);
            } else {
                // 이름이 공백이 아닌 경우에는 한글로만 이루어지고, 2~5글자인지 검사
                const nameRegex = /^[가-힣]{2,5}$/;
                setIsNameValid(nameRegex.test(value));
            }
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        // 이름 유효성 검사
        
        if(member.password !== "" || userPasswordCheck !== ""){
            if(!isPasswordDisabled){
                if (!isPasswordValid) {
                    alert("비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)");
                    return;
                }
                // 비밀번호 일치 여부 확인
                if (member.password !== userPasswordCheck) {
                    alert("비밀번호가 일치하지 않습니다.");
                    return; 
                }
            }
        }
        if (!isEmailCheckButtonDisabled) {
            alert("이메일 중복확인 해주세요.");
            return;
        }
        if (!isEmailCheckButton3Disabled) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }
        if(memberInfo.memberName !== member.memberName){
            console.log(memberInfo.memberName)
            console.log(member.memberName)
            if (!isNameValid) {
                alert("이름은 한글로 2~5글자 사이여야 합니다.");
                return;
            }
            alert("회원 이름이 변경되었습니다.\n회원정보를 수정하시겠습니까?")
        }
        else if(memberInfo.password !== member.password){
            alert("비밀번호가 변경되었습니다.\n회원정보를 수정하시겠습니까?")
        }
        else if(memberInfo.email !== member.email){
            alert("이메일이 변경되었습니다.\n회원정보를 수정하시겠습니까?")
        } 
        else if(memberInfo.phoneNum !== member.phoneNum){
            const phoneRegex = /^(010|011)\d{8}$/;
            if (!phoneRegex.test(member.phoneNum === null || member.phoneNum.replace(/-/g, '')) ) {
                alert("올바른 전화번호 형식이 아닙니다.");
                return;
            }
            alert("전화번호가 변경되었습니다.\n회원정보를 수정하시겠습니까?")
        } else {
            alert("수정된 정보가 없습니다.");
            return;
        }
        try {
            console.log("수정 정보 보내기")
            // axios를 사용하여 서버로 데이터 전송
            const response = await axios.post("/editMemberInfo", member);
            console.log(response.data);
            // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
            if (response.data === "Success") {
                console.log(response.data);
                alert("회원정보 수정 완료!");
                // 재랜더링 되도록 
                props.setFlag(prevFlag => !prevFlag);
            }else if (response.data === "Equal Password"){
                alert("전과 동일한 비밀번호 입니다.");
                return;
            } else {
                alert("실패");
                console.log(response.data);
            }
        } catch (error) {
            console.log("Error sending data: ", error);
        }
        console.log("폼 제출됨:", member);
    };

    const resetEdit = () => {
        setMember({
            memberName: memberInfo.memberName,
            email: memberInfo.email,
            phoneNum: memberInfo.phoneNum,
            password: memberInfo.password,
        })
        setUserPasswordCheck("");
        setIsEmailCheckButtonDisabled(true);
        setIsEmailCheckButton2Disabled(true);
        setIsEmailCheckButton3Disabled(true);
    };
    const deleteMember = async () => {
        try {
            const response = await axios.post("/deleteMember", member);
            console.log(response.data)
            if(response.data==="Success"){
                removeAccessCookie();
                removeRefreshCookie();
                alert('회원탈퇴 성공');
                toHome();
            }
        } catch (error) {
            
        }
    }
    const toHome = () => {
        navigate("/")
    }
    
    return (
        <FormContainer>
            <Title>회원 정보 수정</Title>
            <form onSubmit={handleSubmit}>                
                <StyledTable>
                    <tbody>
                        <tr>
                            <TableHeader>이름</TableHeader>
                            <TableCell>
                                <StyledInput
                                    type="text"
                                    onChange={(event) =>
                                        handleChange("memberName", event.target.value)
                                    }
                                    value={member.memberName}
                                />
                            </TableCell>
                        </tr>
                        <tr>
                            <TableHeader>아이디</TableHeader>
                            <TableCell>
                                <StyledInput
                                    type="text"
                                    value={userId}
                                    disabled={true} // 중복 확인 버튼이 활성화되면 ID 입력란 비활성화
                                />
                            </TableCell>
                        </tr>
                        <tr>
                            <TableHeader>새 비밀번호</TableHeader>
                            <TableCell>
                                <StyledInput
                                    type="password"
                                    onChange={(event) =>
                                        handleChange("password", event.target.value)
                                    }
                                    value={member.password}
                                    disabled={isPasswordDisabled}
                                />
                            </TableCell>
                        </tr>
                        <tr>
                            <TableHeader>새 비밀번호 확인</TableHeader>
                            <TableCell>
                                <StyledInput
                                    type="password"
                                    onChange={(event) => setUserPasswordCheck(event.target.value)}
                                    value={userPasswordCheck}
                                    disabled={isPasswordDisabled}
                                />
                            </TableCell>
                        </tr>
                        <tr>
                            <TableHeader>이메일</TableHeader>
                            <TableCell>
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
                                    disabled={isEmailCheckButtonDisabled}
                                >
                                    <option value="">직접입력</option>
                                    <option value="@naver.com">@naver.com</option>
                                    <option value="@gmail.com">@gmail.com</option>
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
                            </TableCell>
                        </tr>
                        <tr>
                            <TableHeader>전화번호</TableHeader>
                            <TableCell>
                                <StyledInput
                                    type="text"
                                    onChange={handlePhoneNumChange}
                                    value={member.phoneNum}
                                />
                            </TableCell>
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
                <ButtonContainer>
                    <StyledButton type="submit" value="회원정보 수정" />
                    <StyledButton type="reset" onClick={resetEdit} value="취소" />
                </ButtonContainer>
            </form>
            <StyledDeleteButton type="button"  onClick={deleteMember} value="회원 탈퇴"/>
        </FormContainer>
    );
};

export default EditMemberInfo;
