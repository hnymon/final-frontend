import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 20px;
  margin-top: 20px;
  max-width: 600px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  resize: none;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;

  .button {
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;

    &:hover {
      background-color: #2980b9;
    }
  }
`;

const Edit = () => {
  const { boardSeq } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    admin: "",
    boardTitle: "",
    boardContent: "",
  });

  useEffect(() => {
    const getBoard = async () => {
      try {
        const resp = await axios.get(`/board/BoardDetail/${boardSeq}`);
        setBoard(resp.data);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    getBoard();
  }, [boardSeq]);

  const handleEdit = async (e) => {
    e.preventDefault();
    alert("수정하시겠습니까?");
    try {
      await axios.post(`/board/Edit/${boardSeq}`, board);
      alert("수정되었습니다");
      navigate(`/board/BoardDetail/${boardSeq}`);
    } catch (error) {
      alert("수정실패");
      console.error('글 수정 실패', error);
    }
  };

  const handleHome = () => {
    navigate("/board/BoardList");
  };

  return (
    <Container>
      {board && (
        <div>
          <Header>게시글 수정</Header>
          <Card>
            <Label htmlFor="admin">admin</Label>
            <Input
              type="text"
              id="admin"
              value={board.admin}
              onChange={(e) => setBoard({ ...board, admin: e.target.value })}
              required
            />
            <Label htmlFor="boardTitle">Title</Label>
            <Input
              type="text"
              id="boardTitle"
              value={board.boardTitle}
              onChange={(e) => setBoard({ ...board, boardTitle: e.target.value })}
              required
            />
            <Label htmlFor="boardContent">Content</Label>
            <Textarea
              id="boardContent"
              value={board.boardContent}
              onChange={(e) => setBoard({ ...board, boardContent: e.target.value })}
              required
            />
          </Card>
          <ButtonContainer>
            <p className='button' onClick={handleEdit}>수정</p>
            <p className='button' onClick={handleHome}>돌아가기</p>
          </ButtonContainer>
        </div>
      )}
    </Container>
  );
};

export default Edit;
