import React, { useEffect } from "react";
import Home from "../pages/Home";
import Footer from "./Footer";
import Sidebar from './Header'
import Header from './Sidebar';
import axios from "axios";

const Layout = () => {
    // useEffect(()=>{
    //     axios.get("http://192.168.10.27:8080/api/checkLogin",{params:{psn:localStorage.getItem("psn")}}).then((data)=>{
    //         alert(data.data.isLogin)
    //         if(data.data.isLogin=="NO"){
    //             localStorage.removeItem("isLogedIn")
    //         }
    //     })
    // },[])

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