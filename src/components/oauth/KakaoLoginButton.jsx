import React from 'react';
import logo from '../../img/kakao_login_large_narrow.png';
import SNSLink from './SNSLink';

const KakaoLoginButton = () => {

  const url = `http://www.starbook.p-e.kr:8080/oauth2/authorization/kakao`;

  const loginKakao = () => {
    window.location.href = url;
  }

return <SNSLink img={logo} onClick={loginKakao} />
};

export default KakaoLoginButton;