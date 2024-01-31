import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { isbn } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(1);
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        let [firstPart] = isbn.split(' ');
        if(firstPart===""){
          firstPart = isbn.trim();
        }
        console.log(firstPart)
        const url = `https://dapi.kakao.com/v3/search/book?target=isbn&query=${firstPart}`;
        const config = {
          headers: { Authorization: "KakaoAK 05377ae946110607a0d89dae94e81960" },
        };
        const result = await axios(url, config);

        if (result.data.documents.length > 0) {
          const bookData = result.data.documents[0];
          setBookInfo({
            title: bookData.title,
            contents: bookData.contents,
            authors: bookData.authors,
            price: bookData.price,
            salePrice: bookData.sale_price,
            datetime: bookData.datetime,
            publisher: bookData.publisher,
            translators: bookData.translators,
            thumbnail: bookData.thumbnail,
            isbn: bookData.isbn,
          });
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
    alert(`수량 : ${num}`);
    // 필요한 데이터를 적절하게 전송하도록 수정
    axios.post("/bookTest", { num, bookInfo })
      .then((response) => {
        console.log(response.data);
        const quantity = response.data.num
        const book = response.data.bookInfo
        console.log("수량 : " + quantity)
        console.log("책 정보 : " + book.title)
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
            <h3>도서 정가 : {bookInfo.price}</h3>
            <h3>도서 판매가 : {bookInfo.salePrice}</h3>
            <h3>도서 출판날짜 : {bookInfo.datetime}</h3>
            <h3>도서 출판사 : {bookInfo.publisher}</h3>
            <h3>도서 번역가 : {bookInfo.translators}</h3>
            <h3>도서 isbn : {bookInfo.isbn}</h3>
            <img src={bookInfo.thumbnail ? bookInfo.thumbnail : 'http://via.placeholder.com/120X150'} alt="" />
          </div>
        ) : (
          <h1>No book details available.</h1>
        )
      )}
      <form onSubmit={handleSubmit}>
        <input type="number"
                    onChange={event => {setNum(event.target.value)}}
                    value={num} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default BookDetail;
