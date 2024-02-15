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

const ToggleButton = styled.button`
    margin-top: 10px;
    margin-left: 93%; /* 왼쪽 여백을 자동으로 설정하여 버튼을 오른쪽으로 이동 */
    background-color: #f9f9f9;
    border: none;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const AdminCommentContainer = styled.div`
    background-color: rgba(80, 85, 177, 0.06);
    padding: 20px;
    height: 120px;
    border-radius: 15px;
    text-align: left;
    overflow: auto;
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


const AdminCommentList = ({ inquiryId }) => {
    const [adminComments, setAdminComments] = useState([]);

    useEffect(() => {
        const fetchAdminComments = async () => {
            try {
                const response = await axios.post(`/board/AdminCommentList/${inquiryId}`);
                setAdminComments(response.data.list);
            } catch (error) {
                console.error("Error fetching admin comments:", error);
            }
        };

        fetchAdminComments();
    }, [inquiryId]); // inquiryId가 변경될 때마다 실행되도록 함

    return (
        <AdminCommentContainer>
            <ul>
                {adminComments.map((comment, index) => (
                    <li key={index}>
                        <strong>답변 내용:</strong> {comment.adminComment} {formatDate(comment.adminCommentDate)}<br />
                    </li>
                ))}
            </ul>
        </AdminCommentContainer>
    );
};

//
const OkInquiryList = () => {
  const [inquiryList, setInquiryList] = useState([]);
  const [toggledItemId, setToggledItemId] = useState(null); // 토글 상태 관리
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = GetTokenToHeader();
        const response = await axios.post('/board/OkInquiryList',null, {
          params: { page: currentPage ,size: pageSize,},
          headers,
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

  const toggleItem = (itemId) => {
    setToggledItemId(itemId === toggledItemId ? null : itemId);
  };

  return (
    <InquiryContainer>
      <Title>1대1문의 사항</Title>
      <InquiryItemContainer>
        {inquiryList.map((inquiry) => (
          <InquiryItem key={inquiry.inquiryId}>
            <p><strong>문의사항</strong> {inquiry.inquiryType}({inquiry.inquiryStatus})</p>
            <p><strong>Q: </strong>{inquiry.inquirySubject}</p>
            <p>{formatDate(inquiry.inquiryDate)}</p>
            <br />
            <InquiryContent>
              <p>{inquiry.inquiryContent}</p>
            </InquiryContent>
              <ToggleButton onClick={() => toggleItem(inquiry.inquiryId)}>
                {toggledItemId === inquiry.inquiryId ? '▲' : '▼'}
              </ToggleButton>
              {toggledItemId === inquiry.inquiryId && <AdminCommentList inquiryId={inquiry.inquiryId}/>}
              <br />
              <hr />
              <br />
          </InquiryItem>
        ))}
      </InquiryItemContainer>
      <PaginationContainer>
           <PaginationButton onClick={() => handlePreviousPage(currentPage)} disabled={currentPage === 0}>
          이전페이지
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
        <PaginationButton onClick={() => handleNextPage(currentPage)} disabled={currentPage === totalPages-1}>
          다음페이지
        </PaginationButton>
      </PaginationContainer>
    </InquiryContainer>
  );
};

export default OkInquiryList;
