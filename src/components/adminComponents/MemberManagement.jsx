import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import GetTokenToHeader from "../../token/GetTokenToHeader";
import MemberModal from "./MemberModal";
import InquiryModal from "./InquiryModal";
import OrderModal from "./OrderModal";


const MemberManagement = () =>{
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [isOrderOpen, setIsOrderOpen] = useState(false)
    const [isInquiryOpen, setIsInquiryOpen] = useState(false)
    const [SelectedMember, setSelectedMember] = useState();
    const [memberInquiry, setmemberInquiry] = useState();
    const [memberOrder, setMemberOrder] = useState();
     const [orderApprovalChanged, setOrderApprovalChanged] = useState(false);

    const handleOpen = (member) => {
        setOpen(true);
        setSelectedMember(member);
        console.log(member);
    }
    const handleClose = () => {
        setOpen(false);
        setSelectedMember(null);
    }

    const orderOpen = (order)=>{
        setIsOrderOpen(true);
        setMemberOrder(order);
        console.log('order', order);
    }

    const orderClose = ()=>{
        setIsOrderOpen(false);
        setMemberOrder(null);
    }

    const inquiryOpen = (Inquiry)=>{
        console.log('Inquiry', Inquiry);
        setIsInquiryOpen(true);
        setmemberInquiry(Inquiry);
    }

    const inquiryClose = ()=>{
        setIsInquiryOpen(false);
        setmemberInquiry(null);
    }

    const handleOrderApprovalChange = () => {
        // 주문 승인 상태가 변경되었음을 알림
        setOrderApprovalChanged(prevState => !prevState);
    };

    const fetchOrders = async (page) => {
        try {
            const response = await axios.get(`/admin/memberManagement?page=${page}`, {
                params: {
                    term: searchTerm
                }
            });

            console.log(response.data);
            console.log(response.data.content)
            setMembers(response.data.content);

            const newMemberOrders = response.data.content.map(member => member.order).flat();
            setMemberOrder(newMemberOrders);
        } catch (error) {
            console.error('회원 목록을 불러오는 중 에러 발생:', error);
        }
    };

    function formatDateTime(dateTimeStr) {
        if(dateTimeStr){
            const [datePart, timePart] = dateTimeStr.split('T');
            return `${datePart}`;
        }
    }

    const countUnapprovedOrders = (orders) => {
        return orders.filter(order => order.approval === '미승인').length;
    };

    const countUnapprovedInquerys = (Inquirys) =>{
        return Inquirys.filter(Inquiry => Inquiry.inquiryStatus === '처리중').length;
    }

    const handleSearch = () => {
        setCurrentPage(0); // 검색을 수행할 때 첫 페이지로 이동
        fetchOrders(0);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(searchTerm);
    };

    useEffect(() => {
        fetchOrders(currentPage);
      }, [currentPage, orderApprovalChanged]);

      const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
      };
    
      const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
      };
    
      const handlePageClick = (page) => {
        setCurrentPage(page);
      };

    return(
        <Wrapper>
            <MemberModal
            open = {open}
            handleClose = {handleClose}
            SelectedMember = {SelectedMember}
            />
            <OrderModal
            open = {isOrderOpen}
            handleClose = {orderClose}
            order={memberOrder}
            formatDateTime={formatDateTime}
            handleOrderApprovalChange = {handleOrderApprovalChange}
            />
            <InquiryModal
            open = {isInquiryOpen}
            handleClose = {inquiryClose}
            Inquiry={memberInquiry}
            />
            <Title>회원 목록</Title>
            <SearchBar>
            <SearchInput
                type="text"
                placeholder="회원 번호로 검색"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <SearchButton onClick={() => handleSearch()}>검색</SearchButton>
            </SearchBar>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>회원번호</TableHeader>
                        <TableHeader>이름</TableHeader>
                        <TableHeader>주문 상태</TableHeader>
                        <TableHeader>문의 상태</TableHeader>
                        <TableHeader>가입일</TableHeader>
                    </tr>
                </thead>
                        <React.Fragment>
                        {members.length > 0 && members.map((member, index) => (
                        <TableRow key={index}>
                            <TableCell><ModalLink onClick={() => handleOpen(member)}>{member.memberNum}</ModalLink></TableCell>
                            <TableCell><ModalLink onClick={() => handleOpen(member)}>
                                {member.memberName ? member.memberName : `소셜 회원 ${member.memberNum}`}</ModalLink>
                                </TableCell>
                            <TableCell>
                                <ModalLink onClick={() => orderOpen(member.order)}>
                                    미승인: {countUnapprovedOrders(member.order)} 건
                                </ModalLink>
                                </TableCell>
                            <TableCell>
                                <ModalLink onClick={() => inquiryOpen(member.inquery)}>
                                처리중: {countUnapprovedInquerys(member.inquery)} 건
                                </ModalLink>
                                </TableCell>
                            <TableCell>{formatDateTime(member.createDate)}</TableCell>
                        </TableRow>
                    ))}
                        
                        </React.Fragment>
            </Table>
            <PaginationContainer>
        <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 0}>이전</PaginationButton>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationButton key={index} onClick={() => handlePageClick(index)}>
            {index + 1}
          </PaginationButton>
        ))}
        <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>다음</PaginationButton>
      </PaginationContainer>
      <PaginationContainer>
      </PaginationContainer>
        </Wrapper>
        
    );
}

export default MemberManagement;

const ModalLink = styled.span`
cursor: pointer;

&:hover {
    text-decoration: underline;
    color: darkblue;
  }
`;

const Title = styled.div`
    float: left;
    text-align: left; /* 추가: 텍스트 왼쪽 정렬 */
    font-weight: bold;
    color: #333333;
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 30px;
`

const SearchBar = styled.div`
    float: right;
    margin: 10px 30px 10px 0;
`

const SearchInput = styled.input`
    padding: 5px;
`;

const SearchButton = styled.button`
    float: right;
    margin-left: 5px;
    padding: 5px 10px;
    border: none;
    background-color: pink;
    color: #fff;
    cursor: pointer;
`;


const Wrapper = styled.div`
    width: 100%;
    background-color:white;
`;

const Table = styled.table`
    width: 93%;
    margin: 20px auto;
    border-collapse: collapse;
`;
const TableRow = styled.tr`
    border-bottom: 1px solid #DDDDDD;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
`;
const TableHeader = styled.th`
    border-bottom: 3px solid pink;
    border-top: 3px solid pink;
    padding: 8px;
`;

const TableCell = styled.td`
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    
`;

const TitleText = styled.div`

    display: inline-block;
        width: 350px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;

    
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    // background-color: #FFC0CB;
`;

const PaginationButton = styled.button`
    margin: 0 5px; /* 수정된 부분: 좌우 마진 추가 */
    padding: 5px 10px;
    border: 1px solid #ffffff;
    cursor: pointer;
    color: #ffffff;
    background-color: #FFC0CB;

    // &:disabled {
    //     opacity: 0.5;
    //     cursor: not-allowed;
    // }
`;
