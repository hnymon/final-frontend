import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GetTokenToHeader from '../../token/GetTokenToHeader';
import { useNavigate } from 'react-router-dom';

const Payment = ({cartInfoList,bookCount, totalPrice, selectedPaymentMethod, deliveryInfo}) => {
  const bookPrice = [];
  for (let i = 0; i < cartInfoList.length; i++) {
    bookPrice.push(bookCount[i] * cartInfoList[i].salePrice);
  }

  const navigate = useNavigate();
  
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);


  const requestPay = () => {
    console.log(deliveryInfo);
    console.log(cartInfoList);
    console.log(bookCount);
    console.log(totalPrice);
    console.log(bookPrice);

    if (!deliveryInfo || !deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.email || !deliveryInfo.address) {
      alert('배송 정보를 모두 입력해주세요');
      return;
    };

    if(selectedPaymentMethod === ''){
      console.log(selectedPaymentMethod);
      alert('결제 방법을 선택하세요');
      return;
    };


    const { IMP } = window;
    IMP.init('imp77308882');

    IMP.request_pay({
      pg: `${selectedPaymentMethod}`,
      pay_method: 'card',
      merchant_uid: new Date().getTime(),
      name: `${cartInfoList[0].title} 외 ${cartInfoList.length}건`,
      amount: `${totalPrice}`,
      buyer_email: `${deliveryInfo.email}`,
      buyer_name: `${deliveryInfo.name}`,
      buyer_tel: `${deliveryInfo.phone}`,
      buyer_addr: `${deliveryInfo.address}`,
      buyer_postcode: '123-456',
    }, async (rsp) => {
      try {
        const { data } = await axios.post(`/payment/validation/${rsp.imp_uid}`);
        if (rsp.paid_amount === data.response.amount) {
            try {
              const headers = GetTokenToHeader();
              const orderDTO = {
                isbn: cartInfoList.map(item => item.isbn),
                bookCount: bookCount.map(item => item),
                bookPrice: bookPrice,
                totalPrice: totalPrice,
                deliveryInfo: deliveryInfo,
              }
              const response = await axios.post(`order/add`, orderDTO, headers);
              alert('결제 성공');
              navigate('/order/success');
              

            } catch (error) {
              alert('오류 발생');
              console.log(error)
            }
        } else {
          alert('결제 실패');
          navigate('/order/success');
        }
      } catch (error) {
        console.error('Error while verifying payment:', error);
        alert('결제 실패');
      }
    });
  };


  return (
    <div>
      <Button onClick={requestPay}>결제하기</Button>
    </div>
  );
};

export default Payment;

const Button = styled.button`
  margin-top: 40px;
  background-color: white;
  border: 3px solid #FEC4C4;
  border-radius: 30px;
  width: 100%;
  height: 50px;
  font-size: 20px;
  cursor: pointer;

`