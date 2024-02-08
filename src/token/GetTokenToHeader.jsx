
const GetTokenToHeader = () =>{

    const accessToken = getAccessToken();
    console.log(accessToken);

    return {
      headers:{
        Authorization: `Bearer ${accessToken}`,
      },
    };
}

const getAccessToken = () =>{
  return localStorage.getItem('token');
}

export default GetTokenToHeader;