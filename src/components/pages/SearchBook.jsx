import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import StarRatings from 'react-star-ratings';
import ReSearchBar from "../ReSearchBar";
const BookContainer = styled.div`
  margin: 0 auto;
  width: 80%;
`
const Label = styled.label`
  margin-left: 10px;
  ${({ checked }) => checked && `
    font-weight: bold;
  `}
`
const PageContainer= styled.div`
  width: 80%;
  margin: 0 auto;
`;
const SearchDiv = styled.div`
  width: 90%;
  padding: 8px;
  margin-top: 20px;
  border: 1px solid #d9d9d9;
  display: flex;
`;
  const SelectDiv = styled.div`
  width: 90%;
  padding: 8px;
  margin-bottom: 20px;
  background-color: #d9d9d9;
  border: 1px solid #d9d9d9;
  position: relative; 
`;
  const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column; /* 자식 요소들을 세로로 배열하기 위해 column으로 설정 */
  justify-content: center; /* 세로 방향 가운데 정렬 */
  align-items: center; /* 가로 방향 가운데 정렬 */
  position: relative; 
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
  margin: 0 5px;
`;
const TextSpan = styled.span`
  font-size: .8em;
  font-weight: bold;
  margin: 0 5px;
  color: gray;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 1rem auto;
  width: 90%;
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
  width:100%;
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
  const [display, setDisplay] = useState(10);
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
        display,
      });
      console.log(response.data)
      setDocuments(response.data.books);
      const total = response.data.total;
      setBookCnt(response.data.total);
      if(display===10)
        if(total/display >100){
          setLast(100);
        } else{
          setLast(Math.ceil(total / display));
        }
      if(display===20){
        if(total/display >50){
          setLast(50);
        } else{
          setLast(Math.ceil(total / display));
        }
      }
      if(display===50){
        if(total/display >20){
          setLast(20);
        } else{
          setLast(Math.ceil(total / display));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [query, page, search.selectedOption, sort,display]);

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
  }, [callAPI, query, page, search.selectedOption, sort, display]);

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
    } else if (type === "display") {
      setDisplay((prevDisplay) => (prevDisplay === option ? 10 : option));
    }
    setPage(1); // 페이지 초기화
    setLast(100); // last 값을 1000으로 설정
  };
  

  return (
    <PageContainer>
        {documents === null ? (
          <h1>로딩중........</h1>
        ) : (
          <Wrapper>
            <Container2>
              <StyledContainer>
                <SearchDiv>
                  <div>
                    <FirstSpan>"{keyword}"</FirstSpan> 검색결과 총
                    <SecondSpan>{bookCnt.toLocaleString()}</SecondSpan>건
                    <TextSpan>최대 1,000 건 </TextSpan>
                  </div>
                  <ResearchDiv>
                    <ReSearchBar alKey={keyword}/>
                  </ResearchDiv>
                </SearchDiv>
                <SelectDiv>
                  <Label checked={sort === "sim"}>
                    <StyledCheckbox
                      type="checkbox"
                      name="sort"
                      id="sim"
                      checked={sort === "sim"}
                      onChange={() => handleCheckboxChange("sim", "sort")}
                    />
                    정확도순
                  </Label>
                  <Label checked={sort === "date"}>
                    <StyledCheckbox
                      type="checkbox"
                      name="sort"
                      id="date"
                      checked={sort === "date"}
                      onChange={() => handleCheckboxChange("date", "sort")}
                    />
                    발간일순
                  </Label>
                  <Label checked={display === 10}>
                    <StyledCheckbox
                      type="checkbox"
                      name="display"
                      id="10"
                      checked={display === 10}
                      onChange={() => handleCheckboxChange(20, "display")}
                    />
                    10개
                  </Label>
                  <Label checked={display === 20}>
                    <StyledCheckbox
                      type="checkbox"
                      name="display"
                      id="20"
                      checked={display === 20}
                      onChange={() => handleCheckboxChange(20, "display")}
                    />
                    20개
                  </Label>
                  <Label checked={display === 50}>
                    <StyledCheckbox
                      type="checkbox"
                      name="display"
                      id="50"
                      checked={display === 50}
                      onChange={() => handleCheckboxChange(50, "display")}
                    />
                    50개
                  </Label>
                </SelectDiv>
              </StyledContainer>
              {documents.length > 0 && (
                <PagingDiv>
                  <PagingArBtn
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={page === 1}
                  >
                    &lt;
                  </PagingArBtn>
                  <span style={{ margin: "10px" }}>
                    {page}/{last}
                  </span>
                  <PagingArBtn
                    onClick={() => setPage((prevPage) => Math.min(prevPage + 1, last))}
                    disabled={page === last}
                  >
                    &gt;
                  </PagingArBtn>
                </PagingDiv>
              )}
              {documents === null ? (
                <h2>검색된 목록이 없습니다.</h2>
              ) : (
                <BookContainer>
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
                </BookContainer>
              )} 
              {documents.length > 0 && (
                <PagingDiv>
                  <PagingArBtn
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={page === 1}
                  >
                    &lt;
                  </PagingArBtn>
                  <span style={{ margin: "10px" }}>
                    {page}/{last}
                  </span>
                  <PagingArBtn
                    onClick={() => setPage((prevPage) => Math.min(prevPage + 1, last))}
                    disabled={page === last}
                  >
                    &gt;
                  </PagingArBtn>
                </PagingDiv>
              )}
            </Container2>
            
          </Wrapper>
        )}
    </PageContainer>
  );
};

export default SearchBook;

const PagingDiv = styled.div`
  display: flex;
  justify-content: center; /* 세로 방향 가운데 정렬 */
  align-items: center; /* 가로 방향 가운데 정렬 */
  margin-bottom: 20px;
`;

const PagingArBtn = styled.button`
    width:30px;
    height:30px;
    border: none;
    cursor: pointer;
    border-radius: 30%;
    /* disabled 상태일 때 hover 스타일 변경 */
    &:not(:disabled):hover {
        transform: translateY(-2px);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    }
`
const ResearchDiv = styled.div`
  position: absolute;
  z-index:1;
  right:100px;
  width: 30%;
  display: flex;
  justify-content: center; /* 세로 방향 가운데 정렬 */
  align-items: center; /* 가로 방향 가운데 정렬 */
`