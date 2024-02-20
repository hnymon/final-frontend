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
  margin-top: 20px;
  text-align: center; 
  button {
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
    background-color: #FFC0CB;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;

    &:hover {
      background-color: #2980b9;
    }
  }
`;

const AdminBoardDetail = () => {
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
        const resp = await axios.get(`/board/AdminBoardDetail/${boardSeq}`);
        setBoard([resp.data]); 
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    getBoard();
  }, [boardSeq]);
                               
  const handleHome = () => {
    navigate("/admin");
  };

  const handleEdit = () => {
    alert("수정 페이지로 이동합니다.");
    try {
      navigate(`/board/Edit/${boardSeq}`);
    } catch (error) {
      console.log(error);
    }
  }; 

  const handleDelete = async () => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    
    if(confirmDelete){
      try {
        await axios.delete(`/board/BoardDelete/${boardSeq}`);
        alert("삭제되었습니다");
        navigate('/admin');
      } catch (error) {
        console.error('글 삭제 실패', error);
      }
    }
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
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={handleHome}>돌아가기</button>
          </ButtonContainer>
        </div>
      ))}
    </Container>
  );
};

export default AdminBoardDetail;
