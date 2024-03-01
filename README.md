# 📖 별책빵
> 국비 파이널 프로젝트
> 
> http://www.starbook.p-e.kr/
> 
> 온라인 서점 + 내 위치를 기반으로 도서관 찾아가기

# 📃 프로젝트 정보
1. 개발기간
> 2024-01-15~2024-02-20
2. 개발인원: 3명
> |Name|Position|
> |----|----|
> |[윤범헌](https://github.com/hnymon)|Back, Front| 
> |[이아현](https://github.com/appletella)|Back, Front| 
> |[김건휘](https://github.com/gunhwikim)|Back, Front| 


## :wrench:기술 스택

### 프론트엔드
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/java_script-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

### 백엔드
- java11
- SpringBoot
- Spring Data JPA
- Spring Security
- JWT
- OAuth2.0
- Oracle
- AWS(LightSail)

### 협업툴
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> 
<img src="https://img.shields.io/badge/canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white"> 

## 내가 맡은 역할
- 백엔드: Naver 책검색 API, Crawling, Email, 일반 로그인, 회원가입, 책 별 리뷰 평균 별점, 배송주소록, 회원정보 수정, 아이디/비밀번호 찾기, DB설계, JWT, SpringSecurity, 주문 및 주문상세 승인상태
- 프론트: 홈페이지, 회원가입, 일반로그인(아이디 저장기능), Id/Pwd찾기, 책 상세 페이지, 마이페이지(회원정보 수정, 배송주소록), 관리자 페이지 틀 및 주문페이지, 헤더

## 🗄 ERD & UseCase
<details>
    <summary>ERD</summary>
    <img src="https://github.com/hnymon/final-backend/assets/151509541/af2c5f75-860e-4a45-869f-f65e4d5ee247" style="width: 600px;"/>
</details>
<details>
    <summary>UseCase</summary>
    <img src="https://github.com/hnymon/final-backend/assets/151509541/a538bbf7-41a7-4f60-b237-c6dac767dfcf" style="width: 300px;"/>
    <img src="https://github.com/hnymon/final-backend/assets/151509541/e51c7b40-43ed-47a8-bd62-3673b96b328b" style="width: 300px;"/>
</details>

## App.js
<details>
    <summary>App.js 코드보기</summary>
  
```javascript
function App() {
  return (
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route element={<Layout />} >
          <Route index element={<HomePage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/login/callback' element={<LoginCallback />}/>
          {/* 책 검색 */}
          <Route path='/book-search/:keyword' element={<SearchBook />}/>   
          <Route path='/book-detail/:isbn' element={<BookDetail/>}/>   
          {/* 게시판 */}
          <Route path='/board/BoardList' element={<BoardList/>}/>   
          <Route path='/board/BoardDetail/:boardSeq' element={<BoardDetail/>}/> 
          {/* 아이디/비밀번호 찾기 */}
          <Route path='/find' element={<FindIdOrPwd />}/>
          {/* 로그인 해야만 들어갈 수 있는 페이지 */}
          <Route element={<PrivateRoute />}>
            <Route path='/mypage' element={<Mypage />}/>
            {/* 1대1문의 */}
            <Route path='/board/InquiryArea' element={<InquiryArea/>}/> 
            <Route path='/board/InquiryList' element={<InquiryList/>}/> 
            <Route path='/board/Inquiry' element={<Inquiry />}/> 
            <Route path='/board/UnInquiryList' element={<UnInquiryList/>}/> 
            <Route path='/board/OkInquiryList' element={<OkInquiryList/>}/> 
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='/order/success' element={<OrderSuccess/>}/>
          </Route>
          {/* admin */}
          <Route element={<AdminRoute />}>
            <Route path='/admin' element={<AdminPage />}/> 
            <Route path='/board/AdminBoardDetail/:boardSeq' element={<AdminBoardDetail/>}/> 
            <Route path='/board/AdminBoardList' element={<AdminBoardList/>}/>   
            <Route path='/board/InquiryDetail/:inquiryId' element={<InquiryDetail/>}/> 
            <Route path='/board/AdminComment/:inquiryId' element={<AdminComment/>}/>  
            <Route path='/board/AdminCommentList/:inquiryId' element={<AdminCommentList/>}/> 
            <Route path='/board/BoardCreate' element={<BoardCreate/>}/> 
            <Route path='/board/Edit/:boardSeq' element={<Edit/>}/>
          </Route>
        </Route>
      </Routes>
  );
}

export default App;

```
</details>



## 🗝️ 프로젝트 주요 기능 
### 1. 책 검색
- 책 검색 리스트
> Front : 검색어 입력 후 해당 데이터를 Back 으로 보낸 후 데이터 받아오기
> 
> Back :  Naver 책검색 API 를 활용하여 책 이름, 저자, 출판사, ISBN 으로 조회하여 정확도? 가 높은 순으로 검색결과를 가져옴

<details>
    <summary>SearchBar 코드 보기</summary>
    
```javascript
export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState({
    keyword:"",
  });
  const handleSearch = (event) => {
    event.preventDefault();
    const {keyword} = search;
    if(keyword ===""){
      alert("검색어를 입력하세요")
      return;
    }
    navigate(`/book-search/${keyword}`);
  };

  const handleKeywordChange = (event) => {
    const keyword = event.target.value;
    setSearch((prevSearch) => ({ ...prevSearch, keyword }));
  };
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, border: '2px solid pink', borderRadius: '8px',}}
      onSubmit={handleSearch}
    >
      <InputBase
        name="search"
        value={search.keyword}
        onChange={handleKeywordChange}
        sx={{ ml: 1, flex: 1}}
        placeholder="책 검색"
        inputProps={{ 'aria-label': 'search google maps' }}
        style={{marginLeft:"20px"}}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
```

</details>

- Back 으로 받아온 데이터를를 documents 리스트에 Set 후 보여주기
  
<details>
    <summary>SearchBook 코드 보기</summary>
    
```javascript
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
```

</details>

- 책 상세정보
> Front : 책 이미지 클릭시 해당 isbn을 Back으로 보낸 후 정보 받아오
> 
> Back : 책의 고윳값인 ISBN으로 책을 조회하여 해당 책에 대한 정보를 가져옴

<details>
    <summary>BookDetail 코드 보기</summary>
    
```javascript
const BookDetail = () => {
  const { isbn } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [isbn13, setIsbn13] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [avg, setAvg] = useState(0);
  const navigate = useNavigate();
  const token = getAccessCookie();
  const { cartCount, setCartCount } = useContext(CartCountContext);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.post("/testBook4", { isbn });
        const data = JSON.parse(response.data.detail).items[0];
        if (data && data.title) {
          setBookInfo({
            authors: data.author,
            contents: data.description,
            salePrice: data.discount,
            thumbnail: data.image,
            isbn: data.isbn,
            datetime: data.pubdate,
            title: data.title,
            publisher: data.publisher,
            price: data.price,
            translators: data.translators,
          });
          setIsbn13(data.isbn);
          if(response.data.starAvg){
            setAvg(response.data.starAvg);
          }
        } else {
          console.error("No book details found.");
        }
      } catch (error) {
        console.error("Error fetching book detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetail();
  }, [isbn, updateFlag]);
  console.log(bookInfo);
  const handleSubmit = () => {
    console.log(token+" 토큰");
    if(token !== undefined){
      const headers = GetTokenToHeader();
      axios.post("/cart/add", { 
        count: count, 
        isbn : bookInfo.isbn,
        salePrice: bookInfo.salePrice, 
        title: bookInfo.title, 
        thumbnail : bookInfo.thumbnail }, headers)
      .then((response) => {
        const currentCartCount = cartCount;
        const newCartCount = parseInt(currentCartCount)+1;
        setCartCount(newCartCount);
        const confirmed = window.confirm('장바구니에 상품이 추가되었습니다. 장바구니로 이동하시겠습니까?');
        if (confirmed) {
          AddCartCount();
          navigate('/cart');
        }
      })

      .catch((error) => {
        alert('이미 장바구니에 있는 상품입니다.');
        console.error("Error submitting data:", error);
      });

      }else{
        alert('로그인 해주세요');
        navigate('/login');
      }
  }; 

  const decrease = () =>{
    if(count > 1){
      setCount(count - 1);
    }
  }

  const increase = () =>{
    setCount(count + 1);
  }

  const goOrder = () =>{
    if(token !== undefined){
      navigate('/order', {state: {
        cartArray: [bookInfo],
        bookCount: [count],
      }})
    }else{
        alert('로그인 해주세요');
        navigate('/login');
      }
  }
  
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        bookInfo ? (
          <BookInfo>
            <img src={bookInfo.thumbnail ? bookInfo.thumbnail : 'http://via.placeholder.com/120X150'} alt="" />
            <ul>
              <Title>
                <h1>{bookInfo.title}</h1>
                <div>
                  <StarRatings 
                    rating={avg}
                    starRatedColor="#ffd700"
                    numberOfStars={5}
                    starDimension="24px"
                    starSpacing="2px"
                  />({avg})
                </div>
              </Title>
                <Info>{bookInfo.authors} | {bookInfo.publisher} | {bookInfo.datetime}</Info>
              <Price>
                판매가 <span>{bookInfo.salePrice}</span><span>원</span>
              </Price>
              <Contents>{bookInfo.contents}</Contents>
              <BookCount>
                    <span>수량</span>
                    <Button onClick={() => decrease()}>-</Button> {count}{" "}
                    <Button onClick={() => increase()}>+</Button>
                    <TotalPrice>
                      총 상품 금액 <span>{bookInfo.salePrice*count}</span><span>원</span>
                    </TotalPrice>
                    <ButtonCart onClick={handleSubmit}>장바구니</ButtonCart>
                    <ButtonCart onClick={goOrder}>바로 주문하기</ButtonCart>
              </BookCount>
                    <KakaoMap/>
            </ul>
          </BookInfo>
          
        ) : (
          <h1>해당 도서 정보가 없습니다.</h1>
        )
      )}
      {bookInfo && <CommentArea isbn={bookInfo.isbn} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} />}
      {bookInfo && <CommentList isbn={bookInfo.isbn} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag}/>}
    </div>
    
  );
};

export default BookDetail;


```

</details>

[Back_내 Naver_API 전체 코드 보러 가기](https://github.com/hnymon/final-backend/blob/master/src/main/java/com/web/controller/BookController.java)

<br/>

참고 자료

[Naver Developers](https://developers.naver.com/docs/common/openapiguide/apilist.md#%EB%B9%84%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%B0%A9%EC%8B%9D-%EC%98%A4%ED%94%88-api)


### 2. 웹 크롤링
- Back : 웹사이트(Yes24, Aladin)를 크롤링하여 해당 정보를 DB에 저장
> 처음 크롤링은 페이지에서 책 상세보기를 가져올 수 있는 url을 가져온 후
> 해당 url을 이용하여 상세정보 페이지에서 해당 책에 대한 정보를 가져와 db에 저장

- Front : DB에 저장되어 있는 웹크롤링 데이터를 가져와 보여주기

<details>
    <summary>HomePage 코드 보기</summary>
    
```javascript
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
```	
	
</details>


[Back_Crawling_Aladin_전체 코드 보러 가기](https://github.com/hnymon/final-backend/blob/master/src/main/java/com/web/crawling/CrawlingAladin.java)
 
[Back_Crawling_Yes24_전체 코드 보러 가기](https://github.com/hnymon/final-backend/blob/master/src/main/java/com/web/crawling/CrawlingYes24.java)

   
### 3. 카카오 맵 API
- 카카오 맵 API를 통해 도서관 위치 표시
  
<details>
	<summary>코드 보기</summary>

```javascript
const KakaoMap = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [clickedAddress, setClickedAddress] = useState("");
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  const kjskey = process.env.REACT_APP_KAKAO_JS_KEY;
  useEffect(() => {
    if (modalIsOpen) {
      const loadKakaoMapsSDK = () => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kjskey}&libraries=services&autoload=false`;

          script.onload = () => {
            window.kakao.maps.load(() => {
              initMap(); // Kakao 지도 SDK 로드 후 지도 초기화 함수 호출
              resolve();
            });
          };

          script.onerror = () => {
            reject(new Error("Failed to load Kakao Maps SDK."));
          };

          document.head.appendChild(script);
        });
      };

      loadKakaoMapsSDK().catch((error) => {
        console.error(error);
      });
    }
  }, [modalIsOpen]);

  const initMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    setMap(map);

    displayCurrentLocationMarker(map);

    fetchDataAndDisplayMarkers(map);

    window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      moveCurrentLocationMarker(mouseEvent.latLng);
    });
  };
  // 도서관 마커를 찍어주는 const
  //  도서관 위치
 const fetchDataAndDisplayMarkers = async (map) => {
  try {
    const response = await axios.get("/Library");
    const dataList = response.data.csvList; // 서버에서 받아온 데이터
    console.log(dataList);
    const markers = [];
    dataList.forEach((data) => {
      const markerPosition = new window.kakao.maps.LatLng(
        data.latitude,
        data.longitude
      );
      // // 마커 구분짓기 // 좀있다가 범헌
      let markerImage;

      switch (data.lbrrySe) {
        case "어린이도서관":
          markerImage = "/children1.png"; // 어린이도서관 마커 
          break;
        case "공공도서관":
          markerImage = "/publicLibrary.png"; // 공공도서관 마커 
          break;
        case "작은도서관":
          markerImage = "/small.png"; // 작은도서관 마커 이미지 
          break;
        case "학교도서관":
          markerImage = "/school.png";
        default:
          markerImage = "/default_library_marker.jpg"; 
      }
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: new window.kakao.maps.MarkerImage(markerImage, new window.kakao.maps.Size(30, 30)) // 마커 표시
      });
      marker.setMap(map);
      // 마커 클러스트
      
      const content = `
        <div class="wrap" style="background-color: white; border: 1px solid #ccc; padding: 10px;">
          <div class="info">
            <div class="title" style="font-size: 18px; font-weight: bold; color: #666; margin-bottom: 10px;">${data.lbrryNm}</div>
            <hr style="border-top: 1px solid #ccc; margin: 10px 0;"/>
            <div class="body" style="display: flex; align-items: center;">
              <div class="img" style="margin-right: 10px;">
                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70"/>
              </div>
              <div class="desc" style="flex-grow: 1;">
                <div class="ellipsis" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${data.rdnmadr}</div>
                <div class="jibun ellipsis" style="color: #666;">${data.phoneNumber}</div>
                <div><a href="${data.homepageUrl}" target="_blank" class="link" style="color: blue; text-decoration: none;">홈페이지</a></div>
              </div>
            </div>
          </div>
        </div>
      `;

     const overlay = new window.kakao.maps.CustomOverlay({
        clickable: true,
        content: content,
        map: null,
        position: marker.getPosition(),
        yAnchor: 0,
      });
      
      window.kakao.maps.event.addListener(marker, "click", function () {
        if (overlay.getMap() === null) {
          overlay.setMap(map);
        } else {
          overlay.setMap(null);
        }
      });
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


  //  도서관 위치
  // 현재위치를 직어주는 const
  const displayCurrentLocationMarker = (map) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentPos = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        // 현재 위치 마커에 이미지 적용
        const currentLocationMarkerImage = new window.kakao.maps.MarkerImage(
          "/Logo_n.png", // 현재 위치 마커 이미지 파일 경로
          new window.kakao.maps.Size(60, 60) // 마커 이미지 크기 설정
        );

        const currentLocationMarker = new window.kakao.maps.Marker({
          position: currentPos,
          image: currentLocationMarkerImage, // 현재위치 마커 이미지 적용
        });
        currentLocationMarker.setMap(map);
 
        setMarker(currentLocationMarker);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  };

  const moveCurrentLocationMarker = (latLng) => {
    if (marker) {
      marker.setMap(null);
      marker.setPosition(latLng);
      marker.setMap(map);
    }
  };
  // 현재위치 맵클릭시 마커이동 useEffect()
  useEffect(() => {
    if (map && marker) {
      const clickListener = window.kakao.maps.event.addListener(
        map,
        "click",
        (mouseEvent) => {
          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.coord2Address(
            mouseEvent.latLng.getLng(),
            mouseEvent.latLng.getLat(),
            (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const addr =
                  result[0]?.road_address?.address_name ||
                  result[0]?.address?.address_name;

                console.log("클릭한 위치의 주소:", addr);

                setClickedAddress(addr);
                if (marker) {
                  marker.setMap(null);
                  marker.setPosition(mouseEvent.latLng);
                  marker.setMap(map);
                }
              }
            }
          );
        }
      );

      return () => {
        if (clickListener) {
          window.kakao.maps.event.removeListener(clickListener);
        }
      };
    }
  }, [map, marker]);
  // 현재위치 geolocation
  const getIp = async () =>
    await fetch("https://geolocation-db.com/json/")
      .then((res) => res.json())
      .then((res) => res["IPv4"]);
  
  const [geo, setGeo] = useState({ lat: 0, lon: 0 });
  const getLocation = async () => {
    const nowIp = await getIp();
    console.log(nowIp)
    const geoData = await fetch(`http://ip-api.com/json/${nowIp}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      });
    const latitude = geoData.lat;
    const longitude = geoData.lon;
    setGeo({ lat: latitude, lon: longitude });
  };
  useEffect(() => {
    getLocation();
  }, []);
  
   
  useEffect(() => {
    console.log(geo)
    const getCurrentLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        const currentPos = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        if (map) {
          map.panTo(currentPos);

          if (marker) {
            marker.setMap(null);
            marker.setPosition(currentPos);
            marker.setMap(map);
          }
        }

        setClickedAddress("");
      } catch (error) {
        console.error("현재 위치를 가져오는 데 실패했습니다:", error);
      }
    };

    getCurrentLocation();
  }, [map, marker]);

```


</details>

[카카오 공식 문서 보러가기](https://apis.map.kakao.com/web/sample/)

#### 현재위치 수정 참고

[참고 블로그](https://velog.io/@94lfnv/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A7%B5-http%EC%97%90%EC%84%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)



