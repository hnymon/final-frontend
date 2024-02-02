import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../SearchBar';

const LayoutDiv = styled.div`
    padding-top:80px; /* Header의 높이(80px) + SearchBar의 높이(40px) */
    padding-bottom:100px; /* Header의 높이(80px) + SearchBar의 높이(40px) */
`

const SearchBarWrapper = styled.div`
    margin-top: 10px; 
    margin-left: 20px; 
    margin-bottom:10px;
`;
const Layout = (props) => {
    return (
        <LayoutDiv>
            <Header />
            <main>
                <SearchBarWrapper>
                    <SearchBar />
                </SearchBarWrapper>
                {props.children}
                <Outlet />
            </main>
            <Footer />
        </LayoutDiv>
    );
}

export default Layout;
