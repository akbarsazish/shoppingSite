import React, {useEffect } from "react";
import {memo} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faListAlt, faHeart, faShoppingCart, faEnvelope, faPhone, faSignOut, faUser, faBuilding, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/images/logo.png'
import Profile from "../pages/Profile";
import Grouping from "../pages/Grouping";
import Favorite from "../pages/Favorite";
import Message from "../pages/Message";
import Contact from "../pages/Contact";
import GamerList from "../game/GamerList";
import ChequeRequest from "../pages/ChequeRequest"
const Sidebar = ()=> {
    useEffect(() => {
        const handleMenuItemClick = () => {
          const backdrop = document.querySelector(".offcanvas-backdrop.fade.show");
          if (backdrop) {
            backdrop.classList.remove("show");
          }
        };
    
        const menuItems = document.querySelectorAll(".menuItem");
        menuItems.forEach(item => {
          item.addEventListener("click", handleMenuItemClick);
        });
    
        return () => {
          menuItems.forEach(item => {
            item.removeEventListener("click", handleMenuItemClick);
          });
        };
      }, []);

    return (
            <>
              <div className="offcanvas offcanvas-end customeOffcanvas" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <Link to="/home" className="menuItem">
                  <div className="offcanvas-header dri-left" dir="ltr">
                    <button type="button" className="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"> </button>
                    <img width="155px" src={logo} className="me-1 logo" alt="لوگو" />
                  </div >
                </Link>
                <div className="offcanvas-body px-0">
                  <Link to="/profile" element={<Profile />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faInfoCircle} />  وضعیت من  </Link>
                  <Link to="/grouping" element={<Grouping />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faListAlt} /> دسته بندی </Link>
                  <Link to="/favorite" element={<Favorite />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faHeart} />  مورد علاقه  </Link>
                  <Link to="/message" element={<Message />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faEnvelope} /> پیام ها  </Link>
                  <Link to="/gamerList" element={<GamerList />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faBuilding} />  برج سازی  </Link>
                  <Link to="/chequeRequest" element={<ChequeRequest />}  className="menuItem"> <FontAwesomeIcon className="menuFaIcon" icon={faMoneyBill} /> خرید چکی </Link>
                  <Link to="/contact" element={<Contact />} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faPhone} /> تماس با ما </Link>
                  <Link to="/login" onClick={()=>{localStorage.removeItem("isLogedIn")}} className="menuItem">  <FontAwesomeIcon className="menuFaIcon" icon={faSignOut} /> خروج </Link>
                </div>
              </div>
            </>
          );
}

export default memo(Sidebar)