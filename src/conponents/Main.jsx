import { Link } from "react-router-dom";

const Main =()=>{
    return(
        <>
            <Link to={'/board/BoardCreate'}>게시글 작성</Link><br/>
            <Link to={'/board/BoardList'}>게시판</Link>
            <Link to={'/board/Edit'}>게시판</Link>
        </>
    )
}
export default Main;