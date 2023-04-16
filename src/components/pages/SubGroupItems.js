import React, { useState,useEffect } from "react";
import {
    Link,
    useLocation,
    useParams
  } from "react-router-dom"
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
    const [subGrups,setSubGroups]=useState(0);
    const [maingroupKala,setMainGroupKala]=useState(0);
    const {mainId,subId}=useParams();

      
    //
    fetch("http://192.168.10.27:8080/api/getSubGroupList/?mainGrId="+mainId)
    .then(response=>response.json())
    .then((groups) => {
        setSubGroups(groups.map((element)=><SwiperSlide>
        <Link to={"/subGroupItems/"+element.selfGroupId+"/"+element.id} className="topSliderLink">
            <img className="topSliderImg" src={"https://starfoods.ir/resources/assets/images/subgroup/"+element.id+".jpg"} alt="slider"/>
            <p className="topSliderTile"> {element.title} </p>
        </Link>
    </SwiperSlide>))
    })
    //
    useEffect(() => {
    fetch("http://192.168.10.27:8080/api/appendSubGroupKala/?mainGrId="+mainId+"&subKalaGroupId="+subId)
    .then(response=>response.json())
    .then((data) => {
        console.log(data)
        setMainGroupKala(data.listKala.map((element)=><div className="groupingItem">
                                                <img className="topLeft" src={starfood} alt="slider" />
                                                <span className="groupingTakhfif"> {((element.Price4-element.Price3)*100)/element.Price4}% </span>
                                                <Link to="/descKala" className="groupingItemLink">
                                                    <img className="groupingItemsImg" src={"https://starfoods.ir/resources/assets/images/kala/"+element.GoodSn+"_1.jpg"} alt="slider " />
                                                </Link>
                                                <Link to="/" className="groupingItemTitleLink">
                                                    <p className="groupingItemTitle"> {element.GoodName} </p>
                                                </Link>
                                                <div className="groupingItemBottomInfo">
                                                    <div className="groupingItemInfo" onClick={() => changeHeartIconColor(setIsActive, isActive)}> <FontAwesomeIcon className={isActive ? 'defaultHeartColor' : ''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                                                    <div className="groupingItemInfo">
                                                        <p className="price" style={{ color: "#39ae00" }}> {element.Price3} تومان </p>
                                                        <p className="price" style={{ color: "#ff2c50" }}> <del>{element.Price4} تومان </del> </p>
                                                    </div>
                                                </div>
                                                <div className="groupingItemBottomBtn">
                                                    <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                                                </div>
                                            </div>))
                                        })
                                    })
                                    
    //getUnitsForUpdate Pcode

    fetch("http://192.168.10.27:8080/api/getUnitsForUpdate/?Pcode="+subId)
    .then(response=>response.json())
    .then((data) => {
        data.map((element)=><button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کیسه معادل 10 کیلو  </button>)
    });

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
                        className="mySwiper">
                        {subGrups}
                    </Swiper>
                </div>

                <div className="groupingItems">
                    {maingroupKala}
                </div>

            </div >

            {byModal ?
                <div className="modalBackdrop" id="clickToBuyModal">
                    <div id='unitStuffContainer' className="alert alert-danger buyButtonDiv">
                        <button className="btn btn-sm btn-danger buyButton" onClick={() => setByModal(!byModal)}> یک کیسه معادل 10 کیلو  </button>
                    </div>
                </div> : null}


        </>
    );

}