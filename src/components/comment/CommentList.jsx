import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CenteredCommentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentContainer = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  width: 70%; /* Adjust the width as needed */
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  cursor: pointer;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
`;

const CommentList = () => {
  const [list, setCommentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [username, setUsername] = useState(""); // Add state for username

  useEffect(() => {
    const fetchPagedComments = async () => {
      try {
        const response = await axios.get(`/comment/CommentList`, {
          params: {
            page: currentPage,
            size: pageSize,
            username: username,
          },
        });
        const { content, totalPages } = response.data;
        setCommentList(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    };

    fetchPagedComments();
  }, [currentPage, pageSize, username]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <CenteredCommentList>
      {list.map((comment, index) => (
        <CommentContainer key={index}>
          <div>
            <strong>작성자:</strong> {comment.username}
          </div>
          <div>
            <strong>내용:</strong> {comment.commentContent}
          </div>
          <div>
            <strong>날짜:</strong> {comment.commentDate}
          </div>
        </CommentContainer>
      ))}
      <PaginationContainer>
        {[...Array(totalPages).keys()].map((page) => (
          <PageButton
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </CenteredCommentList>
  );
};

export default CommentList;