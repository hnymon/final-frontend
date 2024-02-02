import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const CommentTextArea = styled.textarea`
  width: 150%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const CommentButton = styled.button`
  align-self: flex-end;
  margin-right: -27%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CommentArea = (props) => {
  const isbn = props.isbn;
  const navigate = useNavigate();
  // 상태 정의
  // console.log(isbn);
  const [comment, setComment] = useState({
    commentContent: "",
    username: "",
    isbn: isbn,
  });
  // 댓글 내용 변경 핸들러
  const handleCommentChange = (e) => {
    setComment({ ...comment, commentContent: e.target.value });
  };

  // 댓글 전송 핸들러
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      // --------------
      // axios를 사용하여 서버로 데이터 전송 
      const token = localStorage.getItem("token"); // localStorage 에 토큰 저장 로그인시생성
      console.log(token);
      const responseC = await axios.post("/getIdRole", null, {
        headers: {
          Authorization: `Bearer ${token}`, // 해더
        },
      });
      if (responseC.data.result === "Success") {
        console.log(responseC.data.member.username);
        console.log(responseC.data.Role); // 권한 확인
        const uname = responseC.data.member.username;
        setComment({ ...comment, username: uname });
        // ---------- 보내기
        console.log(comment);
        const response = await axios.post("/comment/CommentArea", comment);
        // 서버 응답에 따른 처리
        console.log("댓글 전송 성공", response.data);
        if (response.data === "success") {
          // 댓글이 성공적으로 전송되면 commentContent를 초기화
          setComment({ ...comment, commentContent: "" });
        }
      } else {
        console.log(responseC.data.result);
      }
    } catch (error) {
      // 에러 발생 시 처리
      alert("로그인페이지로 이동합니다");
      navigate('/Login');
      console.error("댓글 전송 에러", error);
      // 필요한 에러 핸들링 로직 추가
    }
  };
 
  return (
    <>
      <CommentWrapper>
        <CommentForm>
          <CommentTextArea
            rows="4"
            placeholder="댓글을 입력하세요"
            value={comment.commentContent}
            onChange={handleCommentChange}
          />
          <CommentButton onClick={handleCommentSubmit}>등록</CommentButton>
        </CommentForm>
      </CommentWrapper>
      
    </>
  );
};

export default CommentArea;