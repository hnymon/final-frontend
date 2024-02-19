import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Divider from '@mui/material/Divider';
import GetTokenToHeader from "../../token/GetTokenToHeader";
import { useNavigate } from "react-router-dom";
import CartListInfo from "../cart/CartListInfo";
import FetchBookDetail from "../cart/FetchBookDetail";
import CartItemDto from "../order/CartItemDto";

const Cart = () => {

  const [cartInfoList, setCartInfoList] = useState([{}]);
  const [checkItems, setCheckItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookCount, setBookCount] = useState([]);
  const [bookPrice, setBookPrice] = useState({});
  const [productTotal, setProductTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(3000);
  const [isbnBookCount, setIsbnBookCount] = useState({});

  const fetchCartInfo = async () => {
    const headers = GetTokenToHeader();
    setLoading(true);  
    try {
      const response = await axios.get("/cart", headers);
      console.log('장바구니 값',response.data);
      const bookInfo = response.data;
      // const { cartInfoList, bookCount } = await FetchBookDetail(response.data);
      setCartInfoList(bookInfo);
      setBookCount(bookInfo.map(item => item.count));
      console.log(cartInfoList);
      console.log(bookCount);
    } catch (error) {
      console.error('토큰으로 장바구니 불러오기 오류', error);
    }finally{
      setLoading(false);
    };
  };

  const handleAllCheck = (checked) =>{
    let newBookPrices = {};
    if(checked){
        const isbnArray = cartInfoList.map(item => item.isbn);
        setCheckItems(isbnArray);

        for (let i = 0; i < cartInfoList.length; i++) {
            let price = bookCount[i] * cartInfoList[i].salePrice;
            newBookPrices[cartInfoList[i].isbn] = price;
        }

        setBookPrice(newBookPrices);
    }else{
      setCheckItems([]);
      setBookPrice({});
    }
  }; 

  useEffect(() => {
    fetchCartInfo();
  }, []);
      
  useEffect(() => {
    const total = Object.values(bookPrice).reduce((acc, curr) => acc + curr, 0);
    // let total = 0;
    // console.log(isbnBookCount);
    // for (const key in bookPrice) {
    //   total += parseInt(isbnBookCount[key]) * parseInt(bookPrice[key]);
    // }
    // console.log('이쪽', total);
    setProductTotal(total);
  },[bookCount]); 

  useEffect(() => {
    let total = 0;
    console.log(bookCount)
    console.log(bookPrice);
    
    total = checkItems.reduce((acc, isbn) => {
      if (bookPrice.hasOwnProperty(isbn)) {
        const price = bookPrice[isbn];
        acc += price;
      }
      return acc;
    }, 0);
  
    console.log('이쪽', total);
    setProductTotal(total);
  }, [checkItems, bookCount, bookPrice]);
     
  // const calculateTotalPrice = useCallback(() => {
  //   let total = 0;
  //   console.log('bookPrice', bookPrice);
  //   for (const key in bookPrice) {
  //     total += parseInt(bookPrice[key]);
  //   }
  //   setProductTotal(total);
  //   console.log(total);
  // }, [bookPrice]);

  // useEffect(() => {
  //   calculateTotalPrice();
  // }, [calculateTotalPrice]);
    
  //주문 페이지 이동
  const navigate = useNavigate();
  const toOrder = () =>{
    if(checkItems.length>0){
      navigate('/order', {state: {
        cartArray: cartInfoList,
        bookCount: bookCount,
      }});
    }else{
      alert('한 개 이상의 상품을 선택하세요');

    }
  }

  // 장바구니 항목 삭제
  const removeFromCart = (isbnToRemove) => {
    const updatedCartItems = cartInfoList.filter(item => item.isbn !== isbnToRemove);
    setCartInfoList(updatedCartItems);
  };

  return(
    <>
    <Display>
        <HeadLine>장바구니({cartInfoList.length})</HeadLine>
        <ToOrder>
            <CircleSelected>1</CircleSelected>
            <ToOrderNum>장바구니</ToOrderNum>
            <Circle>2</Circle>
            <ToOrderNum>주문/결제</ToOrderNum>
            <Circle>3</Circle>
            <ToOrderNum>주문완료</ToOrderNum>
        </ToOrder>
    </Display>
    <MenuBar>
    <input type='checkbox' name='select-all'
          onChange={(e) => handleAllCheck(e.target.checked)}
          // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
          checked={checkItems.length === cartInfoList.length ? true : false} /> 전체 선택
    </MenuBar>
    <OrderLine>
        <CartListInfo
        cartInfoList={cartInfoList}
        bookCount={bookCount}
        setBookCount={setBookCount}
        isbnBookCount={isbnBookCount}
        setIsbnBookCount={setIsbnBookCount}
        bookPrice={bookPrice}
        setBookPrice={setBookPrice}
        checkItems={checkItems}
        setCheckItems={setCheckItems}
        removeFromCart={removeFromCart}
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
            <li>결제 예정 금액<span>{productTotal+deliveryFee} 원</span></li>
        </ul>
        </OrderPrice>
        <OrderButton onClick={toOrder}>주문하기({checkItems.length})</OrderButton>
        </OrderContainer>
    </OrderLine>
    </>
  )
}

const Display = styled.div`
    width : 100%;
    margin : 20px;
    display: flex;
    justify-content: space-between;
`

const HeadLine = styled.h1`
    color: #525252;
`

const ToOrder = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;

`

const Circle = styled.div`
    width:30px;
    height: 30px;
    display:grid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center; 
    background-color: #D9D9D9;   
`

const CircleSelected = styled.div`
    display:grid;
    width:30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center; 
    background-color: #FEC4C4;
`

const ToOrderNum = styled.p`
    position:relative;
    top: 3px;
    margin: 0 30px 0 3px;
`

const MenuBar = styled.div`
    margin: 10px;
    width : 900px;
    height : 35px;
    border-radius: 15px;
    background-color: #FEC4C4;
    color : #FCFCFC;

    input{
      margin-left: 14px;
      margin-top: 10px;
    }

`

const OrderLine = styled.div`
    width : 100%;
    margin : 20px;
    display: flex;
    justify-content: space-between;
`

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

export default Cart;