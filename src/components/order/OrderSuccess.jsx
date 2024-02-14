import styled from "styled-components";
import { useEffect, useState } from "react";

const OrderSuccess = () =>{
    const [cartInfoList, setCartInfoList] = useState([]);




    return(
        <>
        <Display>
        <HeadLine>결제 완료</HeadLine>
        <ToOrder>
            <Circle>1</Circle>
            <ToOrderNum>장바구니</ToOrderNum>
            <Circle>2</Circle>
            <ToOrderNum>주문/결제</ToOrderNum>
            <CircleSelected>3</CircleSelected>
            <ToOrderNum>주문완료</ToOrderNum>
        </ToOrder>
        </Display>
        <Div>
            <Books>
                <div>결제가 성공했다~</div>
            </Books>
            <Button>배송조회 바로가기</Button>
        </Div>
    </>
    )
}

export default OrderSuccess;


const Div = styled.div`
    text-align: center;
`


const Button = styled.button`
  margin: 40px auto;
  background-color: white;
  color: black;
  border: 3px solid #FEC4C4;
  border-radius: 30px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;

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



const Books = styled.div`
    width: 60%;
    margin: 50px auto;
    text-align: center;
    border: 1px solid #B8B8B8;
    border-radius: 10px;

    div{
        margin: 50px;
    }
`
