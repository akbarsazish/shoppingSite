import React from "react";
import Home from "../pages/Home";
import Footer from "./Footer";
import Sidebar from './Header'
import Header from './Sidebar';

function Layout() {
    return (
        <>
            <Header />
            <Home />
            <Sidebar />
            <Footer />
        </>
    )
}

export default Layout