import React from "react";
import Home from "../pages/Home";
import Footer from "./Footer";
import Sidebar from './Header'
import Header from './Sidebar';
import { Outlet } from "react-router-dom";

const Layout = () => {
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