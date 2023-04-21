import React, { useState,useEffect,useRef } from "react";
import {
    Link,
    useParams
  } from "react-router-dom"
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import starfood from "../../assets/images/starfood.png"
import { Navigation } from "swiper";
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import { event } from "jquery";
export default function GroupingItems(props) {

    const [isActive, setIsActive] = useState(false);
    const [subGrups,setSubGroups]=useState(0);
    const [maingroupKala,setMainGroupKala]=useState(0);
    const [selectedHeart, setSelectedHeart] = useState(null);
    const {id}=useParams();
    const heartRef = useRef(null);
    //
    useEffect(()=>{
            fetch("http://192.168.10.27:8080/api/getSubGroupList/?mainGrId="+id)
            .then(response=>response.json())
            .then((groups) => {
                setSubGroups(groups.map((element,index)=><SwiperSlide key={index}>
                <Link to={"/subGroupItems/"+element.selfGroupId+"/"+element.id} className="topSliderLink">
                    <img className="topSliderImg" src={"https://starfoods.ir/resources/assets/images/subgroup/"+element.id+".jpg"} alt="slider"/>
                    <p className="topSliderTile"> {element.title} </p>
                </Link>
            </SwiperSlide>))
            })
        },[isActive])

    useEffect(() => {
    fetch("http://192.168.10.27:8080/api/getMainGroupKala/?mainGrId="+id)
    .then(response=>response.json())
    .then((data) => {
        setMainGroupKala(data.listKala.map((element,index)=>
                                            <div key={index} className="groupingItem">
                                                <img className="topLeft" src={starfood} alt="slider" />
                                                {element.Price4>0&& <span className="groupingTakhfif"> {parseInt(((element.Price4-element.Price3)*100)/element.Price4)}%</span>}
                                                <Link to={"/descKala/"+element.GoodSn} className="groupingItemLink">
                                                    <img className="groupingItemsImg" src={"https://starfoods.ir/resources/assets/images/kala/"+element.GoodSn+"_1.jpg"} alt="slider " />
                                                </Link>
                                                <Link to="/" className="groupingItemTitleLink">
                                                    <p className="groupingItemTitle"> {element.GoodName} </p>
                                                </Link>
                                                <div className="groupingItemBottomInfo">
                                                    <div className="groupingItemInfo" > <FontAwesomeIcon   onClick={(e) => props.changeHeartIconColor(element.GoodSn,e)} className={(element.favorite=='YES') ? 'defaultHeartColor' :''} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                                                    <div className="groupingItemInfo">
                                                    <p className="price" style={{ color: "#39ae00" }}> {parseInt(element.Price3/10).toLocaleString()} تومان </p>
                                                    {element.Price4>0 && <p className="price" style={{ color: "#ff2c50" }}> <del>{parseInt(element.Price4/10).toLocaleString()} تومان </del> </p>}
                                                    </div>
                                                </div>
                                                <div className="groupingItemBottomBtn">
                                                {element.activePishKharid<1 
                                                ?
                                                    (element.bought=="Yes" ?
                                                        <button className="btn btn-sm btn-info selectAmount" onClick={()=>props.showUpdateBuyModal(element.GoodSn,element.SnOrderBYS)} data-bs-toggle="modal" data-bs-target="#exampleModal"> {parseInt(element.PackAmount)+" "+element.secondUnit +" معادل "+parseInt(element.Amount)+" "+ element.UName} <FontAwesomeIcon icon={faShoppingCart} /></button>
                                                        :(element.callOnSale>0?
                                                            <button  className="btn-add-to-cart">برای خرید تماس بگیرید <i className="far fa-shopping-cart text-white ps-2"></i></button>
                                                            :(element.Amount>0 || element.freeExistance>0 
                                                                ?
                                                                <button className="btn btn-sm btn-danger selectAmount" id={"buyButton"+element.GoodSn} onClick={(event)=>{props.showBuyModal(element.GoodSn,event)}}  data-bs-toggle="modal" data-bs-target="#exampleModal"> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} /></button>
                                                                :
                                                                <div className="c-product__add mt-0">
                                                                <button className="btn btn-sm btn-dark selectAmount">ناموجود &nbsp; <i className="fas fa-ban"></i></button>
                                                                </div>   
                                                            )
                                                        )
                                                    )
                                                : 'Result3' }

                                                </div>
                                            </div>))
                                            })
                                        },[isActive])
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
            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog buyModal">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div id='unitStuffContainer' className="alert alert-danger buyButtonDiv">
                                {props.buyOption}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

}