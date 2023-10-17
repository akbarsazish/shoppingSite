import { faHandshake, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Footer from "../genrealComponent/Footer";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import profile from "../../assets/images/profile.png"
import boy from "../../assets/images/boy.png"
import axios from "axios";
export default function Message() {
    const[messages,setMessages]=useState([]);
    const[newMessage,setNewMessage]=useState("");

    const addNewMessage=()=>{
        setNewMessage(newMessage);
        setMessages([])
        document.getElementById("messageTextArea").value="";
        axios.get("https://starfoods.ir/api/doAddMessage",{params:{
            pmContent:newMessage,
            psn:localStorage.getItem("psn")
        }}).then((data)=>{
            axios.get("https://starfoods.ir/api/messageList",{params:{psn:localStorage.getItem("psn")}}
            ).then((data)=>{
                setMessages(data.data.messages)
            }
        )}
      )
    }

    useEffect(()=>{
        axios.get("https://starfoods.ir/api/messageList",{
            params:{psn:localStorage.getItem("psn")}}
          ).then((data)=>{
            setMessages(data.data.messages)
         })
    },[]);

    if(localStorage.getItem("isLogedIn")){
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
                       {messages.map((message, index)=> 
                         <>
                            <span className="messageContentSender" key={index}>
                                <img className="profilePic" alt="عکس یوزر" src={boy} />
                                <span className="messageText"> <span className="messageDate">
                                     {new Date(message.messageDate).toLocaleString('fa-IR')}
                                </span> {message.messageContent} </span>
                            </span>
                            {message.replay.map((replay, index)=>
                                <span className="messageContentRecevier" key={index}>
                                    <img className="profilePic" alt="عکس یوزر" src={profile} />
                                    <span className="messageText"> <span className="messageDate">
                                        {new Date(replay.replayDate).toLocaleString('fa-IR')}
                                        </span> {replay.replayContent} </span>
                                </span>
                              )}
                            </>   
                          )}
                        </div>
                    </div> 
                    <div className="messageFooter">
                        <div className="mb-3">
                            <textarea className="form-control h-25" id="messageTextArea" onKeyUp={(event)=>setNewMessage(event.target.value)} rows="3" placeholder="متن پیام خود را بنویسید!"></textarea>
                        </div>
                        <button className="btn btn-sm btn-primary" onClick={()=>addNewMessage()}> ارسال پیام <FontAwesomeIcon icon={faMessage} /> </button>
                    </div>
                </div>
                <Footer />
            </>
        )
    }else{
        window.location.href="/login"
    }
}