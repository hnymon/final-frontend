import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
const StyledBoardList = styled.div`
padding: 20px;
margin: 20px;
text-align: center;

h1 {
  font-size: 24px;
}

table {
    width: 70%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left:auto; 
    margin-right:auto;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 6px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }

  .button {
    margin: 20px;
    display: inline-block;
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    text-decoration: none;
    margin-right: 10px;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const BoardList = () => {
  const [board, setBoards] = useState([]);

  useEffect(() => {
    axios.get("/board/BoardList")
      .then((response) => setBoards(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <StyledBoardList>
      <h1>게시판 글 리스트</h1>
      <table>
        <thead>
          <tr>
            <th>글 번호</th>
            <th>작성자</th>
            <th>글 제목</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {board.map((list, index) => (
            <tr key={index}>
              <td>{list.boardSeq}</td>
              <td>{list.admin}</td>
              <td>
                <Link to={`/board/BoardDetail/${list.boardSeq}`}>{list.boardTitle}
                </Link>
              </td>
              <td>{list.boardViews}</td>
              <td>{list.boardDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="button" to="/board/BoardCreate">
        글 작성
      </Link>
      <Link to="/">홈</Link>
    </StyledBoardList>
  );
}

export default BoardList;
