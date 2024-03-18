import React from "react";
import Home from "../pages/Home";
import Footer from "./Footer";
import Sidebar from './Header'
import Header from './Sidebar';
import ChatGroup from "./ChatGroup";
import { Navigate } from "react-router-dom";


const Layout = () => {
    if(localStorage.getItem("isLogedIn")){
        return (
         <div className="container">
             <Header/>
             <Home/>
             <Sidebar/>
             <Footer/>
             <ChatGroup />
         </div>
        )
    }else{
        <Navigate to="/login"/>
    }
}

export default Layout