import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`

`

const HeaderDiv = styled.div`
`;

const MySpan = styled.span`
`;

const MemberShipInfo = styled.div`

`
const ImgDiv = styled.div`

`;
const TextDiv = styled.div`
`
const NameSpan = styled.span`
`
const BasicSpan = styled.span`
`
const MemberShipRankSpan = styled.span`
`
const DetailDiv = styled.div`
`
const DetailDiv2 = styled.div`
`

const BoldSpan = styled.span`
`
const BasicSpan2 = styled.span`
`
const UnderDiv = styled.div`

`;
const PeriodSpan = styled.span`
`
const RankDiv = styled.div`
`

const MembershipInfo = () => {
    const [memberInfo, setMemberInfo] = useState({});
    console.log(memberInfo)
    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post("/getMemberInfo", null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.result === "Success") {
                    setMemberInfo(response.data.currentMember);
                    
                }
            } catch (error) {
                console.error("Error fetching member info:", error);
            }
        };
        fetchMemberInfo();
    }, []);
   
    return(
        <Wrapper>
            <HeaderDiv>
                <MySpan>나의 회원등급 혜택</MySpan>
            </HeaderDiv>
            <MemberShipInfo>
                <ImgDiv>
                </ImgDiv>
                {memberInfo.memberName ? 
                    <TextDiv>
                        <NameSpan>{memberInfo.memberName} </NameSpan>
                        <BasicSpan> 회원님의 이번 달 등급은 </BasicSpan>
                        <MemberShipRankSpan>등급</MemberShipRankSpan>
                        <BasicSpan> 등급입니다.</BasicSpan>
                    </TextDiv>
                : 
                    <TextDiv>
                        <NameSpan>{memberInfo.socialType}</NameSpan>
                        <BasicSpan> 로그인 회원입니다. 이번 달 등급은 </BasicSpan>
                        <MemberShipRankSpan>등급</MemberShipRankSpan>
                        <BasicSpan> 등급입니다.</BasicSpan>
                    </TextDiv>}
                <DetailDiv>
                    <DetailDiv2>
                        <BoldSpan></BoldSpan><BasicSpan2></BasicSpan2>
                    </DetailDiv2>
                    <DetailDiv2>
                        <BoldSpan></BoldSpan><BasicSpan2></BasicSpan2>
                    </DetailDiv2>
                    <DetailDiv2>
                        <BoldSpan></BoldSpan><BasicSpan2></BasicSpan2>
                    </DetailDiv2>
                </DetailDiv>
            </MemberShipInfo>
            <UnderDiv>
                <PeriodSpan>period</PeriodSpan>
            </UnderDiv>
            <RankDiv>

            </RankDiv>
        </Wrapper>
    );
}
export default MembershipInfo;