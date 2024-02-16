import axios from "axios";
import GetTokenToHeader from "../../token/GetTokenToHeader";
import { useEffect, useState } from "react";
import styled from "styled-components";


const OrderList = () =>{
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const headers = GetTokenToHeader();
                const response = await axios.get('/order/loadMyOrder', headers);
                setOrders(response.data);
            } catch (error) {
                console.error('주문 목록을 불러오는 중 에러 발생:', error);
            }
        };
        fetchOrders();
    }, []);

    return(
        <OrderContainer>
            {orders.map((order, index) => (
                <OrderItem key={index}>
                    <OrderTitle>주문 번호: {index + 1}</OrderTitle>
                    <OrderDetail>총 가격: {order.totalPrice}</OrderDetail>
                    <OrderDetail>배송비: {order.deliveryFee}</OrderDetail>
                    <OrderDetail>승인 여부: {order.approval}</OrderDetail>
                    <OrderDetail>주문 날짜: {order.orderDate}</OrderDetail>
                    <ul>
                        {order.orderDetailList.map((detail, detailIndex) => (
                            <li key={detailIndex}>
                                ISBN: {detail.isbn}, 수량: {detail.count}, 상세 승인 여부: {detail.detailApproval.toString()}
                            </li>
                        ))}
                    </ul>
                </OrderItem>
            ))}
        </OrderContainer>
    );
}

export default OrderList;

const OrderContainer = styled.div`
    margin-top: 20px;
`;

const OrderItem = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
`;

const OrderTitle = styled.h3`
    color: #333;
`;

const OrderDetail = styled.p`
    margin: 5px 0;
`;