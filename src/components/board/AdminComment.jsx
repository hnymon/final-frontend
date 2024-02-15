import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const AdminCommentContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const CommentForm = styled.form`
  margin-top: 20px;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
`;

const SubmitButton = styled.button`
  background-color: #ffeded;
  color: black;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

const AdminComment = ({ inquiryId }) => {
  const [adminComment, setAdminComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 관리자 답변을 서버로 전송
      console.log(adminComment);
      await axios.post(`/board/AdminComment/${inquiryId}`, { adminComment });
      // 답변 작성 후 필드 초기화
      setAdminComment("");
    } catch (error) {
      console.error("Error submitting admin comment:", error);
    }
  };

  return (
    <AdminCommentContainer>
      <CommentForm onSubmit={handleSubmit}>
        <CommentTextArea
          value={adminComment}
          onChange={(event) => setAdminComment(event.target.value)}
          placeholder="관리자 답변을 작성해주세요"
          required
        />
        <SubmitButton type="submit">답변 작성</SubmitButton>
      </CommentForm>
    </AdminCommentContainer>
  );
};

export default AdminComment;
