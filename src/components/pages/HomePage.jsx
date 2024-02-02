// import React, { useEffect, useState } from "react";
// import axios from "axios";

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "./Homepage.scss";
import { Link } from "react-router-dom";
const ConDiv = styled.div`
display: flex;
`;



const HomePage = () => {
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  const [newBookList, setNewBookList] = useState([]);
  const [todayBookKyoboList, setTodayBookKyoboList] = useState([]);
  const [nowThisBookKyoboList, setNowThisBookKyoboList] = useState([]);
  const [popularBookKyoboList, setPopularBookKyoboList] = useState([]);
  useEffect(() => {
    const testCrawling = async () => {
      try {
        const response = await axios.get("/testCrawling");
        setNewBookList(response.data.newBookList);
        setTodayBookKyoboList(response.data.todayBookKyoboList);
        setNowThisBookKyoboList(response.data.nowThisBookKyoboList);
        setPopularBookKyoboList(response.data.popularBookKyoboList);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    testCrawling();
  }, []);
 
  return (
    <div>
      <div className="wrapper">
            <div className="slide_container">
                <ul
                    className="slide_wrapper"
                    onMouseEnter={onStop}
                    onMouseLeave={onRun}
                >
                    <div
                        className={"slide original".concat(
                            animate ? "" : " stop"
                        )}
                    >
                        {newBookList.map((s, i) => (
                            <li
                                key={i}
                                className={"book"}
                            >
                                <Link to={`/book-detail/${s.isbn13}`}>
                                <div className="item">
                                  <img src={s.imgUrl} alt=""  />
                                </div>
                              </Link>
                            </li>
                        ))}
                    </div>
                    <div
                        className={"slide clone".concat(animate ? "" : " stop")}
                    >
                        {newBookList.map((s, i) => (
                            <li
                                key={i}
                                className={"book"}
                            >
                              <Link to={`/book-detail/${s.isbn13}`}>
                                <div className="item">
                                  <img src={s.imgUrl} alt=""  />
                                </div>
                              </Link>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
      {newBookList.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          {newBookList.map((d, index) => (
            <div className="box" key={index}>
              <div className="ellipsis">{d.bookName}</div>
              <img src={d.imgUrl} alt="" style={{width:"100px"}} />
            </div>
          ))}
        </ConDiv>
      )}
      <br />
      {todayBookKyoboList.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          {todayBookKyoboList.map((d, index) => (
            <div className="box" key={index}>
              <div className="ellipsis">{d.bookName}</div>
              <img src={d.imgUrl} alt="" style={{width:"100px"}} />
            </div>
          ))}
        </ConDiv>
      )}
      <br />
      {nowThisBookKyoboList.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          {nowThisBookKyoboList.map((d, index) => (
            <div className="box" key={index}>
              <div className="ellipsis">{d.bookName}</div>
              <img src={d.imgUrl} alt="" style={{width:"100px"}} />
            </div>
          ))}
        </ConDiv>
      )}
      <br />
      {popularBookKyoboList.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          {popularBookKyoboList.map((d, index) => (
            <div className="box" key={index}>
              <div className="ellipsis">{d.bookName}</div>
              <img src={d.imgUrl} alt="" style={{width:"100px"}} />
            </div>
          ))}
        </ConDiv>
      )}
      <br />
    </div>
  );
};

export default HomePage;
