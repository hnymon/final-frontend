import styled from "styled-components";
import XButton from "./XButton";


const CartListInfo = ({ cartInfoList, bookCount, bookPrice, selectedBooks, decrease, increase, removeFromCart, CheckedBook }) => {
    
    return (
      <CartWrapper>
        {cartInfoList.map((book, index) => {
          const totalPrice = bookCount[index] * bookPrice[index];
  
          return (
            <CartContainer key={index}>
              <CheckBox
                type="checkbox"
                checked={selectedBooks.includes(book.isbn) ? true : false}
                onChange={(e) => CheckedBook(book.isbn, e.target.checked)}
              />
              <Img>
                <img src={book.thumbnail ? book.thumbnail : 'http://via.placeholder.com/120X150'} alt="" />
              </Img>
              <BookInfo>
                <li>{book.title}</li>
                <li>{book.salePrice} 원</li>
              </BookInfo>
              <BookTotalPrice>
                <li>{totalPrice} 원</li>
                <li>
                  <button onClick={() => decrease(index)}>-</button> {bookCount[index]}{" "}
                  <button onClick={() => increase(index)}>+</button>
                </li>
              </BookTotalPrice>
              <ul>
                <li><XButton isbn={book.isbn} onRemove={removeFromCart} /></li>
              </ul>
            </CartContainer>
          );
        })}
      </CartWrapper>
    );
  }

  const CartContainer = styled.div`
  display: flex;
  margin: 10px;
  width: 80%;
  font-size: 14px;
  font-weight: 500;
`

  const CheckBox = styled.input`
  margin: 5px 20px 0 5px;
  vartical-align: text-top;
`

const Img = styled.div`
  width : 120px;
  height : 160px;
  img{
    width : 120px;
    height: 160px;
  }
`

const BookInfo = styled.ul`
  margin: 10px 30px;
  width: 100%;

  li:last-child{
    margin: 10px 0 0 0;
  }
`

const BookTotalPrice = styled.ul`
  margin: 10px 0 0 50px;
  width: 150px;
`
const CartWrapper = styled.div`
  width: 60%;
`

  
  export default CartListInfo;