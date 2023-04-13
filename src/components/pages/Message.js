import { faHandshake, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Footer from "../genrealComponent/Footer";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import profile from "../../assets/images/profile.png"
import boy from "../../assets/images/boy.png"
export default function Message() {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop">
                <div className="messageHeader text-center mt-2">
                    <h6 className="messageTitle">
                        با پیام ها خود ما را در ارائه بهتر خدمات یاری رسانید <FontAwesomeIcon style={{ color: "red", fontSize: "22px" }} icon={faHandshake} />
                    </h6>
                </div>
                <div className="messageBody">
                    <div className="messageContent">
                        <span className="messageContentSender">
                            <img className="profilePic" alt="عکس یوزر" src={boy} />
                            <span className="messageText"> <span className="messageDate"> 1402/01/16 12:05:33 </span>  سلام وقت شما بخیر ! سلام به قاصدک های خبر رسان که محکوم به خبرند </span>
                        </span>
                        <span className="messageContentRecevier">
                            <img className="profilePic" alt="عکس یوزر" src={profile} />
                            <span className="messageText"> <span className="messageDate"> 1402/01/16 12:05:33 </span>  سلام به قاصدک های خبر رسان که محکوم به خبرند! ع سلام وقت شما بخیر  </span>
                        </span>
                    </div>
                </div>
                <div className="messageFooter">
                    <div class="mb-3">
                        <textarea class="form-control h-25" id="exampleFormControlTextarea1" rows="3" placeholder="متن پیام خود را بنویسید!"></textarea>
                    </div>
                    <button className="btn btn-sm btn-primary"> ارسال پیام <FontAwesomeIcon icon={faMessage} /> </button>
                </div>
            </div>

            <Footer />

        </>
    )
}