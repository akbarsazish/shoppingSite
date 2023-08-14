import React from "react";
import { faHouse, faListAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "../pages/Home";
import ShoppingCart from "../pages/ShoppingCart";

export default function Footer() {
    return (
        <div className="containerFluid px-0 mx-0">
            <div className="footer px-0 mx-0">
                <Link className="footerLink" to="/grouping"><span className="badge text-bg-danger notification">4</span><FontAwesomeIcon className="footerIcon text-light" icon={faListAlt} /></Link>
                <Link className="footerLink" to="/" element={<Home />}><FontAwesomeIcon className="footerIcon text-light" icon={faHouse} /></Link>
                <Link className="footerLink" to="/shoppingCart" element={<ShoppingCart />}><FontAwesomeIcon className="footerIcon text-light" icon={faShoppingCart} /></Link>
            </div>

        </div>
    )
}