import { useState } from "react";
import styled from "styled-components";
import PopupDom from './PopupDom';
import DaumPost from './DaumPost';

const CloseButton = styled.button`
    position: absolute;
    top: 27%; /* 원하는 위치로 조정 */
    right: 34.4%; /* 원하는 위치로 조정 */
`;
const AddAdrButton = styled.button`
`;

const AdrContainer = styled.div`
    display: block;
    position: absolute;
    top: 20%;
    left:33%;
    width: 33%;
    height: 60%;
    border: 1px solid black;
`;

const AddAdr = (props) => {
    // 다음 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
    // 다음 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
    // 다음 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }
    return(
        <>
            <h1>Test</h1>
            <AdrContainer>
                asd
                <AddAdrButton type='button' onClick={openPostCode}>우편번호 검색</AddAdrButton>
                <div id='popupDom'>
                    {isPopupOpen && (
                        <PopupDom>
                            <DaumPost onClose={closePostCode} />
                        </PopupDom>
                    )}
                </div>
            </AdrContainer>
            <CloseButton type='button' onClick={() => {props.onClose()}} >닫기</CloseButton>
        </>
    )

}

export default AddAdr;