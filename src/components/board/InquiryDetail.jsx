import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminComment from "./AdminComment";
import AdminCommentList from "./AdminCommentList";

const InquiryDetail = () => {
    const { inquiryId } = useParams(); // 값 가지고오는놈
    const [ inquiry , setInquiry ] = useState([]);
    useEffect(() => {
        const getBoard = async () => {
          try {
            console.log(inquiryId)
            const response = await axios.post(`/board/InquiryDetail/${inquiryId}`);
            setInquiry(response.data);
          } catch (error) {
            console.error("Error fetching board data:", error);
          }
        };
        getBoard();
      }, [inquiryId]);
    return(
        
        <div>
        <h2>1대1 문의 사항 상세 정보</h2>
        <p><strong>문의 제목: </strong>{inquiry.inquirySubject}</p>
        <p><strong>문의 내용: </strong>{inquiry.inquiryContent}</p>
        {/* 이하 추가 필요한 정보 표시 */}
           {inquiry && <AdminCommentList inquiryId={inquiry.inquiryId}/>}
           {inquiry && <AdminComment inquiryId={inquiry.inquiryId}/>}
        </div>
    );
}
export default InquiryDetail;