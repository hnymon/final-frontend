import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const CenteredCommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const CommentContainer = styled.div`
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  border-bottom: none;
  padding: 30px; /* 댓글 공간을 좀 더 넓혀줌 */
  margin: 10px 0;
  width: 40%;
  position: relative;
  align-items: center; /* 댓글을 수직 중앙 정렬 */
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
  background-color: #FFC0CB;
  color: #fff;
  border: none;
  border-radius: 3px;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 별점과 날짜를 좌우 정렬 */
  align-items: center; /* 세로 정렬 추가 */
`;

const StarRating = styled.div`
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CommentDate = styled.div`
  text-align: right;
  flex-grow: 1; /* 별점과의 간격을 조절하기 위해 추가 */
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: -10px;
  padding: 5px 10px;
  background-color: #FFC0CB;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: -60px;
  padding: 5px 10px;
  background-color: #FFC0CB;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px; /* 예시 높이값 */
  resize: none; /* 사용자가 크기를 조절하지 못하도록 설정합니다. */
`;

const StyledSaveButton = styled.button`
  padding: 5px 10px;
  background-color: #FFC0CB; /* 수정버튼과 동일한 색상을 사용합니다. */
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const CommentList = (props) => {
  const [list, setCommentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isbn, setIsbn] = useState(props.isbn);
  const [editableCommentId, setEditableCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');

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
        console.log(response.data);
        const { content, totalPages } = response.data;
  
        // content 배열의 각 요소들의 날짜 형식을 변경하여 새로운 배열 생성
        const formattedContent = content.map(comment => {
          return {
            ...comment,
            commentDate: formatDate(comment.commentDate) // 날짜 형식 변경
          };
        });
  
        setCommentList(formattedContent);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    };
  
    fetchPagedComments();
  }, [currentPage, pageSize, isbn, props.updateFlag]);
  
  const formatDate = (content) => {
    const date = new Date(content); // ISO 8601 형식의 문자열을 Date 객체로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/comment/CommentDelete/${commentId}`);
        alert("삭제되었습니다");
        if (response.data === "success") {
          props.setUpdateFlag(prevFlag => !prevFlag);
        }
      } catch (error) {
        console.error("에러", error);
      }
    }
  };

  const handleUpdateToggle = (commentId, commentContent) => {
    if (editableCommentId === commentId) {
      setEditableCommentId(null);
    } else {
      setEditableCommentId(commentId);
      setEditedCommentContent(commentContent);
    }
  };

  const handleSaveUpdate = async (commentId) => {
    try {
      const response = await axios.post(`/comment/CommentUpdate/${commentId}`,editedCommentContent,
      {
        headers: {
          'Content-Type': 'text/plain' // 임의로 json형태를 바꿔준다
        }
      }
      );
      console.log(response.data);
      if (response.data === "success") {
        // alert("수정되었습니다");
        setEditableCommentId(null); // 수정 상태 종료
        props.setUpdateFlag(prevFlag => !prevFlag);
      }
    } catch (error) {
      console.error("에러", error);
    }
  };

  return (
    <CenteredCommentList>
      {list.map((formattedContent, index) => (
        <CommentContainer key={index}>
          <StarContainer>
            <strong>작성자:</strong> {formattedContent.memberName}
            <StarRating>
              {" "}
              {[...Array(5).keys()].map((index) => (
                <span key={index} style={{ color: index < formattedContent.starRating ? "orange" : "grey" }}>
                  &#9733;
                </span>
              ))}
            </StarRating>
            <CommentDate>{formattedContent.commentDate}</CommentDate>
          </StarContainer>
          {editableCommentId === formattedContent.commentId ? (
            <StyledTextarea
              value={editedCommentContent}
              onChange={(e) => setEditedCommentContent(e.target.value)}
            />
          ) : (
            <div>{formattedContent.commentContent}</div>
          )}
          <DeleteButton onClick={() => handleDelete(formattedContent.commentId)}>삭제</DeleteButton>
          {editableCommentId === formattedContent.commentId ? (
            <StyledSaveButton onClick={() => handleSaveUpdate(formattedContent.commentId)}>저장</StyledSaveButton>
          ) : (
            <UpdateButton onClick={() => handleUpdateToggle(formattedContent.commentId, formattedContent.commentContent)}>수정</UpdateButton>
          )}
        </CommentContainer>
      ))}
      <PaginationContainer>
        {[...Array(totalPages).keys()].map((page) => (
          <PageButton key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>
            {page + 1}
          </PageButton>
        ))} 
      </PaginationContainer>
    </CenteredCommentList>
  );
};

export default CommentList;
