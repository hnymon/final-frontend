import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const InquiryModal = ({open, handleClose, Inquiry})=>{

    const handleConfirm = () => {
        handleClose();
    };

    const handleMemberDelete = async ()=>{
        const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');
        const inqueryId = Inquiry.inqueryId;

    }

    return(
        <Modal open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <H3>처리중인 문의</H3>
                    <Button onClick={handleConfirm}>확인</Button>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {Inquiry && Inquiry.map((item, index) => (
                item.inquiryStatus === "처리중" && (
                  <div key={index}>
                    <table>
                      <Tr>
                    
                        <Td><StyledLink to={`/board/InquiryDetail/${item.inquiryId}`}>{index+1}. [{item.inquiryType}] {item.inquirySubject}</StyledLink></Td>
                      </Tr>
                    </table>
                  </div>
                )
              ))}
                </Typography>
            </Box>
        </Modal>
    )
}

export default InquiryModal;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    color: black;
    text-decoration: none;
  }
`;

const H3 = styled.h3`
    display: inline-block;
    margin-right: 10px;
`

const Td = styled.td`
    display: inline-block;
    padding-left: 20px;
    width: 350px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;

    
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
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