import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Table = styled.table`
    width: 80%;
    max-width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
    }

    th {
        background-color: #ffeded;
    }
`;

const PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const PaginationButton = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #dddddd;
    background-color: #ffffff;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const InquiryAllList = () => {
    const [inquiryList, setInquiryList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
      
    useEffect(() => {
        const fetchInquiryList = async () => {
            try {
                const response = await axios.get(`/board/InquiryAllList?page=${currentPage}`);
                setInquiryList(response.data.list);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching inquiry list:", error);
            }
        };
        
        fetchInquiryList();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowClick = (inquiryId) => {
        // 각 행을 클릭할 때 해당 문의의 세부 정보 페이지로 이동
        window.location.href = `/board/InquiryDetail/${inquiryId}`;
    };

    return (
        <div>
            <h2>문의 테이블</h2>
            <TableContainer>
                <Table>
                    {/* 테이블 헤더 */}
                    <thead>
                        <tr>
                            <th>문의 ID</th>
                            <th>문의 제목</th>
                            <th>문의 타입</th>
                            <th>문의 내용</th>
                            <th>문의 시간</th>
                            <th>문의 처리</th>
                            <th>회원 번호</th>
                            <th>회원</th>
                        </tr>
                    </thead>
                    {/* 테이블 바디 */}
                    <tbody>
                        {inquiryList.map((inquiry) => (
                            <tr key={inquiry.inquiryId} onClick={() => handleRowClick(inquiry.inquiryId)}>
                                <td>{inquiry.inquiryId}</td>
                                <td>{inquiry.inquirySubject}</td>
                                <td>{inquiry.inquiryType}</td>
                                <td>{inquiry.inquiryContent}</td>
                                <td>{formatDate(inquiry.inquiryDate)}</td>
                                <td>{inquiry.inquiryStatus}</td>
                                <td>{inquiry.member.memberNum}</td>
                                <td>{inquiry.member.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* 페이지네이션 */}
                <PaginationContainer>
                    <PaginationButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                        이전 페이지
                    </PaginationButton>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationButton key={index} onClick={() => handlePageChange(index)}>
                            {index + 1}
                        </PaginationButton>
                    ))}
                    <PaginationButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                        다음 페이지
                    </PaginationButton>
                </PaginationContainer>
            </TableContainer>
        </div>
    );
};

export default InquiryAllList;
