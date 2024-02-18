import { useEffect, useState } from "react";
import styled from "styled-components";
import DeliveryAdr from "../mypageComponents/DeliveryAdr";
import EditMemberInfo from "../mypageComponents/EditMemberInfo";
import MembershipInfo from "../mypageComponents/MembershipInfo";
import OrderList from "../mypageComponents/OrderList";
import { Divider } from "@mui/material";
import { useLocation } from "react-router-dom";

const MainDiv = styled.div`
    height:100vh;
`
    
const HeaderDiv = styled.div`
    display: flex;
    margin-bottom: 20px;
`

const Div = styled.div`
    flex-direction: column;
    margin : 30px 30px 0 30px;
`

const SelectDiv = styled.div`
    font-weight: bold;
    width: 200px;
    padding: 10px;
    font-size:15px;
    text-align:center;
    background-color: ${({ selected }) => (selected ? "pink" : "#dddddd")};
    color: ${({ selected }) => (selected ? "white" : "#666666")};

    &:nth-child(2){
        border-radius: 10px 10px 0px 0px;
    }
    &:nth-child(3){
        border-radius: 0px 0px 10px 10px;
    }

    &:last-child{
        border-radius: 10px 10px 10px 10px;
    }
    cursor: pointer;
`;

const InnerDiv = styled.div`
    width: 80%;
    margin: 20px auto;
`;

const HeadLine = styled.h1`
    color: #525252;
    margin : 30px 0 20px 30px;
`

const Menu = styled.div`
    font-weight: bold;
    font-size: 20px;
    margin: 10px 0 10px 3px;

`

const MenuS = styled.div`
    font-weight: bold;
    font-size: 20px;
    margin: 30px 0 10px 3px;

`


const Mypage = () => {
    const [selectedTab, setSelectedTab] = useState(1);
    const location = useLocation();
    const handleTabClick = (tabIndex) => {
        setSelectedTab(tabIndex);
    };
    const [flag, setFlag] = useState(false);

    useEffect(()=>{
        if(location.state){
            console.log(location.state);
            setSelectedTab(location.state);
        }
    },[]);
    
    return(
        <MainDiv>
        <HeadLine>마이페이지</HeadLine>
        <Divider sx={{ m: 0.5 }}/>
            <HeaderDiv>
                <Div>
                    <Menu>개인 정보</Menu>
                <SelectDiv
                    selected={selectedTab === 1}
                    onClick={() => handleTabClick(1)}
                >회원정보 수정</SelectDiv>
                <SelectDiv
                    selected={selectedTab === 2}
                    onClick={() => handleTabClick(2)}
                >배송주소록</SelectDiv>
                <MenuS>결제 확인</MenuS>
                <SelectDiv
                    selected={selectedTab === 3}
                    onClick={() => handleTabClick(3)}
                >주문 내역</SelectDiv>
                </Div>
            <InnerDiv>
                {selectedTab === 1 && <EditMemberInfo flag={flag} setFlag={setFlag} />}
                {selectedTab === 2 && <DeliveryAdr />}
                {selectedTab === 3 && <OrderList />}
            </InnerDiv>
            </HeaderDiv>
        </MainDiv>
    )
}

export default Mypage;