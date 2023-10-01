import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane, faReply, faX } from "@fortawesome/free-solid-svg-icons";
import profile from "../../assets/images/profile.png";
import userAvatar from "../../assets/images/siteImage/userAvatar.png";
import axios from "axios";

export default function ChatGroup() {
    const [liveChat, setLiveChat] = useState(false);
    const [redPlyDiv, setReplyDiv] = useState(false);
    const [messages, setMessages] = useState([]);
    const [replyTo, setReplyTo] = useState("");
    const [customerText, setCustomerText] = useState('');
    const [customerReply, setCustomerReply] = useState('');

    // console.log("reply to :", replyTo)
    const showToggleChat = () => {
        setLiveChat(true)
    }

    const hideToggleChat = () => {
        setLiveChat(false)
    }
    
    const hideReplyDiv = () => {
        setReplyDiv(false)
    }

    const showReplyDiv = (messageToreplay) => {
        setReplyTo(messageToreplay)
        setReplyDiv(true)
    }

    const messageData = (event) => {
      setCustomerText(event.target.value);
    };

    const replayMessageData = (event) => {
        setCustomerReply(event.target.value);
    };

      const addMessage = () => {
        const psn = localStorage.getItem("psn");
        const apiUrl = `https://starfoods.ir/api/addMessage?psn=${psn}&messageContent=${encodeURIComponent(customerText)}`;
        axios.get(apiUrl)
          .then(response => {
            setCustomerText("");
            console.log('Message sent successfully:', response.data);
          })
          .catch(error => {
            console.error('Error sending message:', error);
          });
      };

      const replayMessage = (msTobeRepliedId) => {
        const psn = localStorage.getItem("psn");
        const apiUrl = `https://starfoods.ir/api/replayMessage?psn=${psn}&messageId=${msTobeRepliedId}&messageContent=${encodeURIComponent(customerReply)}`;
        axios.get(apiUrl)
          .then(response => {
            setCustomerReply("");
            console.log('Message sent successfully:', response.data);
          })
          .catch(error => {
            console.error('Error sending message:', error);
          });
      };

    useEffect(()=>{
        const fetchData = async () => {
          try {
            const response = await axios.get('https://starfoods.ir/api/getChatMessages', {params:{psn:localStorage.getItem("psn")}});
            setMessages(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
          fetchData();
    }, []);

        return (
         <>
            {liveChat ?
             <div className="live-chat">
               <div className="live-chat-content">
                    <div className="chat-header">
                        <FontAwesomeIcon onClick={()=> hideToggleChat()} className="chat-close" icon={faX} />
                    </div>
                    <div className="chat-body" id="chatBody">
                        { messages.map((message) =>
                         <>
                            <div className="message-body" key={message.MessageSn}>
                                <div className="message">
                                    <p className="customer-name"> ❤️ {message.Name} ❤️</p>
                                    <span className="customer-message"> 
                                       {message.MessageContent} <FontAwesomeIcon onClick={()=>showReplyDiv(message)} id="replyIcon" icon={faReply} />
                                       <p className="chat-date"> {message.TimeStamp ? message.TimeStamp.toLocaleString('fa-IR') : ""}</p> 
                                    </span>
                                </div>
                                <div className="reply-part">
                                    <FontAwesomeIcon onClick={()=>showReplyDiv(message)} id="replyIcon" icon={faReply} />
                                </div>
                            </div>
                            { message.replay.length > 0 ?
                              message.replay.map((firstReply)=> 
                              <>
                                <div className="replied-body" key={firstReply.MessageSn}>
                                    <div className="replied">
                                    <p className="reply-to-whom">  <b className="text-danger"> پاسخ </b> {firstReply.Name} <b className="text-danger"> به </b> {message.Name} </p>
                                        <span className="replied-message"> 
                                            {message.MessageContent} <FontAwesomeIcon onClick={()=>showReplyDiv(firstReply)} id="replyIcon" icon={faReply} />
                                            <p className="chat-date"> {firstReply.TimeStamp ? firstReply.TimeStamp.toLocaleString('fa-IR'): ""}</p>
                                        </span>
                                        <span className="reply-to-message">
                                          {firstReply.MessageContent} <FontAwesomeIcon onClick={()=>showReplyDiv(firstReply)} id="replyIcon" icon={faReply} />  
                                        </span>
                                    </div>
                                    <div className="reply-part">
                                        <FontAwesomeIcon onClick={()=>showReplyDiv(firstReply)} id="replyIcon" icon={faReply} />
                                    </div>
                                </div>

                                  {firstReply.replay.length > 0 ?
                                    firstReply.replay.map((secondReplay)=>
                                     <>
                                     <div className="replied-body" key={secondReplay.MessageSn}>
                                         <div className="replied">
                                             <p className="reply-to-whom">  <b className="text-danger"> پاسخ </b> {secondReplay.Name} <b className="text-danger"> به </b> {firstReply.Name} </p>
                                             <span className="replied-message"> 
                                                 {firstReply.MessageContent} <FontAwesomeIcon onClick={()=>showReplyDiv(secondReplay)} id="replyIcon" icon={faReply} />
                                                 <p className="chat-date"> {secondReplay.TimeStamp ? secondReplay.TimeStamp.toLocaleString('fa-IR') : ""}</p>
                                             </span>
                                             <span className="reply-to-message">
                                             {secondReplay.MessageContent} <FontAwesomeIcon onClick={()=>showReplyDiv(secondReplay)} id="replyIcon" icon={faReply} />
                                             </span>
                                         </div>
                                         <div className="reply-part">
                                             <FontAwesomeIcon onClick={()=>showReplyDiv(secondReplay)} id="replyIcon" icon={faReply} />
                                         </div>
                                      </div>

                                         {secondReplay.replay.length > 0 ?
                                            secondReplay.replay.map((thirdReplay)=>
                                                <>
                                                <div className="replied-body" key={thirdReplay.MessageSn}>
                                                    <div className="replied">
                                                        <p className="reply-to-whom">  <b className="text-danger"> پاسخ </b> {thirdReplay.Name} <b className="text-danger"> به </b> {secondReplay.Name} </p>
                                                        <span className="replied-message"> 
                                                            {secondReplay.MessageContent} <FontAwesomeIcon onClick={()=>showReplyDiv(thirdReplay)} id="replyIcon" icon={faReply} />
                                                            <p className="chat-date"> {thirdReplay.TimeStamp ? thirdReplay.TimeStamp.toLocaleString('fa-IR') : "" }</p>
                                                        </span>
                                                        <span className="reply-to-message">
                                                          {thirdReplay.MessageContent} <FontAwesomeIcon onClick={()=>showReplyDiv(thirdReplay)} id="replyIcon" icon={faReply} />
                                                        </span>
                                                    </div>
                                                    <div className="reply-part">
                                                        <FontAwesomeIcon onClick={()=>showReplyDiv(thirdReplay)} id="replyIcon" icon={faReply} />
                                                    </div>
                                                </div>
                                              </>
                                             ) : ""}
                                          </>
                                         ) : ""}
                                      </>
                                    ): ""}
                                 </>
                           )}
                    </div>

                { redPlyDiv ?
                    <div className="reply-to-div" id="replyToDiv">
                        <FontAwesomeIcon onClick={()=> hideReplyDiv()} className="chat-close second-close-chat" icon={faX} /> 
                        <span className="reply-to"> پاسخ به <b className="text-danger"> {replyTo.Name} </b> </span>
                        <span className="replied"> {replyTo.MessageContent} </span>
                    </div>
                     :  "" }
                     
                { !redPlyDiv ? 
                     <div className="chat-footer">
                        <textarea onChange={messageData} value={customerText} cols={30} className="customer-text" id="customerText" /> 
                        <FontAwesomeIcon onClick={()=>addMessage} className="send-icon" icon={faPaperPlane} /> 
                     </div> 
                :
                    <div className="chat-footer">
                        <textarea onChange={replayMessageData} value={customerReply} cols={30} className="customer-text" id="customerText" /> 
                        <FontAwesomeIcon onClick={()=>replayMessage(replyTo.MessageSn)} className="send-icon" icon={faPaperPlane} /> 
                    </div>
                }
                 </div>
            </div>
             :
            <div className="chat-avatar" onClick={() => showToggleChat()}>
               <span className="click-to-chat"> چت </span>
            </div>
            }
         </>
      )
}
