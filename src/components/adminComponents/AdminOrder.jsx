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
    const items = 5;
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(total/items);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const getDataForPage = () => {
        const startIndex = (currentPage - 1) * items;
        const endIndex = Math.min(startIndex + items, total);
        return orders.slice(startIndex, endIndex);
    };
    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/adminOrder/getList");
                if(response.data.result === "Success"){
                    setOrders(response.data.orderList);
                    setTotal(response.data.orderList.length)
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
                    {getDataForPage().map(order => (
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
            <PagingDiv>
                {/* 페이지 버튼 렌더링 */}
                <PagingArBtn onClick={prevPage} disabled={currentPage === 1}>&lt;</PagingArBtn>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                        <PagingBtn
                            key={page}
                            onClick={() => handlePageChange(page)}
                            disabled={currentPage === page}
                            currentPage={currentPage}
                            page={page}
                        >
                            {page}
                        </PagingBtn>
                ))}
                <PagingArBtn onClick={nextPage} disabled={currentPage === totalPages}>&gt;</PagingArBtn>
            </PagingDiv>
        </Wrapper>
    );
}

export default AdminOrder;

const PagingDiv = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center; 
    align-items: center; 
`
const PagingBtn = styled.button`
    cursor: pointer;
    width:30px;
    height:30px;
    border: none;
    border-radius: 30%;
    ${({ currentPage, page }) => currentPage === page && `
    background-color: #ffeded;
    color: #555555;
    `}
    margin:1px;
    &:hover {
        transform: translateY(-2px); /* 호버 시 버튼이 약간 위로 이동하여 입체감 표현 */
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 크게 설정 */
    }
`
const PagingArBtn = styled.button`
    width:30px;
    height:30px;
    border: none;
    cursor: pointer;
    border-radius: 30%;
    /* disabled 상태일 때 hover 스타일 변경 */
    &:not(:disabled):hover {
        transform: translateY(-2px);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    }
`

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
    &:hover {
        transform: translateY(-2px); /* 호버 시 버튼이 약간 위로 이동하여 입체감 표현 */
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 크게 설정 */
    }
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
    width:15%;
`;

const TablePriceCell = styled.td`
    border: 1px solid black;
    padding: 8px;
    text-align: right;
`;

const TableBody = styled.tbody`
    border: 1px solid black;
`;
