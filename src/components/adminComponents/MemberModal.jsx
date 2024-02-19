import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const MemberModal = ({open, handleClose, SelectedMember})=>{

    const handleConfirm = () => {
        handleClose();
    };

    const handleMemberDelete = async ()=>{
        const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');
        const memberNum = SelectedMember.memberNum;
        if (shouldDelete) {
            try {
                await axios.delete(`admin/member/delete/${memberNum}`);
                alert('삭제 완료');
            } catch (error) {
                console.error('사용자 삭제 중 오류가 발생했습니다:', error);
            }
        } else {
            console.log('사용자가 삭제를 취소했습니다.');
        }
    }

    return(
        <Modal open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <H3>회원 정보</H3>
                    <Button onClick={handleConfirm}>닫기</Button>
                    <Button onClick={handleMemberDelete}>회원 탈퇴</Button>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {SelectedMember && (
                    <table>
                        <Tr>
                            <Td>회원 번호</Td> 
                            <Td>{SelectedMember.memberNum}</Td>
                        </Tr>
                        <Tr>
                            <Td>회원 이름</Td> 
                            <Td>{SelectedMember.memberName}</Td>
                        </Tr>
                        <Tr>
                            <Td>회원 아이디</Td> 
                            <Td>{SelectedMember.username ? SelectedMember.username : `${SelectedMember.socialType} 회원입니다`}</Td>
                        </Tr>
                        <Tr>
                            <Td>회원 이메일</Td>
                            <Td>{SelectedMember.socialType? `${SelectedMember.socialType} 회원입니다`: SelectedMember.email}</Td>
                        </Tr>
                        <Tr>
                            <Td>전화번호</Td>
                            <Td>{SelectedMember.phoneNum}</Td>
                        </Tr>
                    </table>
                )}
                </Typography>
            </Box>
        </Modal>
    )
}

export default MemberModal;

const H3 = styled.h3`
    display: inline-block;
    margin-right: 10px;
`

const Td = styled.td`
    padding-left: 20px;
`

const Tr = styled.tr`
`

const Button = styled.button`
    margin-top: 5px;
    margin-left: 5px;
    float: right;
    padding: 5px 8px;
    background-color: pink;
    color: white;
    border:none;
    cursor: pointer;
`

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #333',
    boxShadow: 24,
    p: 4,
  };