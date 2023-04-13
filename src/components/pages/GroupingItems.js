import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import indianRice from "../../assets/images/indianRice.jpg"
import starfood from "../../assets/images/starfood.png"
import { Navigation } from "swiper";
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { changeHeartIconColor } from "./Utils";
export default function GroupingItems() {
    const [byModal, setByModal] = useState(false);
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container">
                <div className="groupingItemsTopSlider">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={true}

                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <Link to="/" className="topSliderLink">
                                <img className="topSliderImg" src={indianRice} alt="slider " />
                                <p className="topSliderTile"> برنج هندی  </p>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/" className="topSliderLink">
                                <img className="topSliderImg" src={indianRice} alt="slider " />
                                <p className="topSliderTile"> برنج هندی  </p>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/" className="topSliderLink">
                                <img className="topSliderImg" src={indianRice} alt="slider " />
                                <p className="topSliderTile"> برنج هندی  </p>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/" className="topSliderLink">
                                <img className="topSliderImg" src={indianRice} alt="slider " />
                                <p className="topSliderTile"> برنج هندی  </p>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/" className="topSliderLink">
                                <img className="topSliderImg" src={indianRice} alt="slider " />
                                <p className="topSliderTile"> برنج هندی  </p>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/" className="topSliderLink">
                                <img className="topSliderImg" src={indianRice} alt="slider " />
                                <p className="topSliderTile"> برنج هندی  </p>
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>

                <div className="groupingItems">
                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider" />
                        <span className="groupingTakhfif"> 5% </span>
                        <Link to="/descKala" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slider " />
                        </Link>
                        <Link to="/" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive, isActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                        </div>
                    </div>
                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider " />
                        <span className="groupingTakhfif"> 5% </span>
                        <Link to="/" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slider " />
                        </Link>
                        <Link to="/" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1121 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive, isActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                        </div>
                    </div>
                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider " />
                        <span className="groupingTakhfif"> 5% </span>
                        <Link to="/" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slider " />
                        </Link>
                        <Link to="/" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1121 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                        </div>
                    </div>
                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider " />
                        <span className="groupingTakhfif"> 5% </span>
                        <Link to="/" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slide" />
                        </Link>
                        <Link to="/" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1121 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                        </div>
                    </div>
                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider " />
                        <span className="groupingTakhfif"> 5% </span>
                        <Link to="/" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slider " />
                        </Link>
                        <Link to="/" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1121 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                        </div>
                    </div>
                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider" />
                        <span className="groupingTakhfif"> 5% </span>
                        <Link to="/" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slider " />
                        </Link>
                        <Link to="/" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1121 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                        </div>
                    </div>
                    <div className="groupingItem">
                        <img className="topLeft" src={starfood} alt="slider " />
                        <span className="groupingTakhfif"> 5% </span>
                        <Link to="/" className="groupingItemLink">
                            <img className="groupingItemsImg" src={indianRice} alt="slider" />
                        </Link>
                        <Link to="/" className="groupingItemTitleLink">
                            <p className="groupingItemTitle"> برنج هندي 1121 داريوش  </p>
                        </Link>
                        <div className="groupingItemBottomInfo">
                            <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                            <div className="groupingItemInfo">
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                            </div>
                        </div>
                        <div className="groupingItemBottomBtn">
                            <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                        </div>
                    </div>
                </div>

            </div >

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


        </>
    );

}