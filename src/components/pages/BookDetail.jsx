import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentArea from "../comment/CommentArea";
import CommentList from "../comment/CommentList";

const BookDetail = () => {
  const { isbn } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [isbn13, setIsbn13] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.post("/testBook4", {
          isbn
        });
        const data = JSON.parse(response.data.detail).items[0];
        console.log(data)
        console.log(data.title)
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
  }, [isbn]);
  console.log(bookInfo)
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`수량 : ${count}`);
    // 필요한 데이터를 적절하게 전송하도록 수정
    const token = localStorage.getItem("token");
    console.log(token+" 토큰");
    axios.post("/cart/add", { count, isbn13 },{
      headers: {
              Authorization: `Bearer ${token}`,
            },
    })
      .then((response) => {
        console.log(response.data);
        const quantity = response.data.count;
        const book = response.data.isbn13;
        console.log("수량 : " + quantity);
        console.log("책 정보 : " + book.title);
        alert('장바구니 추가 완료');

      })

      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  }; 
  
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        bookInfo ? (
          <div>
            <h1>도서 제목 : {bookInfo.title}</h1>
            <p>{bookInfo.contents}</p>
            <h3>도서 저자 : {bookInfo.authors}</h3>
            <h3>도서 판매가 : {bookInfo.salePrice}</h3>
            <h3>도서 출판날짜 : {bookInfo.datetime}</h3>
            <h3>도서 출판사 : {bookInfo.publisher}</h3> 
            <h3>도서 isbn : {bookInfo.isbn}</h3>
            <img src={bookInfo.thumbnail ? bookInfo.thumbnail : 'http://via.placeholder.com/120X150'} alt="" />
          </div>
          
        ) : (
          <h1>No book details available.</h1>
        )
      )}
      <form onSubmit={handleSubmit}>
        <input type="number"
                    onChange={event => {setCount(event.target.value)}}
                    value={count} />
        <input type="submit" value="submit" />
       
      </form>
      {bookInfo && <CommentArea isbn={bookInfo.isbn} />}
      {bookInfo && <CommentList isbn={bookInfo.isbn}/>}
    </div>
    
  );
};

export default BookDetail;
