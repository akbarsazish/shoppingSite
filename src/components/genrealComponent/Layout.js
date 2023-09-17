import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from "../pages/Home";
import Footer from "./Footer";
import Sidebar from './Header'
import Header from './Sidebar';
import { faEnvelope, faReply, faX } from "@fortawesome/free-solid-svg-icons";
import profile from "../../assets/images/profile.png";
import userAvatar from "../../assets/images/siteImage/userAvatar.png";

const Layout = () => {
    const [liveChat, setLiveChat] = useState(false);
    const [redPlyDiv, setReplyDiv] = useState(false);

    const showToggleChat = () => {
        setLiveChat(true)
    }

    const hideToggleChat = () => {
        setLiveChat(false)
    }

    const showReplyDiv = () => {
        setReplyDiv(true)
    }
    const hideReplyDiv = () => {
        setReplyDiv(false)
    }

    if(localStorage.getItem("isLogedIn")){
        return (
         <>
             <Header/>
             <Home/>
             <Sidebar/>
             <Footer/>
            {liveChat ?
             <div className="live-chat">
               <div className="live-chat-content">
                    <div className="chat-header">
                        <FontAwesomeIcon onClick={()=> hideToggleChat()} className="chat-close" icon={faX} />
                    </div>
                    <div className="chat-body">
                        <div className="message">
                            <p className="customer-name"> ❤️ خانم سایه ❤️</p>
                            <span className="customer-message"> 
                            <img className="customer-img" src={profile} /> سلام من یکی از مشتریان استار فود هستم، می خواهم در مورد تجربه شما از  استارفود بشنوم
                            </span>
                        </div>
                        <div className="reply-part">
                            <FontAwesomeIcon onClick={()=>showReplyDiv()} id="replyIcon" icon={faReply} />
                            <p className="reply-label"> پاسخ </p>
                        </div>
                        <div className="message">
                            <p className="customer-name"> ❤️ محمد توکلی ❤️</p>
                            <span className="customer-message"> 
                              <img className="customer-img" src={userAvatar} /> استارفود خدمات خوبی دارد، من  راضی هستم  
                            </span> 
                        </div>
                        <div className="reply-part">
                            <FontAwesomeIcon onClick={()=> showReplyDiv()}  id="replyIcon" icon={faReply} />
                            <p className="reply-label"> پاسخ </p>
                        </div>
                    </div>

                { redPlyDiv ?
                    <div className="reply-to-div" id="replyToDiv">
                        <FontAwesomeIcon onClick={()=> hideReplyDiv()} className="chat-close second-close-chat" icon={faX} /> 
                       <span className="reply-to"> پاسخ به <b className="text-danger">خانم سایه </b> </span>
                       <span className="replied"> سلام من یکی از مشتریان استار فود هستم، می خواهم در مورد تجربه شما از  استارفود بشنوم </span>
                    </div>
                :  "" }

                    <div className="chat-footer">
                        <textarea cols={30} className="customer-text" />  <FontAwesomeIcon  className="send-icon" icon={faEnvelope} />
                    </div>
               </div>
            </div>
             :
            <div className="chat-avatar" onClick={() => showToggleChat()}>
               <span className="click-to-chat"> چت </span>
            </div>
            }
           
         </>
        )
    }else{
        window.location.href = '/login'
    }
}

export default Layout