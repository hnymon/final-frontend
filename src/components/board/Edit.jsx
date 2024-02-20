import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Card = styled.div`
  width: 1000px;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  border-radius: 8px;
  `;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px; /* 수정 */
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 9px;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  margin-top: 20px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #FFC0CB; /* 수정 */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #FFC0CB; /* 수정 */
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
    window.confirm("수정하시겠습니까?");
    try {
      await axios.post(`/board/Edit/${boardSeq}`, board);
      alert("수정되었습니다");
      navigate(`/board/AdminBoardDetail/${boardSeq}`);
    } catch (error) {
      alert("수정실패");
      console.error('글 수정 실패', error);
    }
  };

  const handleHome = () => {
    navigate("/admin");
  };

  return (
    <Container>
      {board && (
        <div>
          <Header>게시글 수정</Header>
          <Card>
            <Label htmlFor="admin">관리자</Label>
            <Input
              type="text"
              id="admin"
              value={board.admin}
              onChange={(e) => setBoard({ ...board, admin: e.target.value })}
              required
            />
            <Label htmlFor="boardTitle">공지제목 </Label>
            <Input
              type="text"
              id="boardTitle"
              value={board.boardTitle}
              onChange={(e) => setBoard({ ...board, boardTitle: e.target.value })}
              required
            />
            <Label htmlFor="boardContent">공지내용</Label>
            <Textarea
              id="boardContent"
              value={board.boardContent}
              onChange={(e) => setBoard({ ...board, boardContent: e.target.value })}
              required
            />
          </Card>
          <ButtonContainer>
            <Button onClick={handleEdit}>수정</Button>
            <Button onClick={handleHome}>돌아가기</Button>
          </ButtonContainer>
        </div>
      )}
    </Container>
  );
};

export default Edit;
