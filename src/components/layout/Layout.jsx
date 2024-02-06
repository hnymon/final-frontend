import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LayoutDiv = styled.div`
    padding-top:80px; /* Header의 높이(80px) + SearchBar의 높이(40px) */
    padding-bottom:100px; /* Header의 높이(80px) + SearchBar의 높이(40px) */
`


const Layout = (props) => {
    return (
        <LayoutDiv>
            <Header />
            <main>
                {props.children}
                <Outlet />
            </main>
            <Footer />
        </LayoutDiv>
    );
}

export default Layout;
