import { useState } from "react";
import styled from "styled-components";
import AdminOrder from "../adminComponents/AdminOrder";
import InquiryAllList from "../board/InquiryAllList";
import AdminBoardList from "../board/AdminBoardList";

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

const AdminPage = () => {
    const [selectedTab, setSelectedTab] = useState(1);

    const handleTabClick = (tabIndex) => {
        setSelectedTab(tabIndex);
    };
    return(
        <MainDiv>
            <HeaderDiv>
                <SelectDiv
                    selected={selectedTab === 1}
                    onClick={() => handleTabClick(1)}
                >주문/환불</SelectDiv>
                <SelectDiv
                    selected={selectedTab === 2}
                    onClick={() => handleTabClick(2)}
                >공지</SelectDiv>
                <SelectDiv
                    selected={selectedTab === 3}
                    onClick={() => handleTabClick(3)}
                >문의</SelectDiv>
                <SelectDiv
                    selected={selectedTab === 4}
                    onClick={() => handleTabClick(4)}
                >회원</SelectDiv>
            </HeaderDiv>
            <InnerDiv>
                {selectedTab === 1 && <AdminOrder />}
                {selectedTab === 2 && <AdminBoardList/>}
                {selectedTab === 3 && <InquiryAllList/>}
                {selectedTab === 4 && "4번"}
            </InnerDiv>
        </MainDiv>
    )
}

export default AdminPage;