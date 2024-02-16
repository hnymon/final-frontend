import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const InquiryItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
`;

const InquiryItem = styled.div`
  margin-bottom: 20px;
  background-color: transparent;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
`;

const InquiryContent = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  height: 120px;
  border-radius: 15px;
  text-align: left;
  overflow: auto;
`;

const InquiryTypeLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? '#FFC0CB' : '#ccc')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const UnInquiryList = () => {
  const [inquiryList, setInquiryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = GetTokenToHeader();
        const response = await axios.post('/board/UnInquiryList',null, headers, {
          params: { page: currentPage },
        });
        const { list } = response.data;
        setInquiryList(list.content);
        setTotalPages(list.totalPages);
      } catch (error) {
        console.error('Error fetching inquiry list:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <InquiryContainer>
      <Title>Unprocessed Inquiry List</Title>
      <InquiryItemContainer>
        {inquiryList.map((inquiry) => (
          <InquiryItem key={inquiry.inquiryId}>
              <p><strong>문의사항</strong> {inquiry.inquiryType}({inquiry.inquiryStatus})</p>
              <p><strong>Q: </strong>{inquiry.inquirySubject}</p>
              <p>{formatDate(inquiry.inquiryDate)}</p>
              <hr />
              <InquiryContent>
                <p>{inquiry.inquiryContent}</p>
              </InquiryContent>
          </InquiryItem>
        ))}
      </InquiryItemContainer>
      <PaginationContainer>
        <PaginationButton onClick={handlePreviousPage(currentPage - 1)} disabled={currentPage === 0}>
            이전 페이지
            </PaginationButton>
            {[...Array(totalPages).keys()].map((page) => (
            <PaginationButton
                key={page}
                onClick={() => handlePageChange(page)}
                active={currentPage === page}
                disabled={currentPage === page}
            >
                {page + 1}
            </PaginationButton>
            ))}
            <PaginationButton onClick={handleNextPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>
            다음 페이지
        </PaginationButton>
      </PaginationContainer>
    </InquiryContainer>
  );
};

export default UnInquiryList;
