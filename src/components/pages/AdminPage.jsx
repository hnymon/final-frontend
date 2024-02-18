import { useState } from "react";
import styled from "styled-components";
import AdminOrder from "../adminComponents/AdminOrder";
import InquiryAllList from "../board/InquiryAllList";
import AdminBoardList from "../board/AdminBoardList";
import MemberManagement from "../adminComponents/MemberManagement";
import { Divider } from "@mui/material";

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
    border-radius: 10px;
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

const AdminPage = () => {
    const [selectedTab, setSelectedTab] = useState(1);

    const handleTabClick = (tabIndex) => {
        setSelectedTab(tabIndex);
    };
    return(
        <MainDiv>
            <HeadLine>관리자 페이지</HeadLine>
            <Divider sx={{ m: 0.5 }}/>
            <HeaderDiv>
                <Div>
                <Menu>결제 관리</Menu>
                <SelectDiv
                    selected={selectedTab === 1}
                    onClick={() => handleTabClick(1)}
                >주문/환불</SelectDiv>
                <MenuS>공지 관리</MenuS>
                <SelectDiv
                    selected={selectedTab === 2}
                    onClick={() => handleTabClick(2)}
                >공지</SelectDiv>
                <MenuS>문의 관리</MenuS>
                <SelectDiv
                    selected={selectedTab === 3}
                    onClick={() => handleTabClick(3)}
                >문의</SelectDiv>
                <MenuS>회원 관리</MenuS>
                <SelectDiv
                    selected={selectedTab === 4}
                    onClick={() => handleTabClick(4)}
                >회원</SelectDiv>
                </Div>
            <InnerDiv>
                {selectedTab === 1 && <AdminOrder />}
                {selectedTab === 2 && <AdminBoardList/>}
                {selectedTab === 3 && <InquiryAllList/>}
                {selectedTab === 4 && <MemberManagement/>}
            </InnerDiv>
            </HeaderDiv>
        </MainDiv>
    )
}

export default AdminPage;