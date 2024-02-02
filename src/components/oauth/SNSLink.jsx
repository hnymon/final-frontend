import React from 'react';
import styled from "styled-components";

const LinkLogo = styled.div`
  display: flex;
  img{
    width : 50px;
    margin-right: 10px;
  }
`;
const SNSLink = ({ img, onClick }) => {
  return (
    <LinkLogo>
      <img src={img} alt="SNS Logo" onClick={onClick} style={{ cursor: 'pointer' }} />
    </LinkLogo>
  );
};

export default SNSLink;