import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MainHeader = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #4caf50; // 수정: 헤더 배경 색상 변경
    color: white; // 수정: 글자 색상 변경
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 수정: 그림자 효과 추가
    z-index: 1000; // 수정: 다른 요소 위에 헤더를 배치

    h1 {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
        line-height: 80px;
        color: white; // 수정: 로고 글자 색상 변경
        text-decoration: none;
    }
`;

const Contents = styled.div`
    display: flex;
    width: 96%;
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
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
            color: white;
            font-weight: bold;

            &:hover {
                color: #ffee58;
            }
        }
    }
`;
const LogoutLink = styled.div`
    cursor: pointer;
    text-decoration: none;
    color: white;
    font-weight: bold;
    &:hover {
        color: #ffee58;
    }
`;
const Header = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // localStorage에서 토큰을 가져와 isLoggedIn 상태를 업데이트합니다.
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [location.pathname]); // 페이지 경로가 변경될 때마다 실행

    const handleLogout = () => {
        // 로그아웃 버튼을 클릭할 때 실행되는 함수
        // 로컬 스토리지에서 토큰을 삭제하고, isLoggedIn 상태를 업데이트합니다.
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <MainHeader>
            <Contents>
                <h1>
                    <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
                        로고 자리
                    </NavLink>
                </h1>
                <Navigation>
                    <ul>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <NavLink to="/mypage">마이페이지</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/cart">장바구니(0)</NavLink>
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
                            <NavLink to="/customer-service">고객센터</NavLink>
                        </li>
                    </ul>
                </Navigation>
            </Contents>
        </MainHeader>
    );
};

export default Header;
