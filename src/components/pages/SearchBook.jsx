import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import StarRatings from 'react-star-ratings';
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
`;

const FirstSpan = styled.span`
  font-size: 1.2em;
  color: #FF5573;
  font-weight: bold;
  margin-right: 10px;
`;

const SecondSpan = styled.span`
  font-size: 1em;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SideBar = styled.div`
  flex: 0.2;
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const SideBarContainer = styled.div`
  margin-left: 10px;
`;

const Container2 = styled.div`
  flex: 1;
`;

const StyledCheckbox = styled.input`
  border: none;
  color: gray;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
`;

const BookInfo1 = styled.span`
  margin-right: 5px;
  border-right: 1px dotted gray; /* 테두리 스타일 추가 */
  padding-right: 5px; /* 테두리 우측 여백 추가 */
  color: gray;
  /* 중간의 BookInfo1에는 테두리를 제거하기 위한 스타일 추가 */
  &:last-child {
    border-right: none;
    padding-right: 0;
  }
`;

const SailPrice = styled.span`
  font-size: 16px;
`;

const BookWrapper = styled.div`
  display:flex;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #aaaaaa;
`;
const BookThumbDiv = styled.div`
  margin-right: 30px;
  img{
    width:120px;
    height:150px;
  }
`;

const BookInfoDiv = styled.div`
`;


const BookInfoLi = styled.li`
  margin-bottom: 5px;
  padding-left:5px;
`;

const BookTitle = styled.li`
  font-size: 20px;
  margin-bottom: 5px;
`;


const SearchBook = () => {
  const { keyword } = useParams();
  const [query, setQuery] = useState(keyword);
  const [sort, setSort] = useState("sim");
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(1);
  const [documents, setDocuments] = useState(null);
  const [bookCnt, setBookCnt] = useState(0);
  const [search, setSearch] = useState({
    keyword: "",
    selectedOption: "null",
  });
  
  const callAPI = useCallback(async () => {
    try {
      const response = await axios.post("/testBook3", {
        query,
        page,
        target: search.selectedOption,
        sort,
      });
      console.log(response.data)
      setDocuments(response.data.books);
      const total = response.data.total;
      setBookCnt(response.data.total);
      // console.log(JSON.parse(response.data.booksList).total)
      // const data = JSON.parse(response.data.booksList);
      // const items = data.items;
      // setDocuments(items);
      // console.log(documents)
      // const total = JSON.parse(response.data.booksList).total;
      // setBookCnt(total);
      if(total/10 >100){
        setLast(100);
      } else{
        setLast(Math.ceil(total / 10));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [query, page, search.selectedOption, sort]);

  useEffect(() => {
    setQuery(keyword);
    setPage(1);
    setSearch((prevSearch) => ({
      ...prevSearch,
      keyword: keyword,
    }));
  }, [keyword]);

  useEffect(() => {
    callAPI();
  }, [callAPI, query, page, search.selectedOption, sort]);

  const handleCheckboxChange = (option, type) => {
    if (type === "searchOption") {
      setSearch((prevSearch) => ({
        ...prevSearch,
        selectedOption:
          prevSearch.selectedOption === option ? "null" : option,
      }));
    } else if (type === "sort") {
      // 정렬 옵션을 토글합니다.
      setSort((prevSort) => (prevSort === option ? "sim" : option));
    }
  
    setPage(1); // 페이지 초기화
    setLast(100); // last 값을 1000으로 설정
  };
  

  return (
    <div>
      <div>
        {documents === null ? (
          <h1>로딩중........</h1>
        ) : (
          <Wrapper>
            <SideBarContainer>
              <SideBar>
                <h2>검색조건</h2>
                <label>
                  <StyledCheckbox
                    type="checkbox"
                    name="searchOption"
                    id="title"
                    checked={search.selectedOption === "title"}
                    onChange={() => handleCheckboxChange("title", "searchOption")}
                  />
                  제목
                </label>
                <label>
                  <StyledCheckbox
                    type="checkbox"
                    name="searchOption"
                    id="person"
                    checked={search.selectedOption === "person"}
                    onChange={() => handleCheckboxChange("person", "searchOption")}
                  />
                  저자/번역가
                </label>
                <label>
                  <StyledCheckbox
                    type="checkbox"
                    name="searchOption"
                    id="publisher"
                    checked={search.selectedOption === "publisher"}
                    onChange={() => handleCheckboxChange("publisher", "searchOption")}
                  />
                  출판사
                </label>
                <label>
                  <StyledCheckbox
                    type="checkbox"
                    name="searchOption"
                    id="isbn"
                    checked={search.selectedOption === "isbn"}
                    onChange={() => handleCheckboxChange("isbn", "searchOption")}
                  />
                  ISBN
                </label>
              </SideBar>
              <SideBar>
                <h2>정렬 조건</h2>
                <label>
                  <StyledCheckbox
                    type="checkbox"
                    name="sort"
                    id="sim"
                    checked={sort === "sim"}
                    onChange={() => handleCheckboxChange("sim", "sort")}
                  />
                  정확도순
                </label>
                <label>
                  <StyledCheckbox
                    type="checkbox"
                    name="sort"
                    id="date"
                    checked={sort === "date"}
                    onChange={() => handleCheckboxChange("date", "sort")}
                  />
                  발간일순
                </label>
              </SideBar>
            </SideBarContainer>
            <Container2>
              <StyledContainer>
                <FirstSpan>"{keyword}"</FirstSpan> 검색결과 총{" "}
                <SecondSpan> {bookCnt.toLocaleString()} </SecondSpan>건
              </StyledContainer>
               {documents.length > 0 && (
                <div>
                  <button
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={page === 1}
                  >
                    이전
                  </button>
                  <span style={{ margin: "10px" }}>
                    {page}/{last}
                  </span>
                  <button
                    onClick={() => setPage((prevPage) => Math.min(prevPage + 1, last))}
                    disabled={page === last}
                  >
                    다음
                  </button>
                </div>
              )}
              
              {documents === null ? (
                <h2>검색된 목록이 없습니다.</h2>
              ) : (
                <div>
                  {documents.map((d, index) => (
                    <BookWrapper key={`${d.isbn}-${index}`} >
                      <BookThumbDiv>
                        <Link to={`/book-detail/${d.isbn}`}>
                          <img
                            src={d.image ? d.image: "http://via.placeholder.com/120X150"}
                            alt=""
                          />
                        </Link>
                      </BookThumbDiv>
                      <BookInfoDiv>
                        <ul>
                          <BookTitle>{d.title}</BookTitle>
                          <BookInfoLi>
                            <div>
                              <StarRatings
                                rating={d.starAvg}
                                starRatedColor="#ffd700"
                                numberOfStars={5}
                                starDimension="24px"
                                starSpacing="2px"
                              />({d.starAvg})
                            </div>
                            <BookInfo1>{d.author}</BookInfo1>
                            <BookInfo1>{d.publisher}</BookInfo1>
                            <BookInfo1>{d.pubdate}</BookInfo1>
                          </BookInfoLi>
                          <BookInfoLi>
                          {/* <SailPercent>{((1 - d.sale_price / d.price) * 100).toFixed(0)}%</SailPercent> */}
                          <SailPrice>{d.discount}</SailPrice>원
                          </BookInfoLi>
                        </ul>
                      </BookInfoDiv>
                    </BookWrapper>
                  ))}
                </div>
              )} 
            </Container2>
          </Wrapper>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
