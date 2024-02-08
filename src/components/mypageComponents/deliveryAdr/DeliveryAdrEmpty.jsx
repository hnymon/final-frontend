import styled from 'styled-components';
import Exmark from '../../../img/exclamation_mark150.png';
import { useState } from 'react';
import DaumPost from './DaumPost';
import PopupDom from './PopupDom';
import AddAdr from './AddAdr';

const Wrapper = styled.div`
`;
const ImageDiv = styled.div`
`;
const AddAdrButton = styled.button`
`;
const EmptyMsg = styled.span`
`;

const DeliveryAdrEmpty = () => {
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

    	// 다음 팝업창 상태 관리
        const [isPopupOpen2, setIsPopupOpen2] = useState(false)
 
        // 다음 팝업창 열기
        const openPostCode2 = () => {
            setIsPopupOpen2(true)
        }
        // 다음 팝업창 닫기
        const closePostCode2 = () => {
            setIsPopupOpen2(false)
        }
    return(
        <Wrapper>
            <ImageDiv>
                <img src={Exmark} alt="" />
                <EmptyMsg>등록된 배송지가 없습니다.</EmptyMsg>
            </ImageDiv>
            <AddAdrButton type='button' onClick={openPostCode2}>모달테스트</AddAdrButton>
            <div id='popupDom2'>
                {isPopupOpen2 && (
                    <PopupDom>
                        <AddAdr onClose={closePostCode2} />
                    </PopupDom>
                )}
            </div>
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <DaumPost onClose={closePostCode} />
                    </PopupDom>
                )}
            </div>
        </Wrapper>
    );
}
export default DeliveryAdrEmpty;