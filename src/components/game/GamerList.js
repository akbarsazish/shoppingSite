import React, {useState} from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import userAvatar from "../../assets/images/siteImage/userAvatar.png";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GamerList (){
    return (
     <>
      <Header/>
      <Sidebar />
      <div className="container-fluid marginTop" style={{backgroundColor:"#f8f9f9"}}>
         <div className="gamer-container">
            <div className="gamer-item">
                <span className="gamer-prize" id="first-prize"> نفر اول 300,000 تومان </span>
                <img src={userAvatar} alt="userAvatar" className="gamer-image" id="firstPerson" />
                <p className="gamer-score"> 3456 </p>
                <p className="gamer-name"> اسماعيل قاسمي - کباب بناب آيلار </p>
            </div>
            <div className="gamer-item">
                <span className="gamer-prize" id="second-prize"> نفر دوم 200,000 تومان </span>
                <img src={userAvatar} alt="userAvatar" className="gamer-image" id="secondPerson" />
                <p className="gamer-score"> 3456 </p>
                <p className="gamer-name"> اسماعيل قاسمي - کباب بناب آيلار </p>
            </div>
            <div className="gamer-item">
                <span className="gamer-prize" id="third-prize"> نفر سوم 100,000 تومان </span>
                <img src={userAvatar} alt="userAvatar" className="gamer-image" id="thirdPerson"/>
                <p className="gamer-score"> 3456 </p>
                <p className="gamer-name"> اسماعيل قاسمي - کباب بناب آيلار </p>
            </div>
            <div className="gamer-item">
                <img src={userAvatar} alt="userAvatar" className="gamer-image" />
                <p className="gamer-score"> 3456 </p>
                <p className="gamer-name"> اسماعيل قاسمي - کباب بناب آيلار </p>
            </div>
            <div className="gamer-item">
                <img src={userAvatar} alt="userAvatar" className="gamer-image" />
                <p className="gamer-score"> 3456 </p>
                <p className="gamer-name"> اسماعيل قاسمي - کباب بناب آيلار </p>
            </div>
            <div className="gamer-item">
                <img src={userAvatar} alt="userAvatar" className="gamer-image" />
                <p className="gamer-score"> 3456 </p>
                <p className="gamer-name"> اسماعيل قاسمي - کباب بناب آيلار </p>
            </div>
            <div className="gamer-item">
                <img src={userAvatar} alt="userAvatar" className="gamer-image" />
                <p className="gamer-score"> 3456 </p>
                <p className="gamer-name"> اسماعيل قاسمي - کباب بناب آيلار </p>
            </div>
         </div>
         <button id="playButton" class="buttonGame">  ورود به بازی  <FontAwesomeIcon style={{marginBottom:"-3px"}} icon={faAngleLeft} /> </button> 
      </div>
      <Footer />
    </>
    );
}
