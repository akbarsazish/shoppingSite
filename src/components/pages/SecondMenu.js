import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import game from '../../assets/images/siteImage/game.png';
import wallet from '../../assets/images/siteImage/wallet.png';
import precentage from '../../assets/images/siteImage/precentage.png';
import star from '../../assets/images/siteImage/star.png';

export default function SecondMenu() {

  const [attractions, setAttractions] = useState([]);
  let customerId = localStorage.getItem("psn");

  useEffect(() => {
    fetch(`https://starfoods.ir/api/getAttractiveVisits?psn=${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        setAttractions(data[0]);
      });
  }, []);

  const todayDate = new Date().toISOString().slice(0, 10);
  let visitedDate = attractions.ViewJustDate;
  let visitMoneyCase = attractions.MoneyCase;
  let visitGame = attractions.Game;
  let visitDiscount = attractions.Discount;
  let visitStar = attractions.StarfoodStar;
 

  return (
    <div className="round-menu">
      <div className="round-menu-items" id="roundMenuItem">
        <div className="round-item">
          <Link to={"/wallet"} className="round-link">
            <div className={`round-menu-info ${parseInt(visitMoneyCase) == 1 && visitedDate == todayDate ? "visited" : "notVisited"}`}>
              <img src={wallet} alt="star" className="round-menu-img" />
            </div>
            <span className="rount-menu-text">کیف پول</span>
          </Link>
        </div>
      </div>
      <div className="round-menu-items" id="roundMenuItem">
        <div className="round-item">
          <Link to={"/gamerList"} className="round-link">
            <div className={`round-menu-info ${parseInt(visitGame) == 1 && visitedDate == todayDate ? "visited" : "notVisited"}`}>
              <img src={game} alt="star" className="round-menu-img" />
            </div>
            <span className="rount-menu-text">بازیها</span>
          </Link>
        </div>
      </div>
      <div className="round-menu-items" id="roundMenuItem">
        <div className="round-item">
          <Link to={"/disAndPrice"} className="round-link">
            <div className={`round-menu-info ${parseInt(visitDiscount) == 1 && visitedDate === todayDate ? "visited" : "notVisited"}`}>
              <img src={precentage} alt="star" className="round-menu-img" /> 
            </div>
            <span className="rount-menu-text">تخفیف ها</span>
          </Link>
        </div>
      </div>
      <div className="round-menu-items" id="roundMenuItem">
        <div className="round-item">
          <Link to="/lottery" className="round-link">    
            <div className={`round-menu-info ${parseInt(visitStar) == 1 && visitedDate == todayDate ? "visited" : "notVisited"}`}>
              <img src={star} alt="star" className="round-menu-img" /> 
            </div>
            <span className="rount-menu-text">ستاره</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
