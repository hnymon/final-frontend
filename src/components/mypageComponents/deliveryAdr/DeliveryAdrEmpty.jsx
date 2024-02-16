import styled from 'styled-components';
import Exmark from '../../../img/exclamation_mark150.png';
import { useState } from 'react';
import DaumPost from './DaumPost';
import PopupDom from './PopupDom';
import AddAdr from './AddAdr';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* 수평 가운데 정렬 */
    height: 100vh; /* 화면 세로 중앙 정렬을 위해 */
`;

const ImageDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* 수평 가운데 정렬 */
    text-align: center; /* 텍스트 정렬 */
`;

const AddAdrButton = styled.button`
    margin-top: 20px; /* 원하는 만큼의 간격을 설정하세요 */
    width: 20%; /* 버튼의 너비 설정 */
    height: 50px; /* 버튼의 높이 설정 */
    border-radius: 50%; /* 원형 모양으로 설정 */
    background-color: #CCCCCC; /* 배경색 설정 */
    border: none; /* 테두리 없앰 */
    color: black; /* 글자 색상 설정 */
    font-size: 12px; /* 글자 크기 설정 */
    cursor: pointer; /* 마우스 커서를 포인터로 설정 */
    display: flex; /* 내부 아이템을 가운데로 정렬하기 위해 필요 */
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 설정 */
    transition: all 0.3s ease; /* 변화에 애니메이션 효과 추가 */
    &:hover {
        transform: translateY(-2px); /* 호버 시 버튼이 약간 위로 이동하여 입체감 표현 */
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 크게 설정 */
    }
`;

const AddAdrButtonText = styled.span`
    font-size: 24px; /* "+" 기호의 크기 설정 */
    margin-right: 2%;
`;

const EmptyMsg = styled.span`
    margin-top: 10px; /* 이미지와 텍스트 사이의 간격 조정 */
`;

const DeliveryAdrEmpty = ({onSuccess}) => {
    
    
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
            <AddAdrButton type='button' onClick={openPostCode2}><AddAdrButtonText>+</AddAdrButtonText>배송지 추가</AddAdrButton>
            <div id='popupDom2'>
                {isPopupOpen2 && (
                    <PopupDom>
                        <AddAdr onClose={closePostCode2} onSuccess={onSuccess}/>
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