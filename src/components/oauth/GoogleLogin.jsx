import React from 'react';
import SNSLink from './SNSLink';
import logo from '../../img/web_light_rd_na.png'

const GoogleLoginButton = () => {

  const url = `http://www.starbook.p-e.kr:8080/oauth2/authorization/kakao`;


  const loginGoogle = () => {
    window.location.href = url;
  }

return <SNSLink img={logo} onClick={loginGoogle} />
};

export default GoogleLoginButton;