import styled from "styled-components";
import { NavLink } from "react-router-dom";

const MainHeader = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #dde0ea;
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

        li + li {
            margin-left: 30px;
        }

        a {
            text-decoration: none;
            color: #333;
            font-weight: bold;

            &:hover {
                color: #4caf50; // 링크에 마우스를 올렸을 때의 색상
            }
        }
    }
`;

const Header = () => {
    return (
        <MainHeader>
            <Contents>
                <div>
                    로고 자리
                </div>
                <Navigation>
                    <ul>
                        <li>
                            <NavLink to="/signup">회원가입</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">로그인</NavLink>
                        </li>
                        <li>
                            <NavLink to="/mypage">마이페이지</NavLink>
                        </li>
                        <li>
                            {/* 장바구니에 넣어 논 리스트 수 출력 */}
                            <NavLink to="/cart">장바구니(0)</NavLink>
                        </li>
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
