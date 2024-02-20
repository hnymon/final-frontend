import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const AdminCommentContainer = styled.div`
  margin-top: 20px;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  padding: 10px;
`;

const CommentContentTest = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdminCommentList = ({ inquiryId , setUpdateFlag, updateFlag }) => {
  const [adminComments, setAdminComments] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchAdminComments = async () => {
      try {
        const response = await axios.post(
          `/board/AdminCommentList/${inquiryId}`
        );
        setAdminComments(response.data.list);
        setUpdateFlag(prevFlag => !prevFlag);
      } catch (error) {
        console.error("Error fetching admin comments:", error);
      }
    };
    
    fetchAdminComments();
  }, [inquiryId,updateFlag,setUpdateFlag]);
  useEffect(() => {
    // updateFlag가 변경될 때마다 다시 랜더링됨

  }, [updateFlag]);
  return (
    <AdminCommentContainer>
      <h2>관리자 답변 목록</h2>
      <CommentList>
        {adminComments.map((comment, index) => (
          <CommentContentTest key={index}>
            <CommentItem>
              <strong>답변 내용:</strong>
              <pre>{comment.adminComment}</pre>
              <br />
              <strong>답변 날짜:</strong>
              {formatDate(comment.adminCommentDate)}
            </CommentItem>
          </CommentContentTest>
        ))}
      </CommentList>
    </AdminCommentContainer>
  );
};

export default AdminCommentList;
