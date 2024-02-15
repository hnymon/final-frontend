import React from 'react';
import DaumPostcode from "react-daum-postcode";
import styled from 'styled-components';

const CloseButton = styled.button`
    position: absolute;
    top: 27%; /* 원하는 위치로 조정 */
    right: 34.4%; /* 원하는 위치로 조정 */
`;
 
const PopupPostCode = (props) => {
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        props.onPostCode(data);
        props.onClose();
    }
 
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "20%",
        left:"33%",
        width: "33%",
        height: "60%",
        border: "1px solid black"
      };
 
    return(
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <CloseButton type='button' onClick={() => {props.onClose()}} className='postCode_btn'>닫기</CloseButton>
        </div>
    )
}
 
export default PopupPostCode;