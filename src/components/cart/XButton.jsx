import axios from "axios";
import styled from "styled-components";
import GetTokenToHeader from "../../token/GetTokenToHeader";


const XButton = ({isbn, onRemove}) =>{

    const removeCartItem = async () =>{
        if(window.confirm("삭제하시겠습니까?")){
            try {
                // 책 삭제 요청을 보냅니다. isbn을 URL 파라미터로 사용합니다.
                await axios.delete(`/cart/delete/${isbn}`, GetTokenToHeader);
                
                // 삭제가 성공하면 onRemove 콜백 함수를 호출하여 부모 컴포넌트에서 상태를 업데이트합니다.
                if (typeof onRemove === 'function') {
                    onRemove(isbn);
                }
            } catch (error) {
                console.error('Error removing book from cart:', error);
            }
        }else{
            alert('취소되었습니다.');
        }
    }

    
    return(
        <Button onClick={removeCartItem}>
            x
        </Button>
    )
}

const Button = styled.button`
    width : 20px;
    height: 20px;
    background-color: white;
    border: none;
    color: #666;
`


export default XButton;