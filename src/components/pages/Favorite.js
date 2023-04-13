import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import indianRice from "../../assets/images/indianRice.jpg"
import starfood from "../../assets/images/starfood.png"
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { changeHeartIconColor } from "./Utils";
import Footer from "../genrealComponent/Footer";
import { faBell } from "@fortawesome/free-regular-svg-icons";


export default function Favorite() {
    const [byModal, setByModal] = useState(false);
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop">
                <div className="groupingItems">
                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider" />
                        <Link to="/descKala" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slider " />
                        </Link>
                        <Link to="/descKala" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1121 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive, isActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <button className="btn btn-sm btn-danger awareMeBtn small"> خبرم کنید <FontAwesomeIcon icon={faBell} /></button>
                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm notExist"> ناموجود <FontAwesomeIcon style={{ color: "red" }} icon={faBan} />  </button>
                        </div>
                    </div>

                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider " />
                        <Link to="/descKala" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slider " />
                        </Link>
                        <Link to="/descKala" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1121 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive, isActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                        </div>
                    </div>
                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider " />
                        <Link to="/descKala" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slider " />
                        </Link>
                        <Link to="/descKala" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1121 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>

                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                        </div>
                    </div>

                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider" />
                        <Link to="/descKala" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slider " />
                        </Link>
                        <Link to="/descKala" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1121 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive, isActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <button className="btn btn-sm btn-danger awareMeBtn small"> خبرم کنید <FontAwesomeIcon icon={faBell} /></button>
                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm notExist"> ناموجود <FontAwesomeIcon style={{ color: "red" }} icon={faBan} />  </button>
                        </div>
                    </div>
                </div>
            </div>

            {byModal ?
                <div className="modalBackdrop" id="clickToBuyModal">
                    <div id='unitStuffContainer' className="alert alert-danger buyButtonDiv">
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کیسه معادل 10 کیلو  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کارتن معادل 6 عدد  </button>
                    </div>
                </div> : null}

            <Footer />
        </>
    );

}