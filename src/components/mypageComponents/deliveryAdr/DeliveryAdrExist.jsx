import { useState } from "react";
import AddAdr from "./AddAdr";
import DaumPost from "./DaumPost";
import PopupDom from "./PopupDom";
import styled from "styled-components";
import axios from "axios";
import EditAdr from "./EditAdr";
import EditB from "../../../img/Edit.png"
import DelB from "../../../img/Delete.png"

const AddAdrButton = styled.button`
    border-radius: 10px; /* 테두리를 둥글게 설정 */
    background-color: transparent; /* 배경색 없음 */
    color: skyblue; /* 글자색 파란색으로 설정 */
    padding: 10px 15px; /* 내부 여백 설정 */
    border: 3px solid skyblue;
    font-size:20px;
    cursor:pointer;
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
    display: flex;
    position: relative; 
`;
const ButtonDiv = styled.div`
    position: absolute;
    right: 50px; 
    top: 30%;
`
const EditAdrButton = styled.button`
    width: 40px;
    height: 40px;
    margin-right:20px;
    padding: 0; /* 패딩을 0으로 설정하여 내부 여백 제거 */
    border: none;
    border-radius: 50%;
    background-color: transparent;
    background-image: url(${EditB});
    background-size: contain; /* 이미지가 버튼에 맞게 조정됩니다. */
    background-repeat: no-repeat; /* 배경 이미지 반복 제거 */
    background-position: center; 
    cursor: pointer;
    &:hover {
        transform: translateY(-2px); /* 호버 시 버튼이 약간 위로 이동하여 입체감 표현 */
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 크게 설정 */
    }
`;
const DeleteAdrButton = styled.button`
    width: 40px;
    height: 40px;
    padding: 0; /* 패딩을 0으로 설정하여 내부 여백 제거 */
    border: none;
    border-radius: 50%;
    background-color: transparent;
    background-image: url(${DelB});
    background-size: contain; /* 이미지가 버튼에 맞게 조정됩니다. */
    background-repeat: no-repeat; /* 배경 이미지 반복 제거 */
    background-position: center; 
    cursor: pointer;
    &:hover {
        transform: translateY(-2px); /* 호버 시 버튼이 약간 위로 이동하여 입체감 표현 */
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 크게 설정 */
    }
`;

const Div = styled.div`
    margin-left: 30px;
    width: 90%;
`


const DeliveryAdrExist = (props) => {
    const items = 2;
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
        <Div>
            <Wrapper>
                
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
                        <div>
                            <span>{address.daName}</span>
                            <p>{address.recipientName} / {address.recipientTel}</p>
                            <p>[{address.zipcode}] {address.address} {address.addrDetail}</p>
                            <p>배송 요청사항: {address.deliveryRequest}</p>
                            <p>기본 주소 여부: {address.isDefault ? '기본 배송지' : '일반 주소'}</p>
                        </div>
                        <ButtonDiv>
                            <EditAdrButton type='button' onClick={() => openPostCode3(address)}></EditAdrButton>
                            <DeleteAdrButton onClick={() => deleteAdr(address)}></DeleteAdrButton>
                        </ButtonDiv>
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
                    </InfoDiv>
                </AdrDiv>
            ))}
            <FooterDiv>
                <BasicDiv>
                    <BasicBtn onClick={setDefaultAddress}>기본 배송지 설정</BasicBtn>
                </BasicDiv>
                <PagingDiv>
                    {/* 페이지 버튼 렌더링 */}
                    <PagingArBtn onClick={prevPage} disabled={currentPage === 1}>&lt;</PagingArBtn>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (page) => (
                            <PagingBtn
                                key={page}
                                onClick={() => handlePageChange(page)}
                                disabled={currentPage === page}
                                currentPage={currentPage}
                                page={page}
                            >
                                {page}
                            </PagingBtn>
                    ))}
                    <PagingArBtn onClick={nextPage} disabled={currentPage === totalPages}>&gt;</PagingArBtn>
                </PagingDiv>
            </FooterDiv>
        </Div>
    );
}
export default DeliveryAdrExist;
const FooterDiv = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
`
const BasicDiv = styled.div`
    margin-bottom: 20px;
`
const BasicBtn = styled.button`
    font-size:1.2rem;
    font-weight: bold;
    padding: 20px;
    background-color: #bae3ff;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin: 5px; /* 버튼 간의 간격 조정 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 설정 */
    transition: all 0.3s ease; /* 변화에 애니메이션 효과 추가 */
    &:hover {
        transform: translateY(-2px); /* 호버 시 버튼이 약간 위로 이동하여 입체감 표현 */
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 크게 설정 */
    }
    
`

const PagingDiv = styled.div`
`
const PagingBtn = styled.button`
    cursor: pointer;
    width:30px;
    height:30px;
    border: none;
    border-radius: 30%;
    ${({ currentPage, page }) => currentPage === page && `
    background-color: #ffeded;
    color: #555555;
    `}
    margin:1px;
    &:hover {
        transform: translateY(-2px); /* 호버 시 버튼이 약간 위로 이동하여 입체감 표현 */
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 크게 설정 */
    }
`
const PagingArBtn = styled.button`
    width:30px;
    height:30px;
    border: none;
    cursor: pointer;
    border-radius: 30%;
    /* disabled 상태일 때 hover 스타일 변경 */
    &:not(:disabled):hover {
        transform: translateY(-2px);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    }
`
