import { useState } from "react";
import styled from "styled-components";
import DeliveryAdr from "../mypageComponents/DeliveryAdr";
import EditMemberInfo from "../mypageComponents/EditMemberInfo";
import MembershipInfo from "../mypageComponents/MembershipInfo";

const MainDiv = styled.div`
    height:100vh;
`

const HeaderDiv = styled.div`
    width: 80%;
    display:flex;
    margin: 20px auto;
`;

const SelectDiv = styled.div`
    width: 33%;
    padding: 10px;
    font-size:30px;
    background-color: red;
    text-align:center;
    background-color: ${({ selected }) => (selected ? "pink" : "#dddddd")};
    color: ${({ selected }) => (selected ? "white" : "#666666")};
    &:first-child{
        border-radius: 10px 0 0 10px;
    }
    &:last-child{
        border-radius: 0 10px 10px 0;
    }
    cursor: pointer;
`;

const InnerDiv = styled.div`
    width: 80%;
    margin: 20px auto;
`;


const Mypage = () => {
    const [selectedTab, setSelectedTab] = useState(1);

    const handleTabClick = (tabIndex) => {
        setSelectedTab(tabIndex);
    };
    const [flag, setFlag] = useState(false);
    
    return(
        <MainDiv>
            <HeaderDiv>
                <SelectDiv
                    selected={selectedTab === 1}
                    onClick={() => handleTabClick(1)}
                >회원정보 수정</SelectDiv>
                <SelectDiv
                    selected={selectedTab === 2}
                    onClick={() => handleTabClick(2)}
                >배송주소록</SelectDiv>
                <SelectDiv
                    selected={selectedTab === 3}
                    onClick={() => handleTabClick(3)}
                >나의 회원등급 혜택</SelectDiv>
            </HeaderDiv>
            <InnerDiv>
                {selectedTab === 1 && <EditMemberInfo flag={flag} setFlag={setFlag} />}
                {selectedTab === 2 && <DeliveryAdr />}
                {selectedTab === 3 && <MembershipInfo />}
            </InnerDiv>
        </MainDiv>
    )
}

export default Mypage;