import React, { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faShoppingCart, faSearch, faChevronRight, faPeopleArrows } from '@fortawesome/free-solid-svg-icons'
import ShoppingCart from "../pages/ShoppingCart";
import axios from "axios";

function Header() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleSearchIcon = () => {
    setShowSearchInput(!showSearchInput);
    if (screenWidth < 768) {
      const headerStaffDiv = document.getElementById('headerStaff');
      if (headerStaffDiv) {
        headerStaffDiv.style.display = showSearchInput ? 'block' : 'none';
      }
    }
  };

  window.addEventListener('resize', () => {
    setScreenWidth(window.innerWidth);
  });

    const navigate = useNavigate();
    const [bonusResult,setBonusResult] = useState(0)
    const [takhfifMoney,settakhfifMoney] = useState(0)
    useEffect(()=>{
        axios.get("http://192.168.10.33:8080/api/checkLogin",{params:{token:localStorage.getItem("isLogedIn")}}).then((data)=>{
            if(data.data.isLogin==="NO"){
               localStorage.removeItem("isLogedIn")
            }
        })
        axios.get("http://192.168.10.33:8080/api/getHeaderInfo",{psn:localStorage.getItem("psn")}).then((data)=>{
            localStorage.getItem("buyAmount")
            setBonusResult(data.data.bonusResult)
            settakhfifMoney(data.data.takhfifMoney)
        })
    },[])

    const searchKala=(event)=>{
        if (event.keyCode === 13) {
            window.location = 'searchKala/'+event.target.value;
        }
    }
  
if(localStorage.getItem("isLogedIn")){
    return (
        <div className="row topMenu ">
            <div className="flex-container">
                <div className="flex-item-left">
                     <FontAwesomeIcon onClick={() => navigate(-1)} className="faIcon chevron-icon-right" icon={faChevronRight} />
                    <span className="mx-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> <FontAwesomeIcon className="faIcon" icon={faBars} /> </span>
                    <form className="d-inline">
                    <FontAwesomeIcon onClick={() => handleSearchIcon(!showSearchInput)} className="seachIcon faIcon" id="searchIcon" icon={faSearch} />
                        {showSearchInput && ( <input className="txtsearch" id="searchTextInput" type="text" onKeyUp={(e)=>searchKala(e)} placeholder="چی لازم داری ؟  ..." />  )}
                    </form>
                </div>
                
                <div className="flex-item-right mt-1" id="headerStaff">
                    <Link to="/inviteCode" className="headerLink" > <span> {takhfifMoney} </span> <FontAwesomeIcon className="faIcon" icon={faPeopleArrows} /> &nbsp;  </Link>    
                    <Link className="headerLink" to="/shoppingCart" element={<ShoppingCart />} ><FontAwesomeIcon className="faIcon" icon={faShoppingCart} /> &nbsp; <span className="badge text-bg-dark cartNotification">{localStorage.getItem("buyAmount")}</span> </Link> 
                </div>  
            </div>
        </div>
    )
}else{
    window.location.href="/login"
}
}

export default Header