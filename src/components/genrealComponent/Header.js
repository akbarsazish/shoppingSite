import React from "react"
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faShoppingCart, faWallet, faStar, faSearch, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ShoppingCart from "../pages/ShoppingCart";
function Header() {

    const [searchInput, setSearchInput] = useState(false)
    const navigate = useNavigate();

    return (
        <div className="row topMenu ">
            <div className="flex-container">
                <div className="flex-item-left">
                    <FontAwesomeIcon onClick={() => navigate(-1)} className="faIcon" icon={faChevronRight} />
                    <span className="mx-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> <FontAwesomeIcon className="faIcon" icon={faBars} /> </span>
                    <form className="d-inline">
                        <FontAwesomeIcon onClick={() => setSearchInput(!searchInput)} className="faIcon" id="searchIcon" icon={faSearch} />
                        {searchInput ? <input className="txtsearch" type="text" id="txtsearch" placeholder="چی لازم داری ؟  ..." /> : null}
                    </form>
                </div>
                {!searchInput ? <div className="flex-item-right mt-2">
                    <Link to="/luckWell" className="headerLink" > <FontAwesomeIcon className="faIcon" icon={faStar} /> &nbsp; </Link>
                    <Link to="/wallet" className="headerLink" > <FontAwesomeIcon className="faIcon" icon={faWallet} /> &nbsp;  </Link>
                    <Link className="headerLink" to="/shoppingCart" element={<ShoppingCart />} > <FontAwesomeIcon className="faIcon" icon={faShoppingCart} /> </Link> <span className="badge text-bg-dark cartNotification">4</span>
                </div> : null}
            </div>
        </div >
    )
}

export default Header