// import React, { useEffect, useState } from "react";
// import axios from "axios";

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "./Homepage.scss";
import { Link, useNavigate } from "react-router-dom";

const ConDiv = styled.div`
  display: flex;
`;
const GalleryContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  height: 200px;
  width: 400px;
`;

const GalleryItem = styled.div`
  flex: 1;
  border-radius: 1rem;
  background: var(--i) no-repeat center;
  background-size: auto 100%;
  transition: all 0.7s cubic-bezier(0.25, 0.4, 0.45, 1.4);
  width: 100px; /* 이미지 폭 */
  height: 150px; /* 이미지 높이 */
  margin-top: 5%;
  &:hover {
    flex: 2;
  }
`;

const HomePageWarpper = styled.div`
  margin: 2% auto;
  width: 80%;
  height:200vh;
`;

const SlideWrapper = styled.div`
  height: 23%;
`;

const NowThisBook = styled.div`
  margin: 0 auto;
  width: 80%;
  padding:2%;
  height:23%;
`;
const TodayInner = styled.div`
  display: flex;
  height:100%;
`;
const TodayInnerImg = styled.div`
  height:30%;
  margin-right:2%;
  img {
    width:100%;
  }  
`;
const TodayInnerRight = styled.div`
  flex: 2;
  margin: 1%;
  margin-left: 2%;
  height: 100%;
`;
const BookContentDiv = styled.div`
  margin:2%;
  height:20%;
  weight:20%;
  overflow: hidden;
`;
const BookTitle = styled.span`
  font-size:2rem;
  font-weight: bold;
  margin-left:1%;
  color: #333333;
`;
const BookContent = styled.span`
  color: gray;
`;
const BookInfoDiv = styled.div`
  margin: 2%;
`;

const BookAuthor = styled.span`

`;
const BookPub = styled.span`
  margin-left: 2%;
`;


const generateItemStyle = (imgUrl) => ({
  "--i": `url(${imgUrl})`,
});

const HomePage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  const [newBookList, setNewBookList] = useState([]);
  const [todayBookYes24List, setTodayBookYes24List] = useState([]);
  const [nowThisBookYes24List, setNowThisBookYes24List] = useState([]);
  const [popularBookYes24List, setPopularBookYes24List] = useState([]);
  console.log(newBookList);
  const navigateToDetail = (isbn) => {
    navigate(`/book-detail/${isbn}`);
  };
  useEffect(() => {
    const testCrawling = async () => {
      try {
        const response = await axios.get("/testCrawling");
        setNewBookList(response.data.newBookList);
        setTodayBookYes24List(response.data.todayBookYes24List);
        setBook(response.data.todayBookYes24List[0])
        setNowThisBookYes24List(response.data.nowThisBookYes24List);
        setPopularBookYes24List(response.data.popularBookYes24List);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    testCrawling();
  }, []);
  const [setTodayBook,setSetTodayBook] = useState(null);
  const setBook = (book) => {
    setSetTodayBook(book);
  }
  console.log(setTodayBook)
  return (
    <HomePageWarpper>
      <SlideWrapper>
        <div>
          <h1>새로 나온 책</h1>
        </div>
        <div className="wrapper">
          <div className="slide_container">
            <ul
              className="slide_wrapper"
              onMouseEnter={onStop}
              onMouseLeave={onRun}
            >
              <div className={"slide original".concat(animate ? "" : " stop")}>
                {newBookList.map((s, i) => (
                  <li key={i} className={"book"}>
                    <Link to={`/book-detail/${s.isbn13}`}>
                      <div className="item">
                        <img src={s.imgUrl} alt="" />
                      </div>
                    </Link>
                  </li>
                ))}
              </div>
              <div className={"slide clone".concat(animate ? "" : " stop")}>
                {newBookList.map((s, i) => (
                  <li key={i} className={"book"}>
                    <Link to={`/book-detail/${s.isbn13}`}>
                      <div className="item">
                        <img src={s.imgUrl} alt="" />
                      </div>
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </SlideWrapper>
      <br />
      <NowThisBook>
        {todayBookYes24List.length === 0 ? (
          <h2>로딩중...</h2>
        ) : (
          <TodayInner>
            <TodayInnerImg>
              <Link to={`/book-detail/${setTodayBook.isbn13}`}>
                <img src={setTodayBook.imgUrl} alt="" />
              </Link>
            </TodayInnerImg>
            <TodayInnerRight>
              <div>
                <h2>오늘의 책</h2>
              </div>
              <BookTitle>{setTodayBook.bookName}</BookTitle>
              <BookContentDiv>
                <BookContent>{setTodayBook.content}</BookContent>
              </BookContentDiv>
              <BookInfoDiv>
                <BookAuthor>{setTodayBook.author}</BookAuthor>
                <BookPub>{setTodayBook.publisher}</BookPub>
              </BookInfoDiv>
              <GalleryContainer>
                {todayBookYes24List.map((d, index) => (
                  <GalleryItem
                    style={generateItemStyle(d.imgUrl)}
                    key={index}
                    onClick={() => setBook(d)}
                  ></GalleryItem>
                ))}
              </GalleryContainer>
            </TodayInnerRight>
          </TodayInner>
        )}
      </NowThisBook>
      <br />
      {nowThisBookYes24List.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          <h1>지금 이 책</h1>
          {nowThisBookYes24List.map((d, index) => (
            <div className="box" key={index}>
              <div className="ellipsis">{d.bookName}</div>
              <img src={d.imgUrl} alt="" style={{ width: "100px" }} />
            </div>
          ))}
        </ConDiv>
      )}
      <br />
      {popularBookYes24List.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          <h1>베스트셀러</h1>
          {popularBookYes24List.map((d, index) => (
            <div className="box" key={index}>
              <div className="ellipsis">{d.bookName}</div>
              <img src={d.imgUrl} alt="" style={{ width: "100px" }} />
            </div>
          ))}
        </ConDiv>
      )}
      <br />
    </HomePageWarpper>
  );
};

export default HomePage;
