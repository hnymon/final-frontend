// DaumPost.js

import axios from 'axios';
import React from 'react';
import DaumPostcode from "react-daum-postcode";
import styled from 'styled-components';

const CloseButton = styled.button`
    position: absolute;
    top: 27%; /* 원하는 위치로 조정 */
    right: 34.4%; /* 원하는 위치로 조정 */
    background-color: transparent; /* 배경색을 투명하게 설정 */
    border: none; /* 테두리를 제거 */
    border-radius:50%;
    color: #333; /* 글자색을 지정 */
    padding: 10px; /* 적절한 패딩값 설정 */
    font-size: 20px; /* 글자 크기 설정 */
    cursor: pointer; /* 커서를 포인터로 변경하여 버튼임을 명시 */
    transition: background-color 0.3s ease; /* 배경색 변화에 애니메이션 효과 추가 */

    &:hover {
        background-color: #f0f0f0; /* 마우스 오버시 살짝 회색으로 배경색 변경 */
    }
    z-index:2;
`;

const DaumPost = (props) => {
    // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = async (data) => {
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
        props.onAddressSelected({ fullAddress, zonecode: data.zonecode }); // 주소 정보 전달
        try {
          const response = await axios.post("/testAdr");
          console.log(response.data);
        } catch (error) {
          
        }
    }
    
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "20%",
        left:"33%",
        width: "33%",
        height: "60%",
        border: "1px solid black",
        zIndex: "2"
      };
 
    return(
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <CloseButton type='button' onClick={() => {props.onClose()}} >X</CloseButton>
        </div>
    )
}
 
export default DaumPost;
