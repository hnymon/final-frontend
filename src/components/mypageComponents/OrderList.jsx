import axios from "axios";
import GetTokenToHeader from "../../token/GetTokenToHeader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const OrderList = ({handleTabClick, setOrderDetailList }) =>{
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const headers = GetTokenToHeader();
                const response = await axios.get('/order/loadMyOrder', headers);
                console.log(response.data.myOrder);
                setOrders(response.data.myOrder);
            } catch (error) {
                console.error('주문 목록을 불러오는 중 에러 발생:', error);
            }
        };
        fetchOrders();
    }, []);

    function formatDateTime(dateTimeStr) {
        if(dateTimeStr){
            const [datePart, timePart] = dateTimeStr.split('T');
            const timeOnly = timePart.slice(0, 5);
            return `${datePart}`;
        }
    }

    const goToOrderDetail = (orderDetailList) => {
        console.log('orderDetailList',orderDetailList);
        handleTabClick(4);
        setOrderDetailList(orderDetailList);
    };

    return(
        <Wrapper>
            <Title>주문 내역</Title>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>주문번호</TableHeader>
                        <TableHeader>주문일자</TableHeader>
                        <TableHeader colSpan="2">상세내역</TableHeader>
                        <TableHeader>총 결제 금액</TableHeader>
                        <TableHeader>주문상태</TableHeader>
                    </tr>
                </thead>
                        <React.Fragment>
                            {orders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{formatDateTime(order.orderDate)}</TableCell>
                                <TableCell style={{width:'55px'}}>
                                    <Img src={order.orderDetailList ? order.orderDetailList[0].thumbnail : 'http://via.placeholder.com/55X80'} alt="" />
                                </TableCell >
                                <TableCell>
                                    <TitleText onClick={() => goToOrderDetail(order.orderDetailList)}>
                                    {order.orderDetailList[0].title}
                                    </TitleText>
                                    <OrderType>외 {order.orderDetailList.length} 종</OrderType>
                                </TableCell>
                                <TableCell>{order.totalPrice + order.deliveryFee} 원</TableCell>
                                <TableCell>{order.approval}</TableCell>
                            </TableRow>
                        ))}
                        
                        </React.Fragment>
            </Table>
        </Wrapper>
        
    );
}

export default OrderList;

const Title = styled.div`
    float: left;
    text-align: left; /* 추가: 텍스트 왼쪽 정렬 */
    font-weight: bold;
    color: #333333;
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 30px;
`

const OrderType = styled.div`
    margin-left: 5px;
    font-size: 1rem;
    color: #888;
`;

const Img = styled.img`
    width : 55px;
    height: 80px;
`

const Wrapper = styled.div`
    width: 100%;
    background-color:white;
`;

const Table = styled.table`
    width: 93%;
    margin: 20px auto;
    border-collapse: collapse;
`;
const TableRow = styled.tr`
    border-bottom: 1px solid #DDDDDD;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
`;
const TableHeader = styled.th`
    border-bottom: 3px solid pink;
    border-top: 3px solid pink;
    padding: 8px;
`;

const TableCell = styled.td`
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    
`;

const TitleText = styled.div`

    display: inline-block;
        width: 350px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;

    
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

