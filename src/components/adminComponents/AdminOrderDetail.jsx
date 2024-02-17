import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const AdminOrderDetail = (props) => {
    const [id, setId] = useState(props.sendOdrNum);
    const [odt, setOdt] = useState([]);
    const [arrIsbn, setArrIsbn] = useState([]);
    console.log(odt)
    const [check, setCheck] = useState(true);
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await axios.post("/adminOrder/getOrderDetail", { id });
                const extractedIsbnArray = response.data.odt.map(order => order.isbn);
                setArrIsbn(extractedIsbnArray);
    
                const updatedOdt = await Promise.all(response.data.odt.map(async (a) => {
                    const isbn = a.isbn;
                    const response = await axios.post("/naver_book_adv_Api", { isbn });
                    const data = JSON.parse(response.data.detail).items[0];
                    return {
                        ...a,
                        title: data.title,
                        salePrice: parseInt(data.discount),
                        thumbnail: data.image,
                    };
                }));
                if (isMounted) {
                    setOdt(updatedOdt);
                    const allDetailApproved = updatedOdt.every(order => order.detailApproval);
                    if (allDetailApproved) {
                        props.oderPageHandle();
                    } else {
                        props.oderPageHandle();
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        return () => {
            isMounted = false; // 컴포넌트가 언마운트되었을 때 상태 업데이트를 막음
        };
    }, [check]);
    const approval = async (odtNum) => {
        try {
            const response = await axios.post("/adminOrder/approval", {odtNum})
            console.log(response.data)
            if(response.data=== "Success"){
                setCheck(prevCheck => !prevCheck);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return(// props.onSuccess() 닫기
        <Wrapper >
            <Table>
                <TableBody>
                    {odt.map(order => (
                        <tr key={order.odtNum}>
                            <TableCell>{order.odtNum}</TableCell>
                            <TableImgCell><Image src={order.thumbnail ? order.thumbnail : 'http://via.placeholder.com/120X150'} alt="" /></TableImgCell>
                            <TableInfoCell>
                                <TitleSpan>{order.title}</TitleSpan>
                                <PerPriceSpan>개당가격 : {(order.salePrice).toLocaleString()} 원</PerPriceSpan><IsbnSpan>isbn : {order.isbn}</IsbnSpan>
                            </TableInfoCell>
                            <TableCountCell>
                                <span>수량 : {order.count}</span>
                                <br />
                                <span>{(order.count*order.salePrice).toLocaleString()} 원</span>
                            </TableCountCell>
                            <TableCell>
                                {order.detailApproval === true ? "승인": "대기"} 
                                <br /> 
                                {order.detailApproval ? 
                                    <button onClick={() => approval(order.odtNum)}>대기</button>
                                : 
                                    <button onClick={() => approval(order.odtNum)}>승인</button>
                                } 
                            </TableCell>
                        </tr>
                    ))}
                </TableBody>
            </Table> 
        </Wrapper>
    );
}

export default React.memo(AdminOrderDetail);


const Wrapper = styled.div`
    width: 100%;
    background-color:white;
    margin:1%;
`;
const Table = styled.table`
    width: 80%;
    border-collapse: collapse;
    margin: 0 auto;
`;

const TableCell = styled.td`
    border: 1px solid black;
    padding: 8px;
    text-align: center;
`;

const TableInfoCell = styled.td`
    border: 1px solid black;
    padding: 8px;
    text-align: center;
    width:60%;
    position: relative;
`;
const TableCountCell = styled.td`
    border: 1px solid black;
    padding: 8px;
    text-align: center;
    width:15%;
    position: relative;
`;

const TitleSpan = styled.span`
    display: inline-block;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    top: 20%;
    left: 2%;
    padding-right:3%;
    font-size:1.2rem;
`;

const PerPriceSpan = styled.span`
    display: inline-block;
    position: absolute;
    top: 70%;
    transform: translateY(-50%);
    left: 2%;
`;

const IsbnSpan = styled.span`
    display: inline-block;
    position: absolute;
    top: 70%;
    transform: translateY(-50%);
    right: 10%;
`;
const TableImgCell = styled.td`
    border: 1px solid black;
    padding: 8px;
    text-align: center;
    width:10%;
   
`;
const Image = styled.img`
    width: 100%; /* 원하는 가로 크기 */
    height: auto; /* 세로 크기는 가로 크기에 따라 자동으로 조절됩니다. */
`;
const TableBody = styled.tbody`
    border: 1px solid black;
`;
