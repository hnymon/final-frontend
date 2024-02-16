import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledBoardList = styled.div`
  padding: 20px;
  margin: 20px;
  text-align: center;


  table {
    width: 70%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left: auto; 
    margin-right: auto;
  }

  td{
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    padding: 3%;
    text-align: center;
  }

  th {
    //background-color: #f2f2f2;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    border-top: 2px solid;
    padding: 2%;
    text-align: center;
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
const ButtonContainer = styled.div`
  margin-top: 25px;

  button {
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
    background-color: #FFC0CB;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;

    &:hover {
      background-color: #2980b9;
    }
  }
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

  return (
    <StyledBoardList>
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
            <tr key={item.boardSeq}>
              <td>{item.boardSeq}</td>
              <td>
                <Link to={`/board/AdminBoardDetail/${item.boardSeq}`}>
                  {item.boardTitle}
                </Link>
              </td>
              <td>{item.admin}</td>
              <td>{item.boardViews}</td>
              <td>{formatDate(item.boardDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonContainer>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>◀</button>
        {Array.from(Array(totalPages).keys()).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            style={{padding:"11.9px"}}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>▶</button>
        </ButtonContainer>
      <Link className="button" to="/board/BoardCreate">
        글 작성
      </Link>
    </StyledBoardList>
  );
}

export default AdminBoardList;
