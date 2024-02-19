import { Box, Divider, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const OrderModal = ({open, handleClose, order, formatDateTime, handleOrderApprovalChange})=>{
    const handleConfirm = () => {
        handleClose();
    };

    const approval = async (detailId, orderId) => {
      try {

          const response = await axios.post("/admin/approvalModal", {
            detailId : detailId,
            orderId : orderId
          })
          console.log(response.data)
          if(response.data=== "Success"){
            handleOrderApprovalChange();
          }
      } catch (error) {
          console.error(error);
      }
  }

  

    return(
        <Modal open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <H3>주문 정보</H3>
                    <Button onClick={handleConfirm}>닫기</Button>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {order && order.map((item, index) => (
                item.approval === "미승인" && (
                  <div key={index}>
                    <table>
                      <Tr>
                        <Span>주문번호</Span> {item.id} - <Span>승인상태 </Span>{item.approval} <span style={{marginLeft:'150px'}}><Span>주문날짜 </Span>{formatDateTime(item.createDate)}</span>
                      </Tr>
                    </table>
                    {item.orderdetail.map((detail, index) => (
                  <React.Fragment key={index}>
                    <table>
                  <Tr>
                    <Td>
                      <Img
                        src={detail.thumbnail ? detail.thumbnail : 'http://via.placeholder.com/55X80'}
                        alt=""
                      />
                    </Td>
                    <Td>
                      <div>
                        <Span>ISBN </Span> {detail.isbn} <Span style={{marginLeft:'15px'}}>수량 </Span> {detail.count}
                      </div>
                      <Div >
                        <Span>제목 </Span> {detail.title}
                      </Div>
                    </Td>
                    <Td>
                        <DetailApproval>{detail.detailApproval ? "승인됨": "대기상태"} </DetailApproval>
                        {detail.detailApproval ? 
                          <div>
                            <Button onClick={() => approval(detail.id, item.id)}>대기</Button>
                          </div>
                        : <div>
                            <Button onClick={() => approval(detail.id, item.id)}>승인</Button>
                          </div>
                        }
                    </Td>
                  </Tr>
                  </table>
                </React.Fragment>
                ))}
                <Divider sx={{ m: 0.5 }}/>
                  </div>
                )
              ))}
                </Typography>
            </Box>
        </Modal>
    )
}

export default OrderModal;

const Span = styled.span`
  font-weight: bold;
`

const Div = styled.div`
    display: inline-block;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
`

const Img = styled.img`
    width : 55px;
    height: 80px;
`

const H3 = styled.h3`
    display: inline-block;
    margin-right: 10px;
`

const Td = styled.td`
  padding: 8px;
`;

const DetailApproval = styled.div`
  float: right;
`

const Tr = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`;

const Button = styled.button`
    margin-top: 5px;
    margin-left: 100px;
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
    maxHeight: 700,
    overflow: 'scroll',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #333',
    boxShadow: 24,
    p: 4,
  };
