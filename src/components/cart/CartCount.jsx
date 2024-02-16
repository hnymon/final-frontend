import axios from "axios";
import GetTokenToHeader from "../../token/GetTokenToHeader";
import { useEffect} from "react";

export const SetCartCount = () =>{
    
    useEffect(() => {
        const headers = GetTokenToHeader();
        axios
          .get("/cart/count", headers)
          .then((response) => {
            localStorage.setItem('cartCount', response.data);
            console.log('장바구니 데이타', response.data);
          })
          .catch((error) => {
            console.error('장바구니 아이템 개수 조회 오류:', error);
          });
      }, []);

} 

export const getCartCount= () => {
    const count = localStorage.getItem('cartCount');
    return count ? parseInt(count) : 0; // 값이 없으면 기본값으로 0 반환
  };

export const AddCartCount = ()=>{
    const currentCount = getCartCount();
    const newCount = parseInt(currentCount) + 1;
    localStorage.setItem('cartCount', newCount);

}