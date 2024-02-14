import { useState } from "react";
import AddAdr from "./AddAdr";
import DaumPost from "./DaumPost";
import PopupDom from "./PopupDom";
import styled from "styled-components";
import axios from "axios";
import EditAdr from "./EditAdr";


const AddAdrButton = styled.button`
    border-radius: 10px; /* 테두리를 둥글게 설정 */
    background-color: transparent; /* 배경색 없음 */
    color: blue; /* 글자색 파란색으로 설정 */
    padding: 10px 15px; /* 내부 여백 설정 */
    border: 3px solid blue;
    font-size:20px;
`;
const Wrapper = styled.div`

`;
const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; /* 요소들을 수직 가운데 정렬합니다. */
    border-bottom: 3px solid gray;
    margin-bottom: 2%;
    padding-bottom: 1%;
`;

const LengthSpan = styled.span`
    color:green;
    font-size:20px;
`;
const TextSpan = styled.span`
    color: black;
    font-size:20px;
`;
const PopupDiv = styled.div`
`;
const AdrDiv = styled.div`
    display: flex;
    align-items:center;
    margin-bottom: 2%;
    padding-bottom: 2%;
    border-bottom: 2px solid gray;
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
  border-radius: 50%;
`;


const InfoDiv = styled.div`
    flex-grow: 1; /* 가능한 공간을 모두 사용하도록 설정합니다. */
    margin-left: 20px; /* 라디오 버튼과의 간격을 조절합니다. */
    
`;

const EditAdrButton = styled.button`

`;
const DeleteAdrButton = styled.button`

`;

const DeliveryAdrExist = (props) => {
    const items = 3; 
    const total = props.addrs.length;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(total/items);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // 현재 페이지에 해당하는 데이터 가져오기
    const getDataForPage = () => {
        const startIndex = (currentPage - 1) * items;
        const endIndex = Math.min(startIndex + items, total);
        // startIndex부터 endIndex까지의 데이터 가져오기
        // 기본 주소가 먼저 오도록 정렬
        const sortedAddrs = props.addrs.sort((a, b) => {
            if (a.isDefault && !b.isDefault) return -1;
            if (!a.isDefault && b.isDefault) return 1;
            return 0;
        });
        // startIndex부터 endIndex까지의 데이터 가져오기
        // 예를 들어, API 호출 또는 로컬 데이터 배열 슬라이싱 등
        return sortedAddrs.slice(startIndex, endIndex);
    };
    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
      };
    
      const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      };
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
    // 다음 팝업창 상태 관리
    const [isPopupOpen3, setIsPopupOpen3] = useState(false)

    // 다음 팝업창 열기
    const openPostCode2 = () => {
        setIsPopupOpen2(true)
    }
    // 다음 팝업창 닫기
    const closePostCode2 = () => {
        setIsPopupOpen2(false)
    }
    // 다음 팝업창 열기
    const openPostCode3 = (address) => {
        setSelectedEditAddress(address)
        setIsPopupOpen3(true)
    }
    // 다음 팝업창 닫기
    const closePostCode3 = () => {
        setIsPopupOpen3(false)
    }

    // 주소 수정시 선택된 주소 정보를 저장할 상태
    const [selectedEditAddress, setSelectedEditAddress] = useState(null);

    const [selectedAddrNum, setSelectedAddrNum] = useState(null);
    const handleRadioChange = (addrNum) => {
        setSelectedAddrNum(addrNum); // 선택된 주소의 addrNum 업데이트
    };
    const setDefaultAddress = async () => {
    if (!selectedAddrNum) {
        alert('주소를 선택해주세요.');
        return;
    }

    try {
        const response = await axios.post('/setDefaultAddress', {
        addrNum: selectedAddrNum,
        });
        console.log(response.data);
        // 기본 배송지 설정이 성공적으로 처리된 경우
        if(response.data.result==="Success"){
            props.onSuccess();
            alert("기본배송지가 변경되었습니다.")
        } else {
            alert("이미 기본배송지입니다.")
        }
    } catch (error) {
        console.error('Error setting default address:', error);
    }
    };
    const deleteAdr = async (address) => {
        try {
            const AdrName = address.daName;
            const response = await axios.post("/deleteAdr", address);
            if(response.data.result === "Remove"){
                props.onSuccess();
                alert(AdrName + " 배송지가 삭제되었습니다.");
            }
        } catch (error) {
            
        }
    }
    return(
        <>
            <Wrapper>
                {/* 페이지 버튼 렌더링 */}
                <button onClick={prevPage} disabled={currentPage === 1}>
          이전
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          )
        )}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          다음
        </button>
                <HeaderDiv>
                    <div>
                        <LengthSpan>{props.addrs.length}</LengthSpan>
                        <TextSpan>개</TextSpan>
                    </div>
                    <PopupDiv>
                        <AddAdrButton type='button' onClick={openPostCode2}>&#43; 배송지 등록</AddAdrButton>
                        <div id='popupDom2'>
                            {isPopupOpen2 && (
                                <PopupDom>
                                    <AddAdr onClose={closePostCode2} onSuccess={props.onSuccess}/>
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
                    </PopupDiv>
                </HeaderDiv>
            </Wrapper>
            {getDataForPage().map((address, index) => (
                <AdrDiv key={index}>
                    {/* 라디오 버튼 추가 */}
                    <RadioButton name="addressSelection" 
                        value={address.addrNum}
                        checked={selectedAddrNum === address.addrNum}
                        onChange={() => handleRadioChange(address.addrNum)}
                    />
                    <InfoDiv>
                        <span>{address.daName}</span>
                        <p>{address.recipientName} / {address.recipientTel}</p>
                        <p>[{address.zipcode}] {address.address} {address.addrDetail}</p>
                        <p>배송 요청사항: {address.deliveryRequest}</p>
                        <p>기본 주소 여부: {address.isDefault ? '기본 배송지' : '일반 주소'}</p>
                        <EditAdrButton type='button' onClick={() => openPostCode3(address)}>수정</EditAdrButton>
                        <div id='popupDom3'>
                            {isPopupOpen3 && (
                                <PopupDom>
                                    <EditAdr onClose={closePostCode3} address={selectedEditAddress} onSuccess={props.onSuccess}/>
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
                        <DeleteAdrButton onClick={() => deleteAdr(address)}>삭제</DeleteAdrButton>
                    </InfoDiv>
                </AdrDiv>
            ))}
            <button onClick={setDefaultAddress}>기본 배송지 설정</button>
        </>
    );
}
export default DeliveryAdrExist;
