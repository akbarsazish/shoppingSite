import React from "react";
import Header from "../genrealComponent/Header";
import starfood from "../../assets/images/starfood.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";

export default function Contact() {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop">
                <div className="contact">
                    <div className="contactRight">
                        <img src={starfood} className="contactImg" alt="contact" />
                    </div>
                    <div className="contactLeft">
                        <div className="description">
                            <h1 style={{ fontSize: "26px" }}>استار فود </h1>
                            <p style={{ fontSize: "20px" }}> زنجیره تامین هوشمند <br /> اقلام شاخص رستوران و فست فود </p>
                        </div> <br />

                        <div className="contactList">
                            <Link className="contactItem" to="tel://02148286"> <FontAwesomeIcon className="contactIcon" icon={faPhone} />  <span className="fw-bold">ارتباط :</span>  48286-021 </Link >
                        </div>
                        <div className="contactList">
                            <Link className="contactItem" to="tel://02149973000"> <FontAwesomeIcon className="contactIcon" icon={faUser} /> <span className="fw-bold">پشتیبان :</span>     49973000-021 </Link >
                        </div>
                        <div className="contactList">
                            <FontAwesomeIcon className="contactIcon" icon={faLocationPin} /> <span className="contactItem"> تهران، خیابان مولوی،پلاک 875 </span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}