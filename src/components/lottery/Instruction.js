import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft } from "@fortawesome/fontawesome-free"
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";

export default function Instruction() {
  return (
    <>
    <Header/>
    <Sidebar />
      <div className="container marginTop">
        <div className="instruction-container">
            <h5> شیوه‌ی کسب ستاره از هرکدام از این فعالیت‌ها به شرح زیر است </h5>
            <div className="instruction-item">
                <h6> جوایز بازیها </h6>
                <p className="instruction-description"> 
                <FontAwesomeIcon className="text-danger ms-2" icon={faSquareCaretLeft} />  ندارید! </p>
            </div>
        </div>
      </div>
    <Footer />
    </>
  )
}