import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import GetTokenToHeader from "../../token/GetTokenToHeader";

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
  right: 20px;
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
  right: 80px;
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
  const items = 7;
  const [comments, setComments] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const totalPages = Math.ceil(totalElements/items);
  const [currentPage, setCurrentPage] = useState(1);
  const [isbn, setIsbn] = useState(props.isbn);
  const [editableCommentId, setEditableCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState({
    commentContent: '',
    starRating: 0
  });
  const [check, setCheck] = useState(false);
  const [member , setMember] = useState(0);
useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log(isbn);
        const headers = GetTokenToHeader();
        const response = await axios.post(`/comment/CommentList`,{isbn},headers);
        console.log(response.data.list);
        console.log(response.data);
        setComments(response.data.list);
        setTotalElements(response.data.list.length);
        setMember(response.data.member);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [currentPage,check,props.updateFlag]); // 재랜더링

  
  const formatDate = (content) => {
    const date = new Date(content); // ISO 8601 형식의 문자열을 Date 객체로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

 const getDataForPage = () => {
    const startIndex = (currentPage - 1) * items;
    const endIndex = Math.min(startIndex + items, totalElements);
    return comments.slice(startIndex, endIndex);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
//
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
  const handleStarRatingChange = (rating) => {
    setEditedCommentContent(prevState => ({
      ...prevState,
      starRating: rating
    }));
  };
  const handleUpdateToggle = (commentId, commentContent,starRating) => {
    if (editableCommentId === commentId) {
      setEditableCommentId(null);
    } else {
      setEditableCommentId(commentId);
        setEditedCommentContent({
        commentContent: commentContent,
        starRating: starRating
      });
    }
  };
  
  const handleSaveUpdate = async (commentId) => {
    console.log(editedCommentContent);
    try {
      const response = await axios.post(`/comment/CommentUpdate/${commentId}`,editedCommentContent,
      // {
      //   headers: {
      //     'Content-Type': 'text/plain' // 임의로 json형태를 바꿔준다
      //   }
      // }
      );
      console.log(response.data);
      if (response.data === "success") {
        alert("수정되었습니다");
        setEditableCommentId(null); // 수정 상태 종료
        props.setUpdateFlag(prevFlag => !prevFlag);
      }
    } catch (error) {
      console.error("에러", error);
    }
  };

  return (
    <CenteredCommentList>
      {getDataForPage().map(comment => (
        <CommentContainer key={comment.commentId}>
          <StarContainer>
            <strong>작성자:</strong> {comment.memberName}
            <StarRating>
              {" "}
              {[...Array(5).keys()].map((index) => (
                <span key={index} style={{ color: index < comment.starRating ? "orange" : "grey" }}>
                  &#9733;
                </span>
              ))}
            </StarRating>
            <CommentDate>{formatDate(comment.commentDate)}</CommentDate>
          </StarContainer>
          
          {editableCommentId === comment.commentId ? (
            <>
            {/* 별점 */}
            <div style={{ marginBottom: "10px" }}></div>
              {[...Array(5).keys()].map((index) => (
                <span 
                  key={index} 
                  value={editedCommentContent.starRating}
                  style={{ color: index < editedCommentContent.starRating ? "orange" : "grey" , cursor:"pointer"}}
                  onClick={() => handleStarRatingChange(index + 1)}
                >
                  &#9733;
                </span>
              ))} 
              {/* 별점 */}
              <StyledTextarea
                value={editedCommentContent.commentContent}
                onChange={(e) => setEditedCommentContent(prevState => ({
                  ...prevState,
                  commentContent: e.target.value
                }))}
              />
            </>
          ) : (
            <div>{comment.commentContent}{comment.member}</div>
          )}
          {member === comment.memberNum ? (<div>
            <DeleteButton onClick={() => handleDelete(comment.commentId)}>삭제</DeleteButton>
            {editableCommentId === comment.commentId ? (
              <StyledSaveButton onClick={() => handleSaveUpdate(comment.commentId)}>저장</StyledSaveButton>
            ) : (
              <UpdateButton onClick={() => handleUpdateToggle(comment.commentId, comment.commentContent , comment.starRating)}>수정</UpdateButton>
            )}
          </div>):<></>}
          
          
        </CommentContainer>
      ))}
      <PaginationContainer>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <PageButton
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </PageButton>
          )
        )} 
      </PaginationContainer>
    </CenteredCommentList>
  );
};

export default CommentList;