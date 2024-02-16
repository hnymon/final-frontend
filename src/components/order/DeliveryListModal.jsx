import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const DeliveryListModal = ({open, handleClose, deliveryAddresses, setDeliveryInfo})=>{
    const [selectedAddress, setSelectedAddress] = useState(null);
    
    const handleCheckboxChange = (event, address) => {
        if (event.target.checked) {
            setSelectedAddress(address);
        } else {
            setSelectedAddress(null);
        }
    };

    const handleConfirm = () => {
        if (selectedAddress) {
            setDeliveryInfo(selectedAddress);
            handleClose();
        }
    };

    return(
        <Modal open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <H3>배송지 목록</H3>
                    <Button onClick={handleConfirm}>확인</Button>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div>
                    <ul>
                    {deliveryAddresses.map((address) => (
                        <li key={address.id}>
                            <Label>
                            <Input
                                        type="checkbox"
                                        checked={selectedAddress === address}
                                        onChange={(event) => handleCheckboxChange(event, address)}
                                    />
                            <div>{address.addrName}</div>
                            </Label>
                            <div>이름: {address.name}</div>
                            <div>전화번호: {address.phone}</div>
                            <div>우편번호: {address.zipcode}</div>
                            <div>주소: {address.address} {address.addrDetail}</div>
                            <br/>
                        </li>
                    ))}
                    </ul>
                </div>
                </Typography>
            </Box>
        </Modal>
    )
}

export default DeliveryListModal;

const H3 = styled.h3`
    display: inline-block;
    margin-right: 10px;
`

const Label = styled.label`
    display: inline-flex;
    align-items: center;
`;

const Input = styled.input`
    margin-right: 5px;

`

const Button = styled.button`
    margin-top: 5px;
    float: right;
    padding: 3px;
    
`

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };