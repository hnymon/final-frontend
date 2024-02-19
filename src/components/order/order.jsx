import styled from "styled-components";
import FetchBookDetail from "../cart/FetchBookDetail";
import { useEffect, useState } from "react";
import OrderInfo from "./OrderInfo";
import { useLocation } from "react-router-dom";
import Payment from "./Payment";
import { Divider } from "@mui/material";
import PopupDom from "../mypageComponents/deliveryAdr/PopupDom";
import PopupPostCode from "./PopupPostCode";
import axios from "axios";
import GetTokenToHeader from "../../token/GetTokenToHeader";
import DeliveryListModal from "./DeliveryListModal";

const Order = () =>{
    const headers = GetTokenToHeader();
    const location = useLocation();
    const [cartInfoList, setCartInfoList] = useState([]);
    const [bookCount, setBookCount] = useState([]);
    const deliveryFee = 3000;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    // const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryInfo, setDeliveryInfo] = useState({
        addrName: "",
        name: "",
        phone: "",
        address: "",
        addrDetail:"",
        zipcode:"",
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [deliveryAddresses, setDeliveryAddresses] = useState([]);

    const productTotal = () =>{
        let totalPrice = 0;
        for(let i=0 ; i<cartInfoList.length ; i++){
            totalPrice += bookCount[i]*cartInfoList[i].salePrice;
        }
        return totalPrice;
    }

    const fetchOrderInfo = async () => {

        try {
          console.log(location.state.cartArray);
          console.log(location.state.bookCount);
          const cartInfoList = location.state.cartArray;
          setCartInfoList(cartInfoList);
          setBookCount(location.state.bookCount);
          console.log(cartInfoList);
          console.log(bookCount);
        } catch (error) {
          console.error('주문하기 책 정보 불러오기 오류', error);
        }
      };

      useEffect(() => {
        fetchOrderInfo();
        axios.get('/order/loadDefaultDelivery', headers)
            .then(response =>{
                console.log(response.data);
                setDeliveryInfo(response.data);
            })
      }, []);

      const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
      };

      const deliveryInfoChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        setDeliveryInfo((prevInfo) => ({
          ...prevInfo,
          [name]: value,
        }));
        console.log(deliveryInfo);
      };

      const formatPhoneNumber = (phoneNumber) => {
        // 전화번호 형식 변환 (000-0000-0000)
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

      const handlePhoneNumChange = (e) => {
        const { name, value } = e.target;

        const newValue = e.target.value.replace(/[^0-9]/g, '');
        const truncatedValue = newValue.slice(0, 11);
        // 형식 적용하여 state 업데이트
        setDeliveryInfo((prevInfo) => ({
            ...prevInfo,
            [name]: formatPhoneNumber(truncatedValue),
          }));
    };

    // 다음 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
    // 다음 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false);
    }

    const postCode = (data) => {
        // 받은 주소 정보 처리
        const fullAddress = data.address;
        const zipcode = data.zonecode;
        console.log(fullAddress, zipcode);
        setDeliveryInfo((prevInfo) => ({
            ...prevInfo,
            address: fullAddress,
            zipcode: zipcode,
          }));
          console.log(deliveryInfo);
    };

    const fetchDeliveryAddresses = async () => {
        try {
        // 배송지 목록을 불러오는 API 호출
        const response = await axios.get('/order/loadDeliveryList', headers);
        setDeliveryAddresses(response.data);
        } catch (error) {
        console.error('배송지 목록 불러오기 실패:', error);
        }
    };

    const loadDeliveryAddr = (e) =>{
        const {name, value} = e.target;
        if(name === "deliveryAddr" && value === "default") {
            axios.get('/order/loadDefaultDelivery', headers)
            .then(response =>{
                console.log(response.data);
                setDeliveryInfo(response.data);
            })
        }else{
            fetchDeliveryAddresses();
            handleOpen();

        }

    
    };



    return(
        <>
        <DeliveryListModal
            open = {open}
            handleClose = {handleClose}
            deliveryAddresses = {deliveryAddresses}
            setDeliveryInfo = {setDeliveryInfo}
        />
        <Display>
        <HeadLine>주문하기</HeadLine>
        <ToOrder>
            <Circle>1</Circle>
            <ToOrderNum>장바구니</ToOrderNum>
            <CircleSelected>2</CircleSelected>
            <ToOrderNum>주문/결제</ToOrderNum>
            <Circle>3</Circle>
            <ToOrderNum>주문완료</ToOrderNum>
        </ToOrder>
    </Display>
    <OrderContainer>
        <OrderPrice>
        <ul>
            <li>주문 합계</li>
            <li>상품 합계<span>{productTotal()} 원</span></li>
            <li>배송비<span>+{deliveryFee} 원</span></li>
        </ul>
        <Divider sx={{ height: 20, m: 0.5 }} orientation="horizontal" />
        <ul>
            <li>최종 결제 금액<span>{productTotal()+deliveryFee} 원</span></li>
        </ul>
        </OrderPrice>
        <Payment
            totalPrice={productTotal()+deliveryFee}
            cartInfoList={cartInfoList}
            bookCount={bookCount}
            selectedPaymentMethod={selectedPaymentMethod}
            deliveryInfo={deliveryInfo}
        />
        </OrderContainer>
    <H2>배송 정보</H2>
    <Delivery>
        <Addr>
        <ProductInformation>
            배송지 설정
        </ProductInformation>
        <ul>
            <li>
                <lable style={{marginRight:'15px'}}>배송지 불러오기</lable>
                <input type="radio" name="deliveryAddr" value="default" onChange={loadDeliveryAddr} defaultChecked/> <span>기본배송지</span>
                <input type="radio" name="deliveryAddr" value="others" onChange={loadDeliveryAddr}/> <span>배송지 목록</span>
            </li>
            <li>
                <label>배송주소</label>
                <input style={{width:'50px'}} name="zipcode" value={deliveryInfo.zipcode} onChange={deliveryInfoChange} readOnly></input>
                <button type='button' onClick={openPostCode}>도로명주소 검색</button>
                <div id='popupDom'>
                    {isPopupOpen && (
                        <PopupDom>
                            <PopupPostCode onClose={closePostCode} onPostCode={postCode} />
                        </PopupDom>
                    )}
                </div>
                <input style={{width:'400px'}} type="text" name="address" value={deliveryInfo.address} onChange={deliveryInfoChange} readOnly></input>
                <br></br>
                <label>상세주소</label><input name="addrDetail" value={deliveryInfo.addrDetail} onChange={deliveryInfoChange}></input>
            </li>
        </ul>
        </Addr>
        <Divider sx={{ height: 120, m: 1 }} orientation='vertical' />
        <PersonInfo>
            <ProductInformation>수령인 정보</ProductInformation>
            <Table>
                <tr>
                    <td>수령인</td> <td><input name="name" value={deliveryInfo.name} onChange={deliveryInfoChange}></input></td>
                </tr>
                <tr>
                    <td>휴대번호</td> <td><input name="phone" 
                                            value={deliveryInfo.phone} type="text"
                                            onChange={handlePhoneNumChange}></input></td>
                </tr>
            </Table>
        </PersonInfo>
    </Delivery>
    <H2>결제 상품</H2>
    <Books>
        <ProductInformation>
           상품 정보
        </ProductInformation>
        <Divider sx={{ height: 0, m: 0.5 }} orientation='horizontal' />
        <OrderInfo
        cartInfoList={cartInfoList}
        bookCount={bookCount}
        />
    </Books>
    <H2>결제 수단</H2>
    <ButtonDiv>
    <Button onClick={() => handlePaymentMethodChange('html5_inicis.INIpayTest')} selected={selectedPaymentMethod === 'html5_inicis.INIpayTest'}>
        신용/체크카드 결제
    </Button>
    <Button onClick={() => handlePaymentMethodChange('kakaopay')} selected={selectedPaymentMethod === 'kakaopay'}>
        카카오페이
    </Button>
    </ButtonDiv>
        </>
    )
}

export default Order;

const Addr = styled.div`
    margin-left: 4%;
    ul{
        margin: 10px;
    }
    label{
        margin-right: 15px;
    }
    button{
        margin-left: 10px;
    }
    span{
        margin-right: 5px;
    }
`

const Table = styled.table`

    td{
        padding-left: 10px;
    }

    input{
        width: 150px;
    }
`

const PersonInfo = styled.div`
    margin-right: 10%;
`
const ButtonDiv = styled.div`
    margin-left: 20%;
`
const Button = styled.button`
  margin-top: 30px;
  margin-left: 20px;
  background-color: ${({ selected }) => (selected ? '#FEC4C4' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  border: 3px solid #FEC4C4;
  border-radius: 30px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;

`

const ProductInformation = styled.div`
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    margin: 15px 0 10px 10px;
`

const Display = styled.div`
    width : 100%;
    margin : 20px;
    display: flex;
    justify-content: space-between;
`

const HeadLine = styled.h1`
    color: #525252;
`

const ToOrder = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;

`

const Circle = styled.div`
    width:30px;
    height: 30px;
    display:grid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center; 
    background-color: #D9D9D9;   
`

const CircleSelected = styled.div`
    display:grid;
    width:30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center; 
    background-color: #FEC4C4;
`

const ToOrderNum = styled.p`
    position:relative;
    top: 3px;
    margin: 0 30px 0 3px;
`

const Delivery = styled.form`
    width: 60%;
    margin: 20px 50px 50px 50px;
   text-align: left;
    display: flex;
    justify-content: space-between; /* 가로로 나란히 배치 */
    align-items: flex-start; /* 세로 방향 정렬은 위로 */
    border: 1px solid #B8B8B8;
    border-radius: 10px;
`

const Books = styled.div`
    width: 60%;
    margin: 20px 50px 50px 50px;
    text-align: center;
    border: 1px solid #B8B8B8;
    border-radius: 10px;
`

const OrderPrice = styled.div`
  border: 2px solid #DDDDDD;
  border-radius: 10px;

  ul{
    margin: 20px;
  }
  
  ul:first-child{
    margin-top: 50px;
  }
  
  li{
    margin: 5px;
  }
  
  span{
    float:right;
  }
`

const OrderContainer = styled.div`
  position: fixed;
  top: 250px;
  left: 70%;
  float: right;
  margin: 10px auto;
  width: 22%;
  height: 300px;
  font-size:20px;

`

const H2 = styled.h2`
  margin: 20px 0 0 30px;
`
