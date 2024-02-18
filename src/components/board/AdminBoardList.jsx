import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledBoardList = styled.div`
display: flex;
flex-direction: column;
align-items: center;


  table {
    width: 80%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left: auto; 
    margin-right: auto;
  }

  td{
    border: 1px solid #dddddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #ffeded;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  .button {
    margin-top: 20px;
    display: inline-block;
    padding: 5px;
    background-color: #FFC0CB;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
  }
`;
const PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    // background-color: #FFC0CB;
`;

const PaginationButton = styled.button`
    margin: 0 5px; /* 수정된 부분: 좌우 마진 추가 */
    padding: 5px 10px;
    border: 1px solid #ffffff;
    cursor: pointer;
    color: #ffffff;
    background-color: #FFC0CB;

    // &:disabled {
    //     opacity: 0.5;
    //     cursor: not-allowed;
    // }
`;
const AdminBoardList = () => {
  const [board, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handleRowClick = (boardSeq) => {
    // 각 행을 클릭할 때 해당 문의의 세부 정보 페이지로 이동
    window.location.href = `/board/AdminBoardDetail/${boardSeq}`;
};

  return (
    <StyledBoardList>
      <h2>공지</h2>
      <table>
        <thead>
          <tr>
            <th> NO </th>
            <th>공지제목</th>
            <th>유형</th>
            <th>조회수</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {board.map((item) => (
            <tr key={item.boardSeq} onClick={()=> handleRowClick(item.boardSeq)}>
              <td>{item.boardSeq}</td>
              <td>
                {/* <Link to={`/board/AdminBoardDetail/${item.boardSeq}`}> */}
                  {item.boardTitle}
                {/* </Link> */}
              </td>
              <td>{item.admin}</td>
              <td>{item.boardViews}</td>
              <td>{formatDate(item.boardDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationContainer>
          <PaginationButton onClick={handlePrevPage} disabled={currentPage === 0}>◀</PaginationButton>
          {Array.from(Array(totalPages).keys()).map((page) => (
            <PaginationButton
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              // style={{padding:"11.9px"}}
            >
              {page + 1}
            </PaginationButton>
          ))}
          <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>▶</PaginationButton>
        </PaginationContainer>
      <Link className="button" to="/board/BoardCreate">
        글 작성
      </Link>
    </StyledBoardList>
  );
}

export default AdminBoardList;
