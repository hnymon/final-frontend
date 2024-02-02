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
  border-left : none; 
  border-right : none; 
  border-bottom : none; 
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

const CommentList = (props) => {
  const [list, setCommentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isbn, setIsbn] = useState(props.isbn); // Set initial value for isbn
  const [updateFlag, setUpdateFlag] = useState(false); // 추가
  useEffect(() => {
    const fetchPagedComments = async () => {
      try {
        const response = await axios.get(`/comment/CommentList`, {
          params: {
            page: currentPage,
            size: pageSize,
            isbn: isbn,
          },
        });
        console.log(response);
        const { content, totalPages } = response.data; // Assuming the structure is { content: [], totalPages: 0 }
        setCommentList(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    };

    fetchPagedComments();
  }, [currentPage, pageSize, isbn,updateFlag]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  //삭제 
 
  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if(confirmDelete){
      try {
        const response = await axios.delete(`/comment/CommentDelete/${commentId}`)
        alert(response.data+"삭제되었습니다")
        if(response.data==="success"){
          setUpdateFlag((prevFlag) => !prevFlag); // updateFlag를 토글하여 강제 재랜더링
        }
      } catch (error) {
        console.log(commentId);
        console.error("에러",error)
      }
    } 
  }


  return (
    <CenteredCommentList>
      {list.map((comment, index) => (
        <CommentContainer key={index}>
          <div>
            <strong>작성자:</strong> {comment.username}
          </div>
          <div>
             {comment.commentContent}
          </div>
          <div>
             {comment.commentDate}
            <button onClick={() => handleDelete(comment.commentId)}>삭제</button>
           
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
