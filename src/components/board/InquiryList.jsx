import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const InquiryList = () => {
  const [inquiryList, setInquiryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10; // 페이지당 아이템 수
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchInquiryList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("/board/InquiryList", null, {
          params: {
            page: currentPage, // 현재 페이지 번호
            size: pageSize,    // 페이지 크기
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { content, totalPages } = response.data.paging;
        setInquiryList(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching inquiry list:', error);
      }
    };
    fetchInquiryList();
  }, [currentPage]); // currentPage가 변경될 때마다 useEffect가 실행되도록 설정

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleButtonClick = () => {
    navigate("/board/InquiryArea");
  };
  return (
    <div>
      <h2>Inquiry List</h2>
      <button onClick={handleButtonClick}>1대1문의</button>
      <div>
        {inquiryList.map((inquiry) => (
          <div key={inquiry.inquiryId}>
            <br />
            <p><strong>문의사항:</strong> <Link to={`/board/InquiryDetail/${inquiry.inquiryId}`}>{inquiry.inquiryType}</Link></p>
            <p><strong>Q :</strong> {inquiry.inquirySubject}</p>
            <div>
            <p><strong></strong> {inquiry.inquiryContent}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          이전페이지
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button key={page} onClick={() => handlePageChange(page + 1)} className={currentPage === page + 1 ? 'active' : ''}>
            {page + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          다음페이지
        </button>
      </div>
    </div>
  );
  
  
};

export default InquiryList;
