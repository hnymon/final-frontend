import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Form = styled.form`
  width: 80%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  textarea {
    /* Set a fixed height for the textarea */
    height: 150px;
    /* You can adjust the height as needed */
  }

  input,
  textarea {
    width: 95%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
  }
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #FFC0CB;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #FFC0CB;
  }
`;

const BackButton = styled.p`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ccc;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;

  &:hover {
    background-color: #bbb;
  }
`;

// Media query for smaller screens
const media = {
  tablet: `@media(max-width: 768px)`,
};

const ResponsiveForm = styled(Form)`
  ${media.tablet} {
    width: 90%;
  }
`;

const ResponsiveFormGroup = styled(FormGroup)`
  ${media.tablet} {
    margin-bottom: 15px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BoardCreate = () => {
  const [board, setBoard] = useState({
    admin: "",
    boardTitle: "",
    boardContent: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('admin:',board.admin);
    console.log('subject:',board.boardTitle);
    console.log('content:',board.boardContent);
    try {
      // Assuming you have a valid endpoint for posting data
     const response= await axios.post("/board/BoardCreate", board);
      console.log("성공");
      alert("작성이 완료되었습니다");
      console.log(response.data);
      navigate('/admin');
    } catch (error) { 
      console.log("실패했습니다", error);
    }
  };

  const handleHome = () => {
    navigate("/admin");
  };

  return (
    <FormContainer>
      <ResponsiveForm onSubmit={handleSubmit}>
        <ResponsiveFormGroup>
          <label htmlFor="admin">관리자 &nbsp;
          
          <select  name="check" id="writer" onChange={(e) => setBoard({ ...board, admin: e.target.value })} required>
          <option value="">선택하세요</option>
          <option value="고객센터">고객센터</option>
          <option value="핫트랙스">핫트랙스</option>
          </select>
          </label>
        </ResponsiveFormGroup>
        <ResponsiveFormGroup>
          <label htmlFor="boardTitle">제목</label>
          <input
            type="text"
            id="boardTitle"
            value={board.boardTitle}
            onChange={(e) => setBoard({ ...board, boardTitle: e.target.value })}
            required
          />
        </ResponsiveFormGroup>
        <ResponsiveFormGroup>
          <label htmlFor="boardContent">내용</label>
          <textarea
            id="boardContent"
            value={board.boardContent}
            onChange={(e) => setBoard({ ...board, boardContent: e.target.value })}
            maxLength="500" // 최대 글자 수 설정
            cols="50" rows="8"
            required
          />
        </ResponsiveFormGroup>
        <ButtonContainer>
          <Button type="submit">완료</Button>
        </ButtonContainer>
      </ResponsiveForm>
      <BackButton onClick={handleHome}>돌아가기</BackButton>
    </FormContainer>
  );
};

export default BoardCreate;
