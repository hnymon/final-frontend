import styled from "styled-components";
import InquiryList from "./InquiryList";
import OkInquiryList from "./OkInquiryList";
import UnInquiryList from "./UnInquiryList";
import { useState } from "react";

const MainDiv = styled.div`
    height:100vh;
`

const HeaderDiv = styled.div`
    width: 60%;
    display:flex;
    margin: -60px auto;
    margin-top: 50px;
`;
const SelectDiv = styled.div`
    width: 33%;
    padding: 10px;
    font-size:20px;
    letter-spacing: 10px;
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
const Inquiry = () => {
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
                >문의내역</SelectDiv>
                <SelectDiv
                    selected={selectedTab === 2}
                    onClick={() => handleTabClick(2)}
                >처리중</SelectDiv>
                <SelectDiv 
                    selected={selectedTab === 3}
                    onClick={() => handleTabClick(3)}
                >답변완료</SelectDiv>
            </HeaderDiv>
            <InnerDiv>
                {selectedTab === 1 && <InquiryList flag={flag} setFlag={setFlag} />}
                {selectedTab === 2 && <UnInquiryList />}
                {selectedTab === 3 && <OkInquiryList />}
            </InnerDiv>
        </MainDiv>
    );
}
 export default Inquiry;