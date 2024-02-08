import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import XButton from './XButton';
import { useNavigate } from 'react-router-dom';
import GetTokenToHeader from '../../token/GetTokenToHeader';
import CartListInfo from './CartListInfo';


function CartList() {
  const [cartInfoList, setCartInfoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookCount, setBookCount] = useState([]);
  const [bookPrice, setBookPrice] = useState([]);
  const [productTotal, setProductTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(3000);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [selectedBooks, setSelectedBooks] = useState([]);

  
  const fetchCartInfo = async () => {
    const headers = GetTokenToHeader();  
    try {
      const response = await axios.get("/cart", headers);
      console.log(response.data);

      await fetchBookDetail(response.data);
    } catch (error) {
      console.error('토큰으로 장바구니 불러오기 오류', error);
    }finally{
      setLoading(false);
    };
  };

  const fetchBookDetail = async (cartData) =>{
    try{
      const cartInfoList = [];
      let totalProductPrice = 0;
      const cartArray = Object.values(cartData);
      console.log("cartArray "+cartArray)
      for(const cartItem of cartData){
        const isbn13 = cartItem.isbn13;
        const count = cartItem.count;
        console.log(isbn13, count);
        const response = await axios.post("/testBook4", {
          isbn: cartItem.isbn13
        });
        const data = JSON.parse(response.data.detail).items[0];
        console.log(data);
        console.log(data.title);

        if (data && data.title) {
          cartInfoList.push({
            title: data.title,
            salePrice: data.discount,
            thumbnail: data.image,
            isbn: data.isbn,
            count: cartItem.count,
          });
          bookCount.push(count);
          bookPrice.push(data.discount);
          totalProductPrice += data.discount * count;
        } else {
          console.error('No book details found.');
        }
      }
      setCartInfoList(cartInfoList);
      // setBookCount(bookCount);
      // setBookPrice(bookPrice);
      // setProductTotal(totalProductPrice);
    } catch (error) {
        console.error('Error fetching book detail:', error);
    } finally {
        setLoading(false);
    }

  };

  useEffect(() => {
    fetchCartInfo();
  }, []);

  useEffect(()=>{
    const total = productTotal +deliveryFee;
    setPaymentTotal(total);

  },[productTotal]);


  const increase = (index) =>{
    const updateCount = [...bookCount]
    updateCount[index] += 1;
    console.log(updateCount);
    setBookCount(updateCount);

    const isbn = cartInfoList[index].isbn;
    const isChecked = selectedBooks.includes(isbn);
    if (isChecked) {
      updatePaymentTotal(updateCount);
    }
  }

  const decrease = (index) =>{
    if(bookCount[index] > 1){
        const updateCount = [...bookCount]
        updateCount[index] -= 1;
        console.log(updateCount);
        setBookCount(updateCount);
        const isbn = cartInfoList[index].isbn;
        const isChecked = selectedBooks.includes(isbn);
        if (isChecked) {
          updatePaymentTotal(updateCount);
        }
    }
  }

  const updatePaymentTotal = (countArray) => {
    let totalProductPrice = 0;
    for (let i = 0; i < countArray.length; i++) {
      totalProductPrice += bookCount[i] * bookPrice[i];
    }
    const total = totalProductPrice + deliveryFee;
    setProductTotal(totalProductPrice);
    setPaymentTotal(total);
  }

  const handleBookSelection = (isbn , checked) => {
    if(checked){
      setSelectedBooks([...selectedBooks, isbn]);
    }else{
      setSelectedBooks(selectedBooks.filter(selectedIsbn => selectedIsbn !== isbn));
    }
    console.log(selectedBooks);
  };

  const ChekedBook = useCallback((isbn, checked) =>{
    handleBookSelection(isbn, checked);
  }, [selectedBooks]);

  // 장바구니 항목 삭제
  const removeFromCart = (isbnToRemove) => {
    const updatedCartItems = cartInfoList.filter(item => item.isbn !== isbnToRemove);
    setCartInfoList(updatedCartItems);
};

  //주문 페이지 이동
  const navigate = useNavigate();
  const toOrder = () =>{
    navigate('/order');
  }
    
    return (
      <>
        <CartListInfo
          cartInfoList={cartInfoList}
          bookCount={bookCount}
          bookPrice={bookPrice}
          selectedBooks={selectedBooks}
          decrease={decrease}
          increase={increase}
          removeFromCart={removeFromCart}
          CheckedBook={ChekedBook}
        />
        <OrderContainer>
          <OrderPrice>
          <ul>
              <li>주문 합계</li>
              <li>상품 합계<span>{productTotal} 원</span></li>
              <li>배송비<span>+{deliveryFee} 원</span></li>
          </ul>
          <Divider sx={{ height: 40, m: 0.5 }} orientation='horizontal' />
          <ul>
              <li>결제 예정 금액<span>{paymentTotal} 원</span></li>
          </ul>
          </OrderPrice>
          <OrderButton onClick={toOrder}>주문하기</OrderButton>
        </OrderContainer>
      </>
    );
}

const OrderButton = styled.button`
  margin-top: 40px;
  background-color: white;
  border: 3px solid #FEC4C4;
  border-radius: 30px;
  width: 100%;
  height: 50px;
  font-size: 20px;
  cursor: pointer;

`

const OrderPrice = styled.div`
  border: 2px solid #DDDDDD;
  border-radius: 10px;

  ul{
    margin: 20px;
  }
  
  ul:first-child{
    margin-top: 50px;
  }
  
  li{
    margin: 5px;
  }
  
  span{
    float:right;
  }
`

const OrderContainer = styled.div`
  position: fixed;
  left: 65%;
  float: right;
  margin: 10px auto;
  width: 22%;
  height: 300px;
  font-size:20px;

`

export default CartList;