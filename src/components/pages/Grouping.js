import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import category from "../../assets/images/category.jpg"
import Footer from "../genrealComponent/Footer";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import MainGroupList from "./MainGroupList"
export default function Grouping() {
    const [mainGroups,setMainGroups]=useState(0)
    useEffect(()=>{
        fetch("http://192.168.10.27:8080/api/getMainGroups")
        .then(response=>response.json())
        .then((groups) => {
            setMainGroups(groups.map((element)=><MainGroupList title={element.title} id={element.id} ></MainGroupList>))
        })
    },[])

    if(localStorage.getItem("isLogedIn")){
        return (
            <>
                <Header />
                <Sidebar />
                <div className="container grouping">
                    <ul className="groupingPart">
                        {mainGroups}
                    </ul >
                </div >
                <Footer />
            </>
        )
    }else{
        window.location.href="/login"
    }

}