import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GetTokenToHeader from "../../token/GetTokenToHeader";

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
  background-color: #FFC0CB;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const StarRatingContainer = styled.div`
  margin-left: -128%;
  margin-top: 10%; /* 별점을 위쪽으로 이동 */
`;
const CommentArea = (props) => {
  const isbn = props.isbn;
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    commentContent: "",
    isbn: isbn,
    member: null,
    starRating: props.initialRating || 0, // 초기 별점 값
  });
  

  useEffect(() => {
    setComment((prevComment) => ({
      ...prevComment,
      starRating: props.initialRating || 0,
    }));
  }, [props.initialRating]); // props.initialRating이 변경될 때마다 실행

  const handleCommentChange = (e) => {
    setComment({ ...comment, commentContent: e.target.value });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const headers = GetTokenToHeader();
      const response = await axios.post("/comment/CommentArea", comment,
        headers,
      );
      if(comment.commentContent === ""){
        alert("내용을 입력해주세요");
        return;
      }
      if (response.data.result === "Success") {
        console.log("리뷰 전송 성공", response.data);
        setComment({ ...comment, commentContent: "" });
        props.setUpdateFlag(prevFlag => !prevFlag);
      } else {
        console.log("리뷰 전송 실패", response.data);
        alert("이미 작성된 리뷰가 있습니다.");
      }
    } catch (error) {
      alert("로그인페이지로 이동합니다");
      navigate("/login");
      console.error("댓글 전송 에러", error);
    }
  };

  const handleStarRatingChange = (newRating) => {
    setComment({ ...comment, starRating: newRating });
  };

  return (
    <>
      <CommentWrapper>
        <CommentForm>
          <StarRating initialRating={comment.starRating} onRatingChange={handleStarRatingChange} />
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

const StarRating = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]); // initialRating이 변경될 때마다 실행

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <StarRatingContainer>
      <div style={{ marginBottom: "10px" }}></div>
      {[...Array(5).keys()].map((index) => (
        <span
          key={index}
          onClick={() => handleRatingChange(index + 1)}
          style={{
            cursor: "pointer",
            color: index < rating ? "orange" : "grey",
            fontSize: "20px", // 별 크기 조절
            marginRight: "5px" // 별 사이 간격 조절
          }}
        >
          &#9733;
        </span>
      ))} 
    </StarRatingContainer>
  );
};

export default CommentArea;
