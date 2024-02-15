import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AdminComment from "./AdminComment";
import AdminCommentList from "./AdminCommentList";
import InquiryAllList from "./InquiryAllList";

const InquiryDetailContainer = styled.div`
  margin: 10%;
`;

const InquiryTitle = styled.h2`
  font-size: 24px;
`;

const InquiryContent = styled.p`
  margin-bottom: 20px;
`;

const InquiryDetail = () => {
  const { inquiryId } = useParams();
  const [inquiry, setInquiry] = useState([]);

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
      <InquiryTitle>1대1 문의 사항 상세 정보</InquiryTitle>
      <p>
        <strong>문의 제목: </strong>
        {inquiry.inquirySubject}
      </p>
      <InquiryContent>
        <strong>문의 내용: </strong>
        {inquiry.inquiryContent}
      </InquiryContent>
      {inquiry && <AdminCommentList inquiryId={inquiry.inquiryId} />}
      {inquiry && <AdminComment inquiryId={inquiry.inquiryId} />}
      
    </InquiryDetailContainer>
  );
};

export default InquiryDetail;
