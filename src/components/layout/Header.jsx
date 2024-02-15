import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../img/Logo_n.png";
import SearchBar from "../SearchBar";
import { getAccessCookie, removeAccessCookie, removeRefreshCookie } from "../cookie/cookie";
import axios from "axios";
import GetTokenToHeader from "../../token/GetTokenToHeader";

const MainHeader = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #FFEDED; // 수정: 헤더 배경 색상 변경
    color: white; // 수정: 글자 색상 변경
    z-index: 1000; // 수정: 다른 요소 위에 헤더를 배치
`;

const Contents = styled.div`
    display: flex;
    width: 100%;
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
`;
const Logo = styled.div`
    img {
        width: 100px; // 이미지의 너비를 조절합니다.
        height: auto; // 높이는 자동으로 조절됩니다.
    }
    margin-right:30px;

    &:hover {
        cursor:pointer
    }

    @media screen and (max-width: 768px) {
        img {
            width: 80px; // 화면 크기가 768px 이하일 때 로고 크기를 줄입니다.
        }
        margin-left: -100px; // 화면 크기가 768px 이하일 때 로고 위치를 조정합니다.
    }
`;

const Navigation = styled.div`
    ul {
        display: flex;
        list-style: none;
        margin: 0;

        li + li {
            margin-left: 30px;
        }

        a {
            text-decoration: none;
            color: #A191A1;
            font-weight: bold;

            &:hover {
                color: #FF5573;
            }
        }

        li {
            font-size: 20px;
        }
    }
`;
const LogoutLink = styled.div`
    cursor: pointer;
    text-decoration: none;
    color: #A191A1;
    font-weight: bold;
    &:hover {
        color: #FF5573;
    }
`;

const NavigationWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`;

const Header = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        // localStorage에서 토큰을 가져와 isLoggedIn 상태를 업데이트합니다.
        const token = getAccessCookie();
        const headers = GetTokenToHeader();
        console.log('헤더', token);
        setIsLoggedIn(!!token);
        if(isLoggedIn){
            axios.get("/cart/count",headers)
                .then(response =>{
                    setCartItemCount(response.data);
                    console.log('장바구니 데이타', response.data);
                })
                .catch(error =>{
                    console.error('장바구니 아이템 개수 조회 오류:', error);
                });
        }
    }, [location.pathname, cartItemCount]); // 페이지 경로가 변경될 때마다 실행

    const handleLogout = () => {
        // 로그아웃 버튼을 클릭할 때 실행되는 함수
        // 로컬 스토리지에서 토큰을 삭제하고, isLoggedIn 상태를 업데이트합니다.
        removeAccessCookie();
        console.log('로그아웃', removeAccessCookie(), getAccessCookie());
        removeRefreshCookie();
        setIsLoggedIn(false);
        alert('로그아웃 되었습니다');
        toHome();
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Toggle the dropdown menu visibility
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    const toHome = () => {
        navigate("/")
    }
    return (
        <MainHeader>
            <Contents>
            <Logo><img src={logo} alt="" onClick={toHome}/></Logo>
            <SearchBar />
            <NavigationWrapper>
                <Navigation>
                    <ul>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <NavLink to="/mypage">마이페이지</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/cart">장바구니({cartItemCount})</NavLink>
                                </li>
                                <li>
                                    <LogoutLink onClick={handleLogout}>로그아웃</LogoutLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/signup">회원가입</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login">로그인</NavLink>
                                </li>
                            </>
                        )}
                        <li>
                            <NavLink to="/customer-service"onClick={()=>toggleDropdown("")}>고객센터</NavLink>
                            {isDropdownOpen && (
                            <div className="dropdown">
                             {/* You can include additional dropdown items or categories here */}
                                <NavLink to="/board/BoardList">게시판</NavLink><br></br>
                                <NavLink to="/board/Inquiry">문의</NavLink><br></br>
                                <NavLink to="/board/InquiryAllList">문의게시판</NavLink><br></br>
                            </div>
                            )}
                       </li>
                    </ul>
                    </Navigation>
                </NavigationWrapper>
            </Contents>
        </MainHeader>
    );
};

export default Header;
