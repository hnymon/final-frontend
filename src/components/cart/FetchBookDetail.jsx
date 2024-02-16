import axios from "axios";
import { useState } from "react";


const FetchBookDetail = async (cartData) =>{

    // const [cartInfoList, setCartInfoList] = useState([]);
    // const [bookCount, setBookCount] = useState([]);

    try{
      const cartInfoList = [];
      const bookCount = [];
      const cartArray = Object.values(cartData);
      console.log("cartArray "+cartArray)
      for(const cartItem of cartData){
        const isbn13 = cartItem.isbn13;
        const count = cartItem.count;
        console.log(isbn13, count);
        const response = await axios.post("/naver_book_adv_Api", {
          isbn: cartItem.isbn13
        });
        const data = JSON.parse(response.data.detail).items[0];
        console.log(data);
        console.log(data.title);

        if (data && data.title) {
          cartInfoList.push({
            title: data.title,
            salePrice: data.discount,
            thumbnail: data.image,
            isbn: data.isbn,
            count: cartItem.count,
          });
          bookCount.push(count);
        } else {
          console.error('No book details found.');
        }
      }
    //   setCartInfoList(cartInfoList);
    return { cartInfoList, bookCount };
    } catch (error) {
        console.error('Error fetching book detail:', error);
        return { cartInfoList: [], bookCount: [] };
    }
  };

export default FetchBookDetail;