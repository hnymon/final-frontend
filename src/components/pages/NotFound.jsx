import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            fontSize:'60px',
            position:'absolute',
            width:'100%',
            height:'100%',
            backgroundColor:"silver",
            paddingTop:"10%"
        }}>
            <h1>404 Error</h1>
            <Link to={"/"}>홈페이지</Link>
        </div>
    )
};

export default NotFound;