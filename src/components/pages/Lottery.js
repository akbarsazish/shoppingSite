import React from "react";
import Instruction from "../lottery/Instruction";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import DailyEmtyaz from "../lottery/DailyEmtyaz";
import LuckyCode from "../lottery/LuckyCode";


export default function Lottery() {
  return (
    <>
    <Header />
    <Sidebar />
     <div className="container marginTop">
        <Instruction />
        <LuckyCode />
        <DailyEmtyaz />
    </div>
    <Footer />
    </>
  )
}