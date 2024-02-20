import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import GetTokenToHeader from '../../token/GetTokenToHeader';

const InquiryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 10%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 50px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1);
  min-height: 80vh;
  position: relative;
`;

const Title = styled.h2`
  font-size: 45px;
  margin-bottom: 40px;
`;

const Button = styled.button`
  background-color: #FFC0CB;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const InquiryItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:30%;
`;

const InquiryItem = styled.div`
  margin-bottom: 20px;
  background-color: transparent;
  border-radius: 15px;
  overflow: hidden;
  width: 180%; /* 수정 필요한 부분 */
  margin-bottom: 60px;
  `;

const InquriyItems = styled.div`
  margin-bottom: 10px;
  text-align: right; /* 수정된 부분 */
  width: 95%; /* 수정 필요한 부분 */
  padding: 5px;
`;

const InquiryContent = styled.div`
  background-color: #f0f0f0;
  padding: 20px; /* 수정된 부분: 가로와 세로 모두 20px로 키움 */
  height: 120px;
  border-radius: 15px;
  text-align: left;
  overflow: auto;

`;
const PaginationContainer = styled.div`
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin-right: 5px;
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? '#ccc' : '#FFC0CB')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const InquiryList = () => {
  const [inquiryList, setInquiryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiryList = async (page) => {
      try {
        const headers = GetTokenToHeader();
        const response = await axios.post(`/board/InquiryList?page=${page}`, null, headers,{
          params: {
            page: currentPage, 
            size: pageSize,
          },
        });
        console.log(response.data.paging);
        const { content, totalPages } = response.data.paging;
        const formattedContent = content.map(inquiry => {
          return {
            ...inquiry,
            inquiryDate: formatDate(inquiry.inquiryDate)
          };
        });
        setInquiryList(formattedContent);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching inquiry list:', error);
      }
    };
    fetchInquiryList(currentPage);
    
  }, [currentPage]);
  
  const formatDate = (content) => {
    const date = new Date(content);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  

  const handleButtonClick = () => {
    navigate("/board/InquiryArea");
  };
 
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  return (
    <InquiryContainer>
      <Title>1대1문의 사항</Title>
      <Button onClick={handleButtonClick}>1대1문의</Button>
      <InquiryItemContainer>
        {inquiryList.map((inquiry) => (
          <InquiryItem key={inquiry.inquiryId}>
            <p><strong>문의사항:</strong>  {inquiry.inquiryType} ({inquiry.inquiryStatus})</p>
            <p><strong>Q :</strong> {inquiry.inquirySubject}</p> 
            <InquriyItems>{inquiry.inquiryDate}</InquriyItems>
            <hr />
            <InquiryContent>
              <pre>{inquiry.inquiryContent}</pre>
            </InquiryContent>
            
          </InquiryItem>
        ))}
      </InquiryItemContainer>
      <PaginationContainer>
        
        <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 0}>이전페이지</PaginationButton>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationButton key={index} onClick={() => handlePageClick(index)}>
            {index + 1}
          </PaginationButton>
        ))}
        <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>다음페이지</PaginationButton>
      </PaginationContainer>
    </InquiryContainer>
  );
};

export default InquiryList;
