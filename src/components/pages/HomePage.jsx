// import React, { useEffect, useState } from "react";
// import axios from "axios";

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "./Homepage.scss";
import { Link, useNavigate } from "react-router-dom";

const NewH1Div = styled.div`
  margin: 15px;
`;


const GalleryContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  height: 200px;
  width: 400px;
  margin-left: 50px;
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
  box-shadow: 0 10px 10px #bdb1d6;
  z-index: 100;
`;

const HomePageWarpper = styled.div`
  margin: 2% auto;
  width: 80%;
  height: 200vh;
`;

const SlideWrapper = styled.div`
  height: 413px;
  padding: 20px;
  border-radius: 40px;
  box-shadow: 0 15px 20px #f4effa;
`;

const TodayBook = styled.div`
  margin: 0 auto 3% auto;
  width: 80%;
  padding: 2%;
  height: 450px;
  border-radius: 50px;
  box-shadow: 0 15px 20px #f4effa;
`;
const TodayInner = styled.div`
  display: flex;
  height: 100%;
`;
const TodayInnerImg = styled.div`
  height: 30%;
  margin-right: 2%;
  img {
    width: 100%;
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1);
    z-index: 100;
    &:hover {
      transform: translateY(-5px); /* 호버 시 버튼이 약간 위로 이동하여 입체감 표현 */
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 크게 설정 */
    }
  }
`;
const TodayInnerRight = styled.div`
  flex: 2;
  margin: 1%;
  margin-left: 2%;
  height: 100%;
`;
const BookContentDiv = styled.div`
  margin: 2%;
  height: 20%;
  weight: 20%;
  overflow: auto;
`;
const BookTitle = styled.span`
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1%;
  color: #333333;
`;
const BookContent = styled.span`
  color: gray;
`;
const BookInfoDiv = styled.div`
  margin: 2%;
`;

const BookAuthor = styled.span``;
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
  const items = 4;
  const [thisTotal, setThisTotal] = useState(0);
  const [currentThisPage, setCurrentThisPage] = useState(1);
  const thisTotalPages = Math.ceil(thisTotal / items);
  console.log(currentThisPage)
  console.log(thisTotalPages)
  
  // 현재 페이지에 해당하는 데이터 가져오기
  const getThisDataForPage = () => {
    const startIndex = (currentThisPage - 1) * items;
    const endIndex = Math.min(startIndex + items, thisTotal);
    // startIndex부터 endIndex까지의 데이터 가져오기
    // 기본 주소가 먼저 오도록 정렬
    return nowThisBookYes24List.slice(startIndex, endIndex);
  };
  const nextThisPage = () => {
    if(currentThisPage === thisTotalPages){
      console.log("지금")
      setCurrentThisPage(1);
    } else{
      setCurrentThisPage((prevPage) => Math.min(prevPage + 1, thisTotalPages));
    }
  };

  const prevThisPage = () => {
    if(currentThisPage === 1){
      setCurrentThisPage(thisTotalPages);
    } else{
      setCurrentThisPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };


  const [popularTotal, setPopularTotal] = useState(0);
  const [currentPopularPage, setCurrentPopularPage] = useState(1);
  const popularTotalPages = Math.ceil(popularTotal / items);
  
  const getPopularDataForPage = () => {
    const startIndex = (currentPopularPage - 1) * items;
    const endIndex = Math.min(startIndex + items, thisTotal);
    // startIndex부터 endIndex까지의 데이터 가져오기
    // 기본 주소가 먼저 오도록 정렬
    return popularBookYes24List.slice(startIndex, endIndex);
  };
  const nextPopularPage = () => {
    if(currentPopularPage === popularTotalPages){
      setCurrentPopularPage(1);
    } else {
      setCurrentPopularPage((prevPage) => Math.min(prevPage + 1, popularTotalPages));
    }
  };

  const prevPopularPage = () => {
    if(currentPopularPage === 1){
      setCurrentPopularPage(popularTotalPages);
    } else{
      setCurrentPopularPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };




  useEffect(() => {
    const testCrawling = async () => {
      try {
        const response = await axios.get("/testCrawling");
        setNewBookList(response.data.newBookList);
        setTodayBookYes24List(response.data.todayBookYes24List);
        setBook(response.data.todayBookYes24List[0]);
        setNowThisBookYes24List(response.data.nowThisBookYes24List);
        setThisTotal(response.data.nowThisBookYes24List.length);
        setPopularBookYes24List(response.data.popularBookYes24List);
        setPopularTotal(response.data.popularBookYes24List.length);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    testCrawling();
  }, []);
  const [setTodayBook, setSetTodayBook] = useState(null);
  const setBook = (book) => {
    setSetTodayBook(book);
  };
  console.log(setTodayBook);

  return (
    <HomePageWarpper>
      <SlideWrapper>
        <NewH1Div>
          <h1>새로 나온 책</h1>
        </NewH1Div>
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
      <TodayBook>
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
      </TodayBook>
      <br />
      {nowThisBookYes24List.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          <HeaderDiv>
            <ConInnerH1>
              <h1>지금 이 책</h1>
            </ConInnerH1>
            <CPageDiv>
              {currentThisPage}/{thisTotalPages}
            </CPageDiv>
          </HeaderDiv>
          <ConInnerBooks>
            <PagingButton onClick={prevThisPage}>&lt;</PagingButton>
            {getThisDataForPage().map((d, index) => (
              <BoxDiv key={index}>
                <StyledLink to={`/book-detail/${d.isbn13}`}>
                  <ImgDiv >
                    <BookImg src={d.imgUrl} alt=""/>
                  </ImgDiv>
                  <TitleDiv>
                    <TitleSpan>{d.bookName}</TitleSpan>
                    <AuthorSpan>{d.author}</AuthorSpan>
                    <PubSpan>{d.publisher}</PubSpan>
                  </TitleDiv>
                </StyledLink>
              </BoxDiv>
            ))}
            <PagingButton onClick={nextThisPage}>&gt;</PagingButton>
          </ConInnerBooks>
        </ConDiv>
      )}
      <br />
      {popularBookYes24List.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          <HeaderDiv>
            <ConInnerH1>
              <h1>베스트셀러</h1>
            </ConInnerH1>
            <CPageDiv>
              {currentPopularPage}/{popularTotalPages}
            </CPageDiv>
          </HeaderDiv>
          <ConInnerBooks>
          <PagingButton onClick={prevPopularPage}>&lt;</PagingButton>
          {getPopularDataForPage().map((d, index) => (
            <BoxDiv key={index}>
              <StyledLink to={`/book-detail/${d.isbn13}`}>
                <ImgDiv >
                  <BookImg src={d.imgUrl} alt=""/>
                </ImgDiv>
                <TitleDiv>
                  <TitleSpan>{d.bookName}</TitleSpan>
                  <AuthorSpan>{d.author}</AuthorSpan>
                  <PubSpan>{d.publisher}</PubSpan>
                </TitleDiv>
              </StyledLink>
            </BoxDiv>
          ))}
          <PagingButton onClick={nextPopularPage}>&gt;</PagingButton>
          </ConInnerBooks>
        </ConDiv>
      )}
      <br />
    </HomePageWarpper>
  );
};

export default HomePage;
const PagingButton = styled.button`
  background-color: transparent; /* 배경색을 투명하게 설정 */
  border: none; /* 테두리를 제거 */
  color: #333; /* 글자색을 지정 */
  padding: 10px 20px; /* 적절한 패딩값 설정 */
  font-size: 30px; /* 글자 크기 설정 */
  cursor: pointer; /* 커서를 포인터로 변경하여 버튼임을 명시 */
  transition: background-color 0.3s ease; /* 배경색 변화에 애니메이션 효과 추가 */

  &:hover {
    background-color: #f0f0f0; /* 마우스 오버시 살짝 회색으로 배경색 변경 */
  }
`
const ConDiv = styled.div`
  height: 350px;
  justify-content: center; /* 수평 가운데 정렬 */
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 15px 20px #f4effa;
`;
const ConInnerH1 = styled.div`
  margin-bottom:10px;
`;

const ConInnerBooks = styled.div`
    display:flex;
    align-items: center;
    justify-content: center; /* 수평 가운데 정렬 */
    width:100%;
`;

const BoxDiv = styled.div`
  height: 200px;
  width: 100%;
`;
const ImgDiv = styled.div`
  text-align: center;
  height:160px;
  margin-bottom: 10px;
`;

const TitleDiv = styled.div`
  text-align: center;
`;

const BookImg = styled.img`
  width: 100px; /* 이미지의 너비를 부모 요소의 절반으로 설정합니다. */
  box-shadow: 0 15px 20px #f4effa;
  &:hover {
        transform: translateY(-2px); /* 호버 시 버튼이 약간 위로 이동하여 입체감 표현 */
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 크게 설정 */
    }
`;

const TitleSpan = styled.div`
  width: 100%; /* 제목의 너비를 부모 요소의 절반으로 설정합니다. */
  font-size: 0.8rem;
  font-weight: bold;
`;
const AuthorSpan = styled.span`
  width: 100%; /* 제목의 너비를 부모 요소의 절반으로 설정합니다. */
  font-size: 0.5rem;
`;
const PubSpan = styled.span`
  width: 50%; /* 제목의 너비를 부모 요소의 절반으로 설정합니다. */
  font-size: 0.5rem;
`;
const CPageDiv = styled.div`
  position: absolute;
  right: 10px;
`
const HeaderDiv = styled.div`
  position: relative; 
  margin-bottom:40px;
`;
const StyledLink = styled(Link)`
  color: black; /* 링크 색상 설정 */
  text-decoration: none; /* 밑줄 제거 */
  /* 다른 CSS 스타일을 추가할 수 있습니다. */
`;