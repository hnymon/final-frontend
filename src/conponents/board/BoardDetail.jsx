import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardDetail = () => {
  const { boardSeq } = useParams(); // 파라미터 값 가져오기
  const navigate = useNavigate();
  const [board, setBoard] = useState([]); // board 변수 선언

  // 데이터 불러오기
useEffect(() => {
  const getBoard = async () => {
    try {
      console.log(boardSeq);
      const resp = await axios.get(`/board/BoardDetail/${boardSeq}`); // seq로[pk]값 가지고 오기
      console.log(resp.data);
      setBoard([resp.data]); // 가져온 데이터를 상태에 저장
    } catch (error) { // 못가지고 왔을시 error
      console.error("Error fetching board data:", error);
    } 
  };
    getBoard();
 }, [boardSeq]);

  // useEffect(() => {
  //   fetch(`/board/BoardDetail/${boardSeq}`)
  //     .then(response => response.json())
  //     .then(data => setBoard(data))
  //     .catch(error => console.error(error));
  // }, [boardSeq]);

  // 목록으로 돌아가기
  const handleHome = () => {
    navigate("/board/BoardList");
  };

  // 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/board/edit/${boardSeq}`);
  };

  // 글 삭제
  const handleDelete = async () => {
    alert("삭제하시겠습니까?");
    try {
      await axios.delete(`/board/BoardDelete/${boardSeq}`);
      // 삭제 후 글 리스트 페이지로 이동
      alert("삭제되었습니다");
      navigate('/board/BoardList');
    } catch (error) {
      // 실패 시 에러 처리
      console.error('글 삭제 실패', error);
    }
  };

 
  return (
    <>
      {board.map((boardItem, index) => (
        <div className="App-header" key={index}>
          <h1>게시글 상세페이지</h1>
          <div className="card">
            <p className="admin">작성자: {boardItem.admin}</p>
            <h2 className="boardTitle">제목 : {boardItem.boardTitle}</h2>
            <p>{boardItem.boardContent}</p>
          </div>
          <div className='button-container'>
            <p className='button' onClick={handleEdit}>수정</p>
            <p className='button' onClick={handleDelete}>삭제</p>
            <p className='button' onClick={handleHome}>돌아가기</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default BoardDetail;
