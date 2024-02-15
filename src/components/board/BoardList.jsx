import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import KakaoMap from "../pages/KakaoMap";
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

  td {
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

const BoardList = () => {
  const [board, setBoards] = useState([]);

  useEffect(() => {
    axios.get("/board/BoardList")
      .then((response) => setBoards(response.data))
      .catch((error) => console.error(error));
  }, []);

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
            <tr key={index}>
              <td>{list.boardSeq}</td>
              <td>
                <Link to={`/board/BoardDetail/${list.boardSeq}`}>{list.boardTitle}
                </Link>
              </td>
              <td>{list.admin}</td>
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
