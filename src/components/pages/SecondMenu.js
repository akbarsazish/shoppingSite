import React from "react";
import { Link } from "react-router-dom";
import game from '../../assets/images/siteImage/game.png';
import wallet from '../../assets/images/siteImage/wallet.png';
import precentage from '../../assets/images/siteImage/precentage.png';
import star from '../../assets/images/siteImage/star.png';

export default function SecondMenu() {
    return(
       
            <div className="round-menu">
               <div className="round-menu-items" id="roundMenuItem">
                    <div className="round-item">
                        <Link to={"/wallet"} className="round-link">
                            <div className="round-menu-info">
                                <img src={wallet} alt="star" className="round-menu-img" />
                            </div>
                            <span className="rount-menu-text">  کیف پول  </span>
                        </Link>
                    </div>
                </div>
                <div className="round-menu-items" id="roundMenuItem">
                    <div className="round-item">
                        <Link to={"/gamerList"} className="round-link">
                            <div className="round-menu-info" >
                                <img src={game} alt="star" className="round-menu-img" />
                            </div>
                            <span className="rount-menu-text">  بازیها   </span>
                        </Link>
                    </div>
               </div>
        
                <div className="round-menu-items" id="roundMenuItem">
                    <div className="round-item">
                        <Link to={"/disAndPrice"} className="round-link">
                            <div className="round-menu-info">
                                <img src={precentage} alt="star" className="round-menu-img" /> 
                            </div>
                            <span className="rount-menu-text"> تخفیف ها   </span>
                        </Link>
                    </div>
                </div>
                <div className="round-menu-items" id="roundMenuItem">
                    <div className="round-item">
                        <Link to="/lottery" className="round-link">    
                            <div className="round-menu-info">
                                <img src={star} alt="star" className="round-menu-img" /> 
                            </div>
                            <span className="rount-menu-text"> ستاره  </span>
                        </Link>
                    </div>
                </div>
          </div>
    )
}

