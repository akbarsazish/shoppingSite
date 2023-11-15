import React, {useState, useEffect} from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import userAvatar from "../../assets/images/siteImage/userAvatar.png";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import CountDownTimer from "./CountDownTimer";
import { Link } from "react-router-dom";

export default function GamerList (){
  const [showAll, setShowAll] = useState(false);
  
  const toggleShowAll = () => {
    setShowAll(true);
  };

  const [gamerList, setGamerLest] = useState({
    played: [],
    players: [],
    prizes: {},
  });
 
  useEffect(() => {
      axios.get("https://starfoods.ir/api/getGamerList", {
      params: { gameId: 2, psn: localStorage.getItem("psn") }
      }).then((response) => {
          setGamerLest(response.data);
      }).catch((error) => {
      console.error("Error fetching data:", error);
      });
  }, []);

  const getGamerPrize = (index) => {
     let prize = "";
        switch(index){
            case 0:
                prize = "نفر اول 300,000 تومان"
            break;

            case 1:
                prize ="نفر دوم 200,000 تومان"
            break;

            case 2:
            prize = "نفر سوم 100,000 تومان"
            break;
            
            default:
            prize = "";
        }
      return prize;
   }
 
//add class to first, second and third gamer items
   const addingId = (index) => {
     let myClass="";
     if(index === 0){
        return "firstPerson";
      }else {
        if(index === 1){
            return "secondPerson";
        }
        if(index === 2){
            return "thirdPerson";
        }
      }
      return myClass;
   }


    return (
     <>
      <Header/>
      <Sidebar />
      <div className="container-fluid marginTop" style={{backgroundColor:"#f5f5f5"}}>
        <CountDownTimer />
         <div className="gamer-container">
           {gamerList.players.map((gamer, index) => (
            (showAll || index <= 7) && (
              <div className="gamer-item" id="gamerItem" key={index}>
                <span className="gamer-prize" id={addingId(index)}> {getGamerPrize(index)} </span>
                <img src={userAvatar} alt="userAvatar" className="gamer-image" id={addingId(index)} />
                <p className="gamer-score">  {gamer.score} </p>
                <p className="gamer-name"> {gamer.Name} </p>
              </div>
            )))}
            {!showAll && (
              <div className="show-all-gamer" onClick={toggleShowAll} >
                 <span className="show-all-text">  نمایش همه  </span>
              </div>
            )}
         </div>
         <Link to='https://starfoods.ir/resources/assets/tower/index.html'>
           <button id="playButton" className="buttonGame">  ورود به بازی  <FontAwesomeIcon style={{marginBottom:"-3px"}} icon={faAngleLeft} /> </button>
         </Link>
      </div>
      <Footer />
    </>
    );
}
