import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CommentArea from "../comment/CommentArea";
import CommentList from "../comment/CommentList";
import KakaoMap from "./KakaoMap";
import styled from "styled-components";
import CartItemDto from "../order/CartItemDto";
import StarRatings from "react-star-ratings";
import { getAccessCookie } from "../cookie/cookie";
import GetTokenToHeader from "../../token/GetTokenToHeader";
import { AddCartCount } from "../cart/CartCount";
import { CartCountContext } from "../layout/Layout";

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
      {/* <form onSubmit={handleSubmit}>
        <input type="number"
                    onChange={event => {setCount(event.target.value)}}
                    value={count} />
        <input type="submit" value="submit" />
       
      </form> */}
      {bookInfo && <CommentArea isbn={bookInfo.isbn} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} />}
      {bookInfo && <CommentList isbn={bookInfo.isbn} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag}/>}
    </div>
    
  );
};

export default BookDetail;

const BookInfo = styled.div`
  margin : 50px auto;
  display: flex;
  img {
    width: 350px;
    margin: 30px 100px;
  }
`

const Title = styled.li`
  margin: 50px 0 10px 0;
`

const Info = styled.li`
  color: #808080;
`

const Price = styled.li`
  margin: 20px 0;
  span:first-child{
    color: #FF6868;
    font-size: 25px;
    font-weight: bold;
  }
  span:last-child{
    color: #FF6868;
  }
`

const Contents = styled.li`
  margin : 30px 100px 0 0 ;
  height: 150px;
  overflow: scroll;
`
const BookCount = styled.li`
  margin: 30px 0;
  font-size: 17px;
  span:first-child{
    margin-right: 10px;
  }
`

const Button =styled.button`
  font-weight: bold;
  margin: 0 3px;
  width: 15px;
  height: 20px;
  background-color: #FFEDED;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`

const TotalPrice = styled.span`
  margin-left: 40px;
  margin-right: 100px;
  span:first-child{

    font-size: 25px;
    font-weight: bold;
  }
  span:last-child{
  }
`

const ButtonCart = styled.button`
    margin: 0 0 0 40px;
    background-color: #FFC0CB;
    border: none;
    color: white;
    padding: 10px 40px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: none;
`