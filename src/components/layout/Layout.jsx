import React, { createContext, useState } from 'react';
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LayoutDiv = styled.div`
    padding-top:80px; /* Header의 높이(80px) + SearchBar의 높이(40px) */
    padding-bottom:100px; /* Header의 높이(80px) + SearchBar의 높이(40px) */
`


export const CartCountContext = createContext();
const Layout = (props) => {
    const [cartCount, setCartCount] = useState(0);

    return (
        <CartCountContext.Provider value={{ cartCount, setCartCount }}>
        <LayoutDiv>
            <Header />
            <main>
                {props.children}
                <Outlet />
            </main>
        </LayoutDiv>
        </CartCountContext.Provider>
    );
}

export default Layout;
