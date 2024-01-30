import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../SearchBar';

const LayoutDiv = styled.div`
    padding-top: 80px;
`

const Layout = (props) => {
    return (
        <LayoutDiv>
            <Header />
            <main>
                <SearchBar/>
                {props.children}
                <Outlet />
            </main>
            <Footer />
        </LayoutDiv>
    );
}

export default Layout;
