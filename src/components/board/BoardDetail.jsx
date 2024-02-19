import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
 
`;

const Card = styled.div`
  margin-left: 23%;
  margin-top: 10%;
  max-width: 55%; /* 수정: 카드 최대 너비를 더 넓게 조정 */
  // width: 100%;
`;

const Admin = styled.p`
  margin-top: 20px;
  margin-bottom: 40px;
  font-weight: 1px bold;
`;

const Title = styled.h2`
  color: #333;
`;
const BoardContent = styled.pre`
  height: 500px;
  border: 1px solid black;
  color: #666;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5%;
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const ButtonContainer = styled.div`
  text-align: center; /* 버튼을 수평 중앙에 배치하기 위해 부모 요소의 텍스트 정렬을 설정합니다 */
  margin-top: 20px;
  button {
    
    padding: 10px;
    background-color: #FFC0CB;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    
    &:hover {
      background-color: orange;
    }
  }
`;

const BoardDetail = () => {
  const { boardSeq } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day} `;
};
  useEffect(() => {
    const getBoard = async () => {
      try {
        const resp = await axios.get(`/board/BoardDetail/${boardSeq}`);
        setBoard([resp.data]); 
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    getBoard();
  }, [boardSeq]);
                               
  const handleHome = () => {
    navigate("/board/BoardList");
  };

  return (
    <Container>
      {board.map((boardItem, index) => (
        <div key={index}>
          
          <Card>
            <Title>[공지] {boardItem.boardTitle}</Title>
            <Admin>{boardItem.admin} | {formatDate(boardItem.boardDate)}</Admin>
            <hr />
            <br />
            <BoardContent>{boardItem.boardContent}</BoardContent>
          </Card>
          <ButtonContainer>
            <button onClick={handleHome}>돌아가기</button>
          </ButtonContainer>
        </div>
      ))}
    </Container>
  );
};
export default BoardDetail;

