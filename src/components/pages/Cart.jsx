import styled from "styled-components";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CartList from "../cart/CartList";

const Cart = () => {

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
        width : 800px;
        height : 35px;
        border-radius: 15px;
        background-color: #FEC4C4;
        color : #FCFCFC;

    `

    const OrderLine = styled.div`
        width : 100%;
        margin : 20px;
        display: flex;
        justify-content: space-between;
    `




    return(
        <>
        <Display>
            <HeadLine>장바구니()</HeadLine>
            <ToOrder>
                <CircleSelected>1</CircleSelected>
                <ToOrderNum>장바구니</ToOrderNum>
                <Circle>2</Circle>
                <ToOrderNum>주문/결제</ToOrderNum>
                <Circle>3</Circle>
                <ToOrderNum>주문완료</ToOrderNum>
            </ToOrder>
        </Display>
        <MenuBar></MenuBar>
        <OrderLine>
            <CartList/>
        </OrderLine>
        </>
    )
}

export default Cart;