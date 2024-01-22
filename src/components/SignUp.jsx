import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState({
        memberName: "",
        username: "",
        password: "",
        email: "",
        domain: "@naver.com",
        phoneNum: "",
    });

    const [userPasswordCheck, setUserPasswordCheck] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);

    const handleChange = (field, value) => {
        if (field === 'username') {
            const usernameRegex = /^[a-zA-Z0-9]{6,12}$/;
            setIsUsernameValid(usernameRegex.test(value));
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        // 이름 유효성 검사
        if (!isNameValid) {
            alert("이름은 한글로 2~5글자 사이여야 합니다.");
            return;
        }
        
        // 비밀번호 일치 여부 확인
        if (member.password !== userPasswordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return; 
        }
        // 아이디 유효성 검사
        if (!isUsernameValid) {
            alert("아이디는 영문과 숫자로 이루어진 6~12글자여야 합니다.");
            return;
        }
        if (!isPasswordValid) {
            alert("비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)");
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>이름:</td>
              <td>
                <input
                  type="text"
                  onChange={(event) =>
                    handleChange("memberName", event.target.value)
                  }
                  value={member.memberName}
                />
              </td>
            </tr>
            <tr>
              <td>아이디:</td>
              <td>
                <input
                  type="text"
                  onChange={(event) =>
                    handleChange("username", event.target.value)
                  }
                  value={member.username}
                />
              </td>
            </tr>
            <tr>
              <td>비밀번호:</td>
              <td>
                <input
                  type="text"
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  value={member.password}
                />
              </td>
            </tr>
            <tr>
              <td>비밀번호 재입력:</td>
              <td>
                <input
                  type="text"
                  onChange={(event) => setUserPasswordCheck(event.target.value)}
                  value={userPasswordCheck}
                />
              </td>
            </tr>
            <tr>
                <td>이메일:</td>
                <td>
                    <input
                        type="text"
                        onChange={(event) =>
                            handleChange("email", event.target.value)
                        }
                        value={member.email}
                    />
                    <select
                        name="domain"
                        onChange={handleDomainChange}
                        value={member.domain}
                    >
                        <option value="@naver.com">네이버</option>
                        <option value="@google.com">구글</option>
                        <option value="@daum.net">다음</option>
                    </select>
                </td>
            </tr>
            <tr>
              <td>전화번호:</td>
              <td>
                <input
                  type="text"
                  onChange={handlePhoneNumChange}
                  value={member.phoneNum}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="제출" />
      </form>
    </div>
  );
};

export default SignUp;
