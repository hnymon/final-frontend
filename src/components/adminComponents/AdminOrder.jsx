import axios from "axios";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import AdminOrderDetail from "./AdminOrderDetail";

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [checkApproval, setCheckApproval] = useState(true);
    const handleOderPage = () => {
        setCheckApproval(prevApproval => !prevApproval);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/adminOrder/getList");
                if(response.data.result === "Success"){
                    setOrders(response.data.orderList);
                }
            } catch (error) {
                console.log("뭐고")
            }
        };
        fetchData();
    }, [checkApproval]);

    function formatDateTime(dateTimeStr) {
        const [datePart, timePart] = dateTimeStr.split('T');
        const timeOnly = timePart.slice(0, 5);
        return `${datePart}/${timeOnly}`;
    }

    const handleRowClick = (orderId) => {
        if (selectedOrderId === orderId) {
            setSelectedOrderId(null); // 이미 선택된 주문 상세 정보가 있으면 초기화
        } else {
            setSelectedOrderId(orderId); // 선택된 주문 상세 정보 설정
        }
    };

    return (
        <Wrapper>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>주문번호</TableHeader>
                        <TableHeader>주문일자</TableHeader>
                        <TableHeader>회원번호</TableHeader>
                        <TableHeader>총 가격</TableHeader>
                        <TableHeader>배송료</TableHeader>
                        <TableHeader>주문상태</TableHeader>
                    </tr>
                </thead>
                <TableBody>
                    {orders.map(order => (
                        <React.Fragment key={order.id}>
                            <TableRow selected={selectedOrderId === order.id} onClick={() => handleRowClick(order.id)}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{formatDateTime(order.createDate)}</TableCell>
                                <TableCell>{order.memberNum}</TableCell>
                                <TablePriceCell>{order.totalPrice.toLocaleString()} 원</TablePriceCell>
                                <TablePriceCell>{order.deliveryFee.toLocaleString()} 원</TablePriceCell>
                                <TableLinkCell>{order.approval}</TableLinkCell>
                            </TableRow>
                            {selectedOrderId === order.id && (
                                <tr>
                                    <td colSpan="6">
                                        <AdminOrderDetail 
                                            onSuccess={() => setSelectedOrderId(null)} 
                                            sendOdrNum={order.id} 
                                            oderPageHandle={() => handleOderPage()}
                                        />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </Wrapper>
    );
}

export default AdminOrder;

const Wrapper = styled.div`
    width: 100%;
    background-color:white;
`;

const Table = styled.table`
    width: 80%;
    border-collapse: collapse;
    margin: 0 auto;
`;
const TableRow = styled.tr`
    border: 1px solid black;
    cursor: pointer;
    background-color: ${props => props.selected ? "#ffffee" : "transparent"};
`;
const TableHeader = styled.th`
    background-color: #ffeded;
    border: 1px solid black;
    padding: 8px;
`;

const TableCell = styled.td`
    border: 1px solid black;
    padding: 8px;
    text-align: center;
`;

const TableLinkCell = styled.td`
    border: 1px solid black;
    padding: 8px;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
`;

const TablePriceCell = styled.td`
    border: 1px solid black;
    padding: 8px;
    text-align: right;
`;

const TableBody = styled.tbody`
    border: 1px solid black;
`;
