import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminCommentList = () => {
    const {inquiryId} = useParams();
    const [adminComments, setAdminComments] = useState([]);
    
    useEffect(() => {
        const fetchAdminComments = async () => {
            try {
                console.log(inquiryId);
                const response = await axios.post(`/board/AdminCommentList/${inquiryId}`);
                console.log(response.data);
                setAdminComments(response.data.list);
            } catch (error) {
                console.error("Error fetching admin comments:", error);
            }
        };

        fetchAdminComments();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <div>
            <h2>관리자 답변 목록</h2>
            <ul>
                {adminComments.map((comment, index) => (
                    <li key={index}>
                        <strong>답변 내용:</strong> {comment.adminComment}<br />
                        <strong>답변 날짜:</strong> {comment.adminCommentDate}<br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminCommentList;
