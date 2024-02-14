import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AdminComment = () => {
  const { inquiryId } = useParams(); 
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
    <div>
      <h2>답변 작성</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={adminComment}
          onChange={(event) => setAdminComment(event.target.value)}
          placeholder="관리자 답변을 작성해주세요"
          required
          rows={6}
          cols={50}
        />
        <button type="submit">답변 작성</button>
      </form>
    </div>
  );
};

export default AdminComment;
