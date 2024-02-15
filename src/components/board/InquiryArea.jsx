import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import GetTokenToHeader from '../../token/GetTokenToHeader';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  width: 40%;
  padding: 60px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 35px;
`;

const Input = styled.input`
  width: calc(100% - 16px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: calc(100% - 16px);
  height: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const Select = styled.select`
  width: calc(100% - 16px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  margin-left: 80%;
  width: 20%;
  padding: 10px;
  background-color: #FFC0CB;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const InquiryArea = () => {
  const navigate = useNavigate();
  const [inquiryEntity, setFormData] = useState({
    inquirySubject: "",
    inquiryContent: "",
    inquiryType: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
      if(!inquiryEntity.inquirySubject || !inquiryEntity.inquiryType|| !inquiryEntity.inquiryContent){
        alert("입력란에 입력해주세요.");
        return ;
    }
    try {
      const headers = GetTokenToHeader();
      const response = await axios.post("/board/InquiryArea", inquiryEntity, {
        headers,
      });
      console.log('서버 응답:', response.data);
      
      // 제출 후 필드를 초기화합니다.
      setFormData({ inquirySubject: '', inquiryContent: '', inquiryType: '' });
      navigate('/board/Inquiry');
    } catch (error) {
        alert("로그인후 작성하실수있습니다");
        alert("로그인페이지로 이동합니다");
        navigate("/login");
      console.error('문의 제출 실패:', error);
    }
  };

  return (
    <Container>
      <FormContainer>
      <h2>1:1 문의 작성하기</h2>
      <br />
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Select
              name="inquirySubject"
              value={inquiryEntity.inquiryType}
              onChange={(e) => setFormData({ ...inquiryEntity, inquiryType: e.target.value })}
              // required
            >
              <option value="">선택해주세요</option>
              <option value="제품 관련 문의">제품 관련 문의</option>
              <option value="배송/수령예정일안내">배송/수령예정일안내</option>
              <option value="주문/결제 관련 문의">주문/결제 관련 문의</option>
              <option value="검색 기능 관련 문의">검색 기능 관련 문의</option>
              <option value="반품/교환/환불(도서)">반품/교환/환불(도서)</option>
              <option value="회원 정보서비스 문의">회원 정보서비스 문의</option>
              <option value="웹사이트 이용 관련 문의">웹사이트 이용 관련 문의</option>
              <option value="시스템불편사항">시스템불편사항</option>
              <option value="서양도서 검색/주문">서양도서 검색/주문</option>
              <option value="일본도서 검색/주문">일본도서 검색/주문</option>
              <option value="택배사사례">택배사사례</option>
              <option value="고객제안/친절불친절">고객제안/친절불친절</option>
              <option value="파본/상품분량신고">파본/상품분량신고</option>
              <option value="북로그/리뷰&리스트">북로그/리뷰&리스트</option>
              <option value="대량구매">대량구매</option>
              <option value="개인정보침해 신고">개인정보침해 신고</option>
              <option value="기타">기타</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Input 
              type="text" 
              value={inquiryEntity.inquirySubject}
              onChange={(e) => setFormData({...inquiryEntity, inquirySubject: e.target.value })}
              // required
              placeholder='제목을 입력하세요.'
            />
          </FormGroup>
          <FormGroup>
            <TextArea
              name="inquiryContent"
              value={inquiryEntity.inquiryContent}
              onChange={(e) => setFormData({ ...inquiryEntity, inquiryContent: e.target.value })}
              // required
              placeholder='내용을 입력하세요.'
            />
          </FormGroup>
          <SubmitButton type="submit">문의 제출</SubmitButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default InquiryArea;
