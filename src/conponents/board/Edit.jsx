import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const Edit = () =>{
    const { boardSeq } = useParams(); 
    const navigate = useNavigate();
    const [board, setBoard] = useState([]); // board 변수 선언

    useEffect(() => {
        const getBoard = async () => {
          try {
            console.log(boardSeq);
            const resp = await axios.get(`/board/Edit/${boardSeq}`); // seq로[pk]값 가지고 오기
            console.log(resp.data);
            setBoard([resp.data]); // 가져온 데이터를 상태에 저장
          } catch (error) { // 못가지고 왔을시 error
            console.error("Error fetching board data:", error);
          } 
        };
          getBoard();
       }, [boardSeq]);
    

}
export default Edit;