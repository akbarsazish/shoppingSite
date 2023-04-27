import React, { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faShoppingCart, faWallet, faStar, faSearch, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ShoppingCart from "../pages/ShoppingCart";
import axios from "axios";
function Header() {
    const [searchInput, setSearchInput] = useState(false)
    const navigate = useNavigate();
    const [bonusResult,setBonusResult] = useState(0)
    const [takhfifMoney,settakhfifMoney] = useState(0)
    useEffect(()=>{
        axios.get("http://192.168.10.27:8080/api/getHeaderInfo",{psn:localStorage.getItem("psn")}).then((data)=>{
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


    return (
        <div className="row topMenu ">
            <div className="flex-container">
                <div className="flex-item-left">
                    <FontAwesomeIcon onClick={() => navigate(-1)} className="faIcon" icon={faChevronRight} />
                    <span className="mx-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> <FontAwesomeIcon className="faIcon" icon={faBars} /> </span>
                    <form className="d-inline">
                        <FontAwesomeIcon onClick={() => setSearchInput(!searchInput)} className="faIcon" id="searchIcon" icon={faSearch} />
                        {searchInput ? <input className="txtsearch" type="text" onKeyUp={(e)=>searchKala(e)} placeholder="چی لازم داری ؟  ..." /> : null}
                    </form>
                </div>
                {!searchInput ? <div className="flex-item-right mt-2">
                    <Link to="/luckWell" className="headerLink" > <span> {bonusResult} </span> <FontAwesomeIcon className="faIcon" icon={faStar} /> &nbsp;  </Link>  
                    <Link to="/wallet" className="headerLink" > <span> {takhfifMoney} </span> <FontAwesomeIcon className="faIcon" icon={faWallet} /> &nbsp;  </Link>    
                    <Link className="headerLink" to="/shoppingCart" element={<ShoppingCart />} ><FontAwesomeIcon className="faIcon" icon={faShoppingCart} /> &nbsp; <span className="badge text-bg-dark cartNotification">{localStorage.getItem("buyAmount")}</span> </Link> 
                </div> : null}
            </div>
        </div >
    )
}

export default Header