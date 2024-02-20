import { getOffsetLeft } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OrderDetailsPage = ({orderDetailList}) => {

    const navigate = useNavigate();

    console.log(orderDetailList);

    if (!orderDetailList || orderDetailList.length === 0) {
        return <div>주문 상세 내역이 없습니다.</div>;
    }

    const goToBookDetail = (isbn)=>{
        console.log(isbn);
        navigate(`/book-detail/${isbn}`);
    }
    
    
    return (
        <Wrapper>
            <Title>주문 상세 내역</Title>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>번호</TableHeader>
                        <TableHeader colSpan="2">상세내역</TableHeader>
                        <TableHeader>가격</TableHeader>
                        <TableHeader>구매 수량</TableHeader>
                        <TableHeader>주문상태</TableHeader>
                    </tr>
                </thead>
                        <React.Fragment>
                            {orderDetailList.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell style={{width:'55px'}}>
                                    <Img src={order.thumbnail ? order.thumbnail : 'http://via.placeholder.com/55X80'} alt="" />
                                </TableCell >
                                <TableCell>
                                    <TitleText onClick={() => goToBookDetail(order.isbn)}>
                                    {order.title}
                                    </TitleText>
                                </TableCell>
                                <TableCell>{order.price} 원</TableCell>
                                <TableCell>{order.count}</TableCell>
                                <TableCell>{order.detailApproval ? '승인' : '미승인'}</TableCell>
                            </TableRow>
                        ))}
                        
                        </React.Fragment>
            </Table>
        </Wrapper>
    );
};

export default OrderDetailsPage;

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

