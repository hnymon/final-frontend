import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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

const AdminCommentList = () => {
    const {inquiryId} = useParams();
    const [adminComments, setAdminComments] = useState([]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    useEffect(() => {
        const fetchAdminComments = async () => {
            try {
                console.log(inquiryId);
                const response = await axios.post(`/board/AdminCommentList/${inquiryId}`);
                console.log(response.data);
                setAdminComments(response.data.list);
            } catch (error) {
                console.error("Error fetching admin comments:", error);
            }
        }; 

        fetchAdminComments();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <AdminCommentContainer>
            <h2>관리자 답변 목록</h2>
            <CommentList>
                {adminComments.map((comment, index) => (
                    <CommentContentTest>
                    <CommentItem key={index}>
                        <strong>답변 내용:</strong>{comment.adminComment}
                        <br />
                        <strong>답변 날짜:</strong>{formatDate(comment.adminCommentDate)}
                    </CommentItem>
                    </CommentContentTest>
                ))}
            </CommentList>
        </AdminCommentContainer>
    );
};

export default AdminCommentList;
