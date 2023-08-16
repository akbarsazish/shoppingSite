import React from "react";
import Home from "../pages/Home";
import Footer from "./Footer";
import Sidebar from './Header'
import Header from './Sidebar';

const Layout = () => {

    if(localStorage.getItem("isLogedIn")){
        return (
            <>
                <Header/>
                <Home/>
                <Sidebar/>
                <Footer/>
            </>
        )
    }else{
        window.location.href = '/login'
    }
}

export default Layout