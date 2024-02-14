import styled from "styled-components";
import GetTokenToHeader from "../../token/GetTokenToHeader";
import axios from "axios";
import FetchBookDetail from "../cart/FetchBookDetail";
import { useEffect, useState } from "react";
import OrderInfo from "./OrderInfo";
import { useLocation } from "react-router-dom";
import Payment from "./Payment";
import { Divider } from "@mui/material";

const Order = () =>{
    const location = useLocation();
    const [cartInfoList, setCartInfoList] = useState([]);
    const [bookCount, setBookCount] = useState([]);
    const deliveryFee = 3000;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const productTotal = () =>{
        let totalPrice = 0;
        for(let i=0 ; i<cartInfoList.length ; i++){
            totalPrice += bookCount[i]*cartInfoList[i].salePrice;
        }
        return totalPrice;
    }

    const fetchOrderInfo = async () => {

        try {
          console.log(location.state.cartArray);
          const { cartInfoList, bookCount } = await FetchBookDetail(location.state.cartArray);
          setCartInfoList(cartInfoList);
          setBookCount(bookCount);
        } catch (error) {
          console.error('주문하기 책 정보 불러오기 오류', error);
        }
      };

      useEffect(() => {
        fetchOrderInfo();
      }, []);

      const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
      };

      const deliveryInfoChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        setDeliveryInfo((prevInfo) => ({
          ...prevInfo,
          [name]: value,
        }));
        console.log(deliveryInfo);
      };



    return(
        <>
        <Display>
        <HeadLine>주문하기</HeadLine>
        <ToOrder>
            <Circle>1</Circle>
            <ToOrderNum>장바구니</ToOrderNum>
            <CircleSelected>2</CircleSelected>
            <ToOrderNum>주문/결제</ToOrderNum>
            <Circle>3</Circle>
            <ToOrderNum>주문완료</ToOrderNum>
        </ToOrder>
    </Display>
    <OrderContainer>
        <OrderPrice>
        <ul>
            <li>주문 합계</li>
            <li>상품 합계<span>{productTotal()} 원</span></li>
            <li>배송비<span>+{deliveryFee} 원</span></li>
        </ul>
        <Divider sx={{ height: 20, m: 0.5 }} orientation="horizontal" />
        <ul>
            <li>최종 결제 금액<span>{productTotal()+deliveryFee} 원</span></li>
        </ul>
        </OrderPrice>
        <Payment
            totalPrice={productTotal()+deliveryFee}
            cartInfoList={cartInfoList}
            bookCount={bookCount}
            selectedPaymentMethod={selectedPaymentMethod}
            deliveryInfo={deliveryInfo}
        />
        </OrderContainer>
    <H2>배송 정보</H2>
    <Delivery>
        <Addr>
        <ProductInformation>
            배송지 설정
        </ProductInformation>
        <ul>
            <li>
                배송지 
                <input type="radio" /> 기본배송지
                <input type="radio" /> 다른 거
            </li>
            <li>
                배송주소
                <input name="address" value={deliveryInfo.address} onChange={deliveryInfoChange}></input>
            </li>
        </ul>
        </Addr>
        <Divider sx={{ height: 120, m: 1 }} orientation='vertical' />
        <PersonInfo>
        <ProductInformation>주문자 정보</ProductInformation>
        <ul>
            <li>
                주문자명 <input name="name" value={deliveryInfo.name} onChange={deliveryInfoChange}></input>
            </li>
            <li>
                휴대번호 <input name="phone" value={deliveryInfo.phone} onChange={deliveryInfoChange}></input>
            </li>
            <li>
                이메일 <input name="email" value={deliveryInfo.email} onChange={deliveryInfoChange}></input>
            </li>
        </ul>
        </PersonInfo>
    </Delivery>
    <H2>결제 상품</H2>
    <Books>
        <ProductInformation>
           상품 정보
        </ProductInformation>
        <Divider sx={{ height: 0, m: 0.5 }} orientation='horizontal' />
        <OrderInfo
        cartInfoList={cartInfoList}
        bookCount={bookCount}
        />
    </Books>
    <H2>결제 수단</H2>
    <Button onClick={() => handlePaymentMethodChange('html5_inicis')} selected={selectedPaymentMethod === 'html5_inicis'}>
        신용/체크카드 결제
    </Button>
    <Button onClick={() => handlePaymentMethodChange('kakaopay')} selected={selectedPaymentMethod === 'kakaopay'}>
        카카오페이
    </Button>
        </>
    )
}

export default Order;

const Addr = styled.div`
    margin-left: 4%;
`

const PersonInfo = styled.div`
    margin-right: 10%;
    li{
        margin-top:3px;
    }
`

const Button = styled.button`
  margin-top: 40px;
  background-color: ${({ selected }) => (selected ? '#FEC4C4' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  border: 3px solid #FEC4C4;
  border-radius: 30px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;

`

const ProductInformation = styled.div`
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    margin: 15px 0 10px 0px;
`

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

const Delivery = styled.form`
    width: 60%;
    margin: 20px 50px 50px 50px;
   text-align: left;
    display: flex;
    justify-content: space-between; /* 가로로 나란히 배치 */
    align-items: flex-start; /* 세로 방향 정렬은 위로 */
    border: 1px solid #B8B8B8;
    border-radius: 10px;
`

const Books = styled.div`
    width: 60%;
    margin: 20px 50px 50px 50px;
    text-align: center;
    border: 1px solid #B8B8B8;
    border-radius: 10px;
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
  top: 250px;
  left: 70%;
  float: right;
  margin: 10px auto;
  width: 22%;
  height: 300px;
  font-size:20px;

`

const H2 = styled.h2`
  margin: 20px 0 0 30px;
`
