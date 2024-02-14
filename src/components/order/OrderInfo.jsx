import styled from "styled-components";
import { useEffect } from "react";
import { Divider } from "@mui/material";


const OrderInfo = ({cartInfoList, bookCount}) => {



    return (
      <CartWrapper>
        {cartInfoList.map((book, index) => {
          const totalPrice = bookCount[index] * book.salePrice;
  
          return (
            <CartContainer key={index}>
              <Index>{index+1}</Index>
              <Img>
                <img src={book.thumbnail ? book.thumbnail : 'http://via.placeholder.com/120X150'} alt="" />
              </Img>
              <BookInfo>
                <li>{book.title}</li>
              </BookInfo>
              <BookCount>
                <li>수량 : {bookCount[index]}</li>
              </BookCount>
              <BookTotalPrice>
                <li>가격 : {totalPrice} 원</li>
              </BookTotalPrice>
            </CartContainer>
          );
        })}
      </CartWrapper>
    );
  }

const Index = styled.ul`
  margin-right: 10px;
`

const CartContainer = styled.div`
  display: flex;
  margin: 10px 0;
  width: 80%;
  font-size: 14px;
  font-weight: 500;
`

const Img = styled.div`
  width : 120px;
  height : 160px;
  img{
    width : 120px;
    height: 160px;
  }
`

const BookInfo = styled.ul`
  margin: 10px 30px;
  width: 100%;

  li:last-child{
    margin: 10px 0 0 0;
  }
`

const BookCount = styled.ul`
  margin: 10px 30px;
  width: 150px;

  li:last-child{
    margin: 20px 0 0 0;
  }
`

const BookTotalPrice = styled.ul`
  margin: 30px 0 0 50px;
  width: 300px;
`
const CartWrapper = styled.div`
  margin: 20px 0 20px 50px;
  width: 100%;
`

  

export default OrderInfo;