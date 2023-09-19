import React from "react";
import Home from "../pages/Home";
import Footer from "./Footer";
import Sidebar from './Header'
import Header from './Sidebar';
import ChatGroup from "./ChatGroup";


const Layout = () => {
    if(localStorage.getItem("isLogedIn")){
        return (
         <>
             <Header/>
             <Home/>
             <Sidebar/>
             <Footer/>
             <ChatGroup />
         </>
        )
    }else{
        window.location.href = '/login'
    }
}

export default Layout