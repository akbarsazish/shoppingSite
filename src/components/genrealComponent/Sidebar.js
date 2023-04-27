import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faListAlt, faHeart, faShoppingCart, faEnvelope, faPhone, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import logo from '../../assets/images/logo.png'
import Profile from "../pages/Profile";
import Grouping from "../pages/Grouping";
import Favorite from "../pages/Favorite";
import Message from "../pages/Message";
import Contact from "../pages/Contact";


function Sidebar() {
    return (
        <div className="offcanvas offcanvas-end customeOffcanvas" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <Link to="/home">
                <div className="offcanvas-header dri-left" dir="ltr">
                    <button type="button" className="btn-close bg-light" data-bs-dismiss="offcanvas" aria-label="Close"> </button>
                    <img width="177px" src={logo} className="me-1 logo" alt="لوگو" />
                </div >
            </Link>
            <div className="offcanvas-body px-0">
                <Link className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faUser} />  نام یوزر  </Link>
                <Link to="/profile" element={<Profile />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faInfoCircle} />  وضعیت من  </Link>
                <Link to="/grouping" element={<Grouping />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faListAlt} /> دسته بندی </Link>
                <Link to="/favorite" element={<Favorite />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faHeart} />  مورد علاقه  </Link>
                <Link to="/shoppingCart" element={<faShoppingCart />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faShoppingCart} />  سبد خرید </Link>
                <Link to="/message" element={<Message />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faEnvelope} /> پیام ها  </Link>
                <Link to="/contact" element={<Contact />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faPhone} /> تماس با ما </Link>
                <Link to="/login" onClick={()=>{localStorage.removeItem("isLogedIn")}} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faSignOut} /> خروج </Link>
            </div>
            < div className="offcanvas-header dri-left" dir="ltr">
                <Link className="socialMedia" to="https://instagram.com/{{$instagram}}"><FontAwesomeIcon className="menuFaIcon" style={{ color: "#b32eba" }} icon={faInstagram} /></Link>
                <Link className="socialMedia" to="https://instagram.com/{{$instagram}}"><FontAwesomeIcon className="menuFaIcon" style={{ color: "#00a0d7" }} icon={faTelegram} /></Link>
                <Link className="socialMedia" to="https://instagram.com/{{$instagram}}"><FontAwesomeIcon className="menuFaIcon" style={{ color: "#00cd6c" }} icon={faWhatsapp} /></Link>
            </div>
        </div>
    )
}

export default Sidebar