import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from '../../img/Logo_n.png';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import calender from "../../img/calendar.png"

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh; /* 화면 세로 중앙 정렬을 위해 */
    width: 40%;
    margin: 0 auto;
`;

const LogoImage = styled.img`
    width: 150px; /* 적절한 크기로 조절 */
    margin-top: 20px; /* 로고를 중앙 상단에 배치하기 위한 여백 */
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start; /* 세로 정렬 기준을 위로 조정 */
    justify-content: center; /* 수평 중앙 정렬 */
    width: 100%;
    background-color: skyblue;
    margin-bottom: 3%;
    border-radius: 10px;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    border-radius: 10px 10px 10px 10px ;
    background-color: ${props => props.active ? '#51b6e1' : 'skyblue'};
    transform: ${props => props.active ? 'translateY(-2px)' : 'none'};
`;

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    border-radius: 10px 10px 10px 10px ;
    background-color: ${props => props.active ? '#51b6e1' : 'skyblue'};
    transform: ${props => props.active ? 'translateY(-2px)' : 'none'};
`;

const TabList = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const TabListItem = styled.li`
    margin-right: 20px;
    cursor: pointer;
    font-size: 1.7rem;
    font-weight: bold;
    color: white;
    justify-content: center; /* 수평으로 중앙 정렬 */
    width:100%;
`;

const SelectFindType = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`;

const FindTypeList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 auto;
    width: 90%;
`;

const FindTypeListItem = styled.li`
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    cursor: pointer;
`;

const FindTypeListItemText = styled.span`
    margin-right: auto;
`;

const ArrowIcon = styled.span`
    margin-left: auto;
    margin-right: 2%;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const InputLabel = styled.label`
    margin-bottom: 10px;
`;

const InputField = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;
const InputBirthdayField = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width:85%;
`;
const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #FFEDED;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
`;
const DatePickerDiv = styled.div`
    margin-bottom: 10px;
`;

const DatepickerViewDiv = styled.div`
    position: absolute;
    zIndex: 1000;
    top: 41%;
    left: 42%;
`;
const ShowUserId = styled.div`
    position: absolute;
    z-index: 1000;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #666666;
    width: 40%;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UserIdWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const CloseButtonWrapper = styled.div`
    margin-left: auto;
`;

const FindIdSpan = styled.span`
    font-size: 1.5rem;
    margin: 0 10px;
    color: orange;
    font-weight: bold;
`
const FindDateSpan = styled.span`
    font-size: 1.5rem;
    margin: 0 10px;
    color: orange;
    font-weight: bold;
`
const FormContainer = styled.div`
    margin: 10px auto 0 auto;
    width: 30%; /* 또는 다른 값을 설정하여 원하는 넓이로 조절 */
    padding: 10px;
    position: absolute;
    top:40%;
    background-color:white;
    border: 1px solid black;
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

const FindIdOrPwd = () => {
    const navigate = useNavigate();
    // 달력 캘린더 Datepicker
    const [startDate, setStartDate] = useState(new window.Date()); //default: 오늘 날짜
    const [showDatePicker, setShowDatePicker] = useState(false); // DatePicker 모달 열기/닫기 상태
    const toggleDatePicker = (event) => {
        setShowDatePicker(!showDatePicker);
    };
    const [showUserId, setShowUserId] = useState(false); // username 모달 열기/닫기 상태
    const toggleShowUserId = () => {
        setShowUserId(!showUserId);
    };
    const [editNewPassword, setEditNewPassword] = useState(false); // editNewPassword 모달 열기/닫기 상태
    const toggleShowEditNewPassword = () => {
        setEditNewPassword(!editNewPassword);
    };
    const onDatePickHandler = (date) => {
        setStartDate(date);
        //highlightDates에 선택한 날짜가 있는지 검색
        dateToStringForSearch(date)
    }
    //검색용: highlighted인 날짜를 찾기 위해 date 객체를 highlighted에 저장되는 날짜 형식인 
    //(월.일.연도)로 변환
    const dateToStringForSearch = (d) => {
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const date = d.getDate();
        setFindIdOrPwdInfo({...findIdOrPwdInfo, birthday:year+"-"+(month >= 10 ? month : "0" + month)+"-"+(date >= 10 ? date : "0"+date)})
        toggleDatePicker();
        return `${month >= 10 ? month : "0" + month}.${date >= 10 ? date : "0"+date}.${year}`;
    };
    const [activeTab, setActiveTab] = useState("findId"); // 기본값은 아이디 찾기 탭
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [showDropdown3, setShowDropdown3] = useState(false);
    const [showDropdown4, setShowDropdown4] = useState(false);
    const [findIdOrPwdInfo, setFindIdOrPwdInfo] = useState({
        memberName: "",
        birthday: "",
        phoneNum: "",
        email: "",
        username: "",
    });
    const [findUsername, setFindUsername] = useState("");
    const [findCreateDate, setFindCreateDate] = useState("");
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFindIdOrPwdInfo({
            ...findIdOrPwdInfo,
            [name]: value,
        });
    };
    const handleActiveTab = (e) => {
        setActiveTab(e);
        setFindIdOrPwdInfo({
            memberName: "",
            birthday: "",
            phoneNum: "",
            email: "",
            username: "",
        });
        setShowUserId(false);
        if(e === "findId"){
            setShowDropdown3(false);
            setShowDropdown4(false);
            setShowDatePicker(false);
        } else {
            setShowDropdown1(false);
            setShowDropdown2(false);
            setShowDatePicker(false);
        }
    };

    const handleDropdownToggle1 = () => {
        setFindIdOrPwdInfo({
            memberName: "",
            birthday: "",
            phoneNum: "",
            email: "",
            username: "",
        });
        setShowDropdown1(!showDropdown1);
        if(showDropdown2){
            setShowDropdown2(false);
            setShowDatePicker(false);
        }
    };
    const handleDropdownToggle2 = () => {
        setFindIdOrPwdInfo({
            memberName: "",
            birthday: "",
            phoneNum: "",
            email: "",
            username: "",
        });
        setShowDropdown2(!showDropdown2);
        if(showDropdown1){
            setShowDropdown1(false);
            setShowDatePicker(false);
        }
    };
    const handleDropdownToggle3 = () => {
        setFindIdOrPwdInfo({
            memberName: "",
            birthday: "",
            phoneNum: "",
            email: "",
            username: "",
        });
        setShowDropdown3(!showDropdown3);
        if(showDropdown4){
            setShowDropdown4(false);
            setShowDatePicker(false);
        }
    };
    const handleDropdownToggle4 = () => {
        setFindIdOrPwdInfo({
            memberName: "",
            birthday: "",
            phoneNum: "",
            email: "",
            username: "",
        });
        setShowDropdown4(!showDropdown4);
        if(showDropdown3){
            setShowDropdown3(false);
            setShowDatePicker(false);
        }
    };
    // 생년월일
    const currentYear = new Date().getFullYear(); // 현재 년도 구하기
    const currentMonth = new Date().getMonth() + 1; // 현재 월 구하기 (0부터 시작하므로 1을 더함)
    const currentDay = new Date().getDate(); // 현재 일 구하기
    const handleBirthdayChange = (event) => {
        // 입력된 값에서 숫자만 추출
        const newValue = event.target.value.replace(/[^0-9]/g, '');
        // 최대 8자리까지만 받음
        const truncatedValue = newValue.slice(0, 8);
        const year = truncatedValue.substring(0, 4);
        const month = truncatedValue.substring(4, 6);
        const day = truncatedValue.substring(6, 8);
    
        // 형식 및 유효성 검사
        if (truncatedValue.length === 8) { 
            // 연도는 00~현재 년도 사이의 값이어야 함
            if (year < 1900 || year > currentYear) {
                alert("올바른 연도 형식이 아닙니다.");
                return;
            }
            if (year === currentYear) {
                // 현재 월 이후의 날짜인 경우
                if (month > currentMonth) {
                    alert("현재 날짜 이후의 날짜는 입력할 수 없습니다.");
                    return;
                }
                // 현재 월과 같은 경우에는 현재 일을 확인
                if (month === currentMonth && day > currentDay) {
                    alert("현재 날짜 이후의 날짜는 입력할 수 없습니다.");
                    return;
                }
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
            // 형식 적용하여 state 업데이트
        }
        setFindIdOrPwdInfo((prevFindIdOrPwdInfo) => ({ ...prevFindIdOrPwdInfo, birthday: formatBirthday(truncatedValue) }));
    };
    const formatBirthday = (birthday) => {
        // 생년월일 형식 변환 (0000-00-00)
        return birthday.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
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
        setFindIdOrPwdInfo({ ...findIdOrPwdInfo, phoneNum: formatPhoneNumber(truncatedValue) });
    };
    // 아이디찾기 
    const handleIdSubmit = async () => {
        // 전화번호 유효성 검사
        if(showDropdown1){
            const phoneRegex = /^(010|011)\d{8}$/;
            if (!phoneRegex.test(findIdOrPwdInfo.phoneNum.replace(/-/g, ''))) {
                alert("올바른 전화번호 형식이 아닙니다.");
                return;
            }
        }
        try {
            const response = await axios.post("/findId", findIdOrPwdInfo)
            if(response.data.result==="Success"){
                setFindUsername(response.data.username)
                setFindCreateDate(new Date(response.data.createDate).toISOString().split('T')[0])
                toggleShowUserId();
            } else {
                alert("해당 정보로 가입된 회원이 존재하지 않습니다.")
            }
        } catch (error) {
            
        }
    };
    console.log(findUsername);
    // 비밀번호 찾기 
    const handlePwdSubmit = async () => {
        // 전화번호 유효성 검사
        if(showDropdown3){
            const phoneRegex = /^(010|011)\d{8}$/;
            if (!phoneRegex.test(findIdOrPwdInfo.phoneNum.replace(/-/g, ''))) {
                alert("올바른 전화번호 형식이 아닙니다.");
                return;
            }
        }
        try {
            const response = await axios.post("/findPwd", findIdOrPwdInfo)
            if(response.data.result === "Success"){
                toggleShowEditNewPassword();
                setNewPassword({...newPassword, username:findIdOrPwdInfo.username})
            } else{
                alert("해당 정보로 가입된 회원이 존재하지 않습니다.")
                return;

            }
        } catch (error) {
            
        }
    };
    // 비밀번호 재설정 
    const [newPassword, setNewPassword] = useState({
        password:"",
        username:"",
    });
    console.log(newPassword)
    const [newCheckPassword, setCheckNewPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const handleChange = (field, value) => {
        if (field === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
            setIsPasswordValid(passwordRegex.test(value));
        }
        setNewPassword({...newPassword, password:value})
    };
    const handleEditPwdSubmit = async (event) => {
        event.preventDefault();
        if(newPassword.password !== newCheckPassword){
            alert("비밀번호를 확인해주세요.");
            return;
        }
        if (!isPasswordValid) {
            alert("비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)");
            return;
        }
        try {
            const response = await axios.post("/editPassword", newPassword)
            console.log(response.data)
            if(response.data === "Success"){
                toggleShowEditNewPassword();
                alert("비밀번호가 재설정되었습니다.\n로그인 페이지로 이동합니다.")
                navigate("/login");
            } else{
                alert("전과 동일한 비밀번호 입니다.");
                return;
            }
        } catch (error) {
            
        }
    };

    return (
        <PageContainer>
            <LogoImage src={Logo} alt="logo Img" />
            {showDatePicker && (
                <DatepickerViewDiv>
                    <DatePicker
                        onChange={onDatePickHandler}
                        selected={startDate}
                        locale={ko}
                        inline
                    />
                </DatepickerViewDiv>
            )}
            {showUserId && (
                <ShowUserId>
                    <UserIdWrapper>
                        <div>
                            <p>회원님의 아이디는 <FindIdSpan>{findUsername}</FindIdSpan>으로 등록되어 있습니다.</p>
                            <p>가입 일자는 <FindDateSpan>{findCreateDate}</FindDateSpan>입니다.</p>
                        </div>
                        <CloseButtonWrapper>
                            <button onClick={toggleShowUserId}>닫기</button>
                        </CloseButtonWrapper>
                    </UserIdWrapper>
                </ShowUserId>
            )}
            {editNewPassword && (
                <FormContainer>
                <form onSubmit={handleEditPwdSubmit}>
                    <StyledTable>
                        <tbody>
                            <tr>
                                <td>
                                    <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <span style={{ marginRight: "auto" }}>비밀번호 재설정</span>
                                        <span style={{ marginLeft: "auto" }} onClick={toggleShowEditNewPassword}>닫기</span>
                                    </div>
                                    <StyledInput
                                        type="password"
                                        onChange={(event) =>
                                            handleChange("password", event.target.value)
                                        }
                                        value={newPassword.password}
                                        placeholder="8자리 이상, 대문자, 숫자. (!@#$%^&* 가능)"
                                    />
                                    <br />
                                    <StyledInput
                                        type="password"
                                        onChange={(event) => setCheckNewPassword(event.target.value)}
                                        value={newCheckPassword}
                                        placeholder="비밀번호를 재입력해주세요"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </StyledTable>
                    <br />
                    <StyledButton type="submit" value="재설정" />
                </form>
            </FormContainer>
            )}
            <FormWrapper>
                <LeftColumn active={activeTab === "findId"} >
                    <TabList>
                        <TabListItem onClick={() => handleActiveTab("findId")}>아이디 찾기</TabListItem>
                    </TabList>
                </LeftColumn>
                <RightColumn active={activeTab === "findPwd"} >
                    <TabList>
                        <TabListItem  onClick={() => handleActiveTab("findPwd")}>비밀번호 찾기</TabListItem>
                    </TabList>
                </RightColumn>
            </FormWrapper>
            <SelectFindType>
                {activeTab === "findId" && (
                    <FindTypeList>
                        <FindTypeListItem onClick={handleDropdownToggle1}>
                            <FindTypeListItemText>휴대폰 번호로 찾기</FindTypeListItemText>
                            <ArrowIcon>{showDropdown1 ? "▲" : "▼"}</ArrowIcon>
                        </FindTypeListItem>
                        {showDropdown1 && (
                            <InputWrapper>
                                <InputLabel>이름</InputLabel>
                                <InputField type="text" name="memberName" value={findIdOrPwdInfo.memberName} onChange={handleInputChange} 
                                placeholder="한글 2 ~ 5 글자"/>
                                <InputLabel>생년월일(숫자)</InputLabel>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <InputBirthdayField type="text" value={findIdOrPwdInfo.birthday} onChange={handleBirthdayChange} 
                                    placeholder="0000-00-00"
                                    />
                                    <DatePickerDiv
                                        onClick={toggleDatePicker}
                                        style={{ marginLeft: "10px", cursor: "pointer" }}
                                    >
                                        <img src={calender} alt="" /> 
                                    </DatePickerDiv>
                                </div>
                                <InputLabel>휴대폰번호</InputLabel>
                                <InputField type="text" name="phoneNum" value={findIdOrPwdInfo.phoneNum} onChange={handlePhoneNumChange} 
                                placeholder="' - ' 없이 000-0000-0000  11개 입력시 자동으로 ' - ' 입력됩니다."/>
                                <SubmitButton onClick={handleIdSubmit}>확인</SubmitButton>
                            </InputWrapper>
                        )}
                        <FindTypeListItem onClick={handleDropdownToggle2}>
                            <FindTypeListItemText>이메일로 찾기</FindTypeListItemText>
                            <ArrowIcon>{showDropdown2 ? "▲" : "▼"}</ArrowIcon>
                        </FindTypeListItem>
                        {showDropdown2 && (
                            <InputWrapper>
                                <InputLabel>이름</InputLabel>
                                <InputField type="text" name="memberName" value={findIdOrPwdInfo.memberName} onChange={handleInputChange} 
                                placeholder="한글 2 ~ 5 글자"/>
                                <InputLabel>생년월일(숫자)1</InputLabel>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <InputBirthdayField type="text" value={findIdOrPwdInfo.birthday} onChange={handleBirthdayChange} 
                                    placeholder="0000-00-00"/>
                                    <DatePickerDiv
                                        onClick={toggleDatePicker}
                                        style={{ marginLeft: "10px", cursor: "pointer" }}
                                    >
                                        <img src={calender} alt="" />
                                    </DatePickerDiv>
                                </div>
                                <InputLabel>이메일</InputLabel>
                                <InputField type="text" name="email" value={findIdOrPwdInfo.email} onChange={handleInputChange} 
                                placeholder="xxx@xxx.xxx"/>
                                <SubmitButton onClick={handleIdSubmit}>확인</SubmitButton>
                            </InputWrapper>
                        )}
                    </FindTypeList>
                )}
                {activeTab === "findPwd" && (
                    <FindTypeList>
                        <FindTypeListItem onClick={handleDropdownToggle3}>
                            <FindTypeListItemText>휴대폰 번호로 찾기</FindTypeListItemText>
                            <ArrowIcon>{showDropdown3 ? "▲" : "▼"}</ArrowIcon>
                        </FindTypeListItem>
                        {showDropdown3 && (
                            <InputWrapper>
                                <InputLabel>아이디</InputLabel>
                                <InputField type="text" name="username" value={findIdOrPwdInfo.username} onChange={handleInputChange} 
                                placeholder="영문과 숫자로 이루어진 6~12글자"/>
                                <InputLabel>이름</InputLabel>
                                <InputField type="text" name="memberName" value={findIdOrPwdInfo.memberName} onChange={handleInputChange} 
                                placeholder="한글 2 ~ 5 글자"/>
                                <InputLabel>생년월일(숫자)</InputLabel>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <InputBirthdayField type="text" value={findIdOrPwdInfo.birthday} onChange={handleBirthdayChange} 
                                    placeholder="0000-00-00"/>
                                    <DatePickerDiv
                                        onClick={toggleDatePicker}
                                        style={{ marginLeft: "10px", cursor: "pointer" }}
                                    >
                                        <img src={calender} alt="" />
                                    </DatePickerDiv>
                                </div>
                                <InputLabel>휴대폰번호</InputLabel>
                                <InputField type="text" name="phoneNum" value={findIdOrPwdInfo.phoneNum} onChange={handlePhoneNumChange} 
                                placeholder="' - ' 없이 000-0000-0000  11개 입력시 자동으로 ' - ' 입력됩니다."/>
                                <SubmitButton onClick={handlePwdSubmit}>확인</SubmitButton>
                            </InputWrapper>
                        )}
                        <FindTypeListItem onClick={handleDropdownToggle4}>
                            <FindTypeListItemText>이메일로 찾기</FindTypeListItemText>
                            <ArrowIcon>{showDropdown4 ? "▲" : "▼"}</ArrowIcon>
                        </FindTypeListItem>
                        {showDropdown4 && (
                            <InputWrapper>
                                <InputLabel>아이디</InputLabel>
                                <InputField type="text" name="username" value={findIdOrPwdInfo.username} onChange={handleInputChange} 
                                placeholder="영문과 숫자로 이루어진 6~12글자"/>
                                <InputLabel>이름</InputLabel>
                                <InputField type="text" name="memberName" value={findIdOrPwdInfo.memberName} onChange={handleInputChange} 
                                placeholder="한글 2 ~ 5 글자"/>
                                <InputLabel>생년월일(숫자)</InputLabel>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <InputBirthdayField type="text" value={findIdOrPwdInfo.birthday} onChange={handleBirthdayChange} 
                                    placeholder="0000-00-00"/>
                                    <DatePickerDiv
                                        onClick={toggleDatePicker}
                                        style={{ marginLeft: "10px", cursor: "pointer" }}
                                    >
                                        <img src={calender} alt="" />
                                    </DatePickerDiv>
                                </div>
                                <InputLabel>이메일</InputLabel>
                                <InputField type="text" name="email" value={findIdOrPwdInfo.email} onChange={handleInputChange} 
                                placeholder="xxx@xxx.xxx"
                                />
                                <SubmitButton onClick={handlePwdSubmit}>확인</SubmitButton>
                            </InputWrapper>
                        )}
                    </FindTypeList>
                )}
            </SelectFindType>
        </PageContainer>
    );
};

export default FindIdOrPwd;
