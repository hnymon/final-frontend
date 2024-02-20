import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
const StyledBoardList = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 30px;

h1 {
  font-size: 24px;
}

table {
  width: 70%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: auto; 
  margin-right: auto;
  }

  td {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    padding: 1.4%;
    text-align: center;
    height:20px;
  }
  td:nth-child(2){
    width:50%;
    text-align: left;
  }
  th {
    background-color: #ffeded;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    border-top: 2px solid;
    padding: 1.5%;
    text-align: center;
    font-size: 20px;
  }

  .button {
    margin: 20px;
    display: inline-block;
    padding: 10px;
    background-color: #FFC0CB;
    color: #fff;
    text-decoration: none;
    margin-right: 10px;
    
    &:hover {
      background-color: #45a049;
    }
  }
`;
const PaginationContainer = styled.div`
    // margin-top: 20px;
    // display: flex;
    buttom
    justify-content: center;
    
`;

const PaginationButton = styled.button`
    margin: 0 5px; /* 수정된 부분: 좌우 마진 추가 */
    padding: 5px 10px;
    border: 1px solid #ffffff;
    cursor: pointer;
    color: #ffffff;
    background-color: #FFC0CB;

`;
const BoardList = () => {
  const [board, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const fetchBoards = async (page) => {
    try {
      const response = await axios.get(`/board/BoardList?page=${page}`);
      setBoards(response.data.list.content);
      setTotalPages(response.data.list.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBoards(currentPage);
  }, [currentPage]);
  
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleHome = () => {
    navigate("/");
  };
  const handleRowClick = (boardSeq) => {
    // 각 행을 클릭할 때 해당 문의의 세부 정보 페이지로 이동
    window.location.href = `/board/BoardDetail/${boardSeq}`;
};
  return (
    <StyledBoardList>
      <h1>공지사항</h1>
      <table>
        <thead>
          <tr>
            <th> NO </th>
            <th>공지제목</th>
            <th>유형</th>
            <th>조회수</th>
            <th>날 짜</th>
          </tr>
        </thead>
        <tbody>
          {board.map((list, index) => (
            <tr key={index} onClick={()=> handleRowClick(list.boardSeq)}>
              <td>{list.boardSeq}</td> 
              <td>{list.boardTitle}</td>
              <td>{list.admin}</td>
              <td>{list.boardViews}</td>
              <td>{formatDate(list.boardDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationContainer>
        
        <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 0}>이전</PaginationButton>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationButton key={index} onClick={() => handlePageClick(index)}>
            {index + 1}
          </PaginationButton>
        ))}
        <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>다음</PaginationButton>
      </PaginationContainer>
      <PaginationContainer>
        <PaginationButton onClick={handleHome}>돌아가기</PaginationButton>
      </PaginationContainer>
    </StyledBoardList>
    
  );
}

export default BoardList;
