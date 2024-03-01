import React from 'react';
import SNSLink from './SNSLink';
import logo from '../../img/btnG.png'

const NaverLoginButton = () => {

  const url = `http://www.starbook.p-e.kr:8080/oauth2/authorization/naver`;

  const loginNaver = () => {
    window.location.href = url;
  }

return <SNSLink img={logo} onClick={loginNaver} />
};

export default NaverLoginButton;