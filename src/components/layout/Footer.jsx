import styled from "styled-components";

const MainFooter = styled.footer`
  height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #dde0ea;
`;

const Contents = styled.div`
  display: flex;
  width: 96%;
  max-width: 1100px;
  height: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 20px;
`;

const Footer = () => {
  return (
    <MainFooter>
      <Contents>
        <Title>footer</Title>
      </Contents>
    </MainFooter>
  );
};

export default Footer;
