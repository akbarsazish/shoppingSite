import React, { memo } from "react";
import { faHouse, faListAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "../pages/Home";
import ShoppingCart from "../pages/ShoppingCart";
import BackToTopButton from "../pages/BackToTop";

const Footer = ()=> {
  return (
    <>
    <div className="row">
        <div className="footer px-0 mx-0">
            <Link className="footerLink" to="/grouping">
              <span className="badge text-bg-danger notification"> {localStorage.getItem("buyAmount")} </span><FontAwesomeIcon className="footerIcon text-light" icon={faListAlt} /></Link>
            <Link className="footerLink" to="/" element={<Home />}><FontAwesomeIcon className="footerIcon text-light" icon={faHouse} /></Link>
            <Link className="footerLink" to="/shoppingCart" element={<ShoppingCart />}><FontAwesomeIcon className="footerIcon text-light" icon={faShoppingCart} /></Link>
        </div>
    </div>
    <BackToTopButton />
    </>
  )
}

export default memo(Footer)