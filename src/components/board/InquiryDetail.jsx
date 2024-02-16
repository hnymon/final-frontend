import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AdminComment from "./AdminComment";
import AdminCommentList from "./AdminCommentList";
import InquiryAllList from "./InquiryAllList";

// InquiryDetailContainer 컴포넌트에 스타일 적용
const InquiryDetailContainer = styled.div`
  margin: 10%;
`;

// InquiryTitle에 스타일 적용
const InquiryTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

// InquiryContent에 스타일 적용
const InquiryContent = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InquiryDetail = () => {
  const { inquiryId } = useParams();
  const [inquiry, setInquiry] = useState([]);
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
    const getBoard = async () => {
      try {
        const response = await axios.post(`/board/InquiryDetail/${inquiryId}`);
        setInquiry(response.data);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    getBoard();
  }, [inquiryId]);

  return ( 
    <InquiryDetailContainer>
      <InquiryContent>
      <InquiryTitle>1대1 문의 사항 상세 정보</InquiryTitle>
      <p>
        <strong>문의 제목: </strong>
        {inquiry.inquirySubject}
      </p>
        <strong>문의 내용: </strong>
        {inquiry.inquiryContent}
        <p>
        <strong>문의 시간: </strong>
        {formatDate(inquiry.inquiryDate)}
        </p>
      </InquiryContent>
      {inquiry && <AdminCommentList inquiryId={inquiry.inquiryId} />}
      {inquiry && <AdminComment inquiryId={inquiry.inquiryId} />}
      
    </InquiryDetailContainer>
  );
};

export default InquiryDetail;
