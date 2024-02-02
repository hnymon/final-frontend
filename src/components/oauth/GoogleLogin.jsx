import React from 'react';
import SNSLink from './SNSLink';
import logo from '../../img/web_light_rd_na.png'

const GoogleLoginButton = () => {

  const url = `http://localhost:8080/oauth2/authorization/google`;

  const loginGoogle = () => {
    window.location.href = url;
  }

return <SNSLink img={logo} onClick={loginGoogle} />
};

export default GoogleLoginButton;