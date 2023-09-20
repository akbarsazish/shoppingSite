import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper";
import 'swiper/swiper.min.css';
import contactImage from '../../assets/images/contactImage.jpg'
import MainGroupItem from './MainGroupItem'
import axios from "axios";
import SecondMenu from "./SecondMenu";
import MoraqebatFardi from "../slider/MoraqebatFardi";
import JadedTarenKala from "../slider/JadedTarenKala";
import Brands from "../slider/Brands";

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [mainGroups, setMainGroups] = useState(0);
    const [slides,setSlides]=useState([])
    const [smallSlider,setSmallSlider]=useState([])

    useEffect(() => {
        setTimeout(function () {
            setShowModal(false)
        }, 10000);
    }, [showModal]);

    useEffect(() => {
        axios.get("https://starfoods.ir/api/getSlidersApi",{params:{psn:localStorage.getItem("psn")}}).then((data) => {
            setSlides(data.data.sliders[0])
            setSmallSlider(data.data.smallSlider[0])
        })

    axios.get("https://starfoods.ir/api/getMainGroups").then((data) => {
            setMainGroups(data.data.map((element,index)=><MainGroupItem key={index
            } title={element.title} id={element.id} ></MainGroupItem>))
        })
    },[])

    if(localStorage.getItem("isLogedIn")){    
    return (
        <div className="container mainSliderContainer">
            <div className="row">
                <div className="col-lg-8 col-md-8 px-0 mx-0">
                    <Swiper
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper mainSlider">
                        <SwiperSlide><img src={"https://starfoods.ir/resources/assets/images/mainSlider/"+slides.firstPic} className="me-1 logo" alt="لوگو" /></SwiperSlide>
                        <SwiperSlide><img src={"https://starfoods.ir/resources/assets/images/mainSlider/"+slides.secondPic} className="me-1 logo" alt="لوگو" /></SwiperSlide>
                        <SwiperSlide><img src={"https://starfoods.ir/resources/assets/images/mainSlider/"+slides.thirdPic} className="me-1 logo" alt="لوگو" /></SwiperSlide>
                    </Swiper>
                </div>
                <div className="col-lg-4 px-0 mx-0">
                    <div className="row">
                        <img src={"https://starfoods.ir/resources/assets/images/smallSlider/"+smallSlider.secondPic} className="smallSlider" alt={smallSlider.secondPic} />
                    </div>
                    <div className="row">
                        <img src={"https://starfoods.ir/resources/assets/images/smallSlider/"+smallSlider.firstPic} className="smallSlider" alt={smallSlider.firstPic} />
                    </div>
                </div>
            </div>
            <div className="row" style={{boxShadow: "0px 0px 1px 1px #DEF"}}>
                <SecondMenu /> 
                <div className="categories">
                    {mainGroups}
                </div>
                 <MoraqebatFardi />
                 <JadedTarenKala />
                 <Brands />
    
                <div className="row my-5 p-2 text-center">
                   <img className="fourColSliderImg" alt="تماس با ما" src={contactImage} />
                </div>
            </div>

            <div className="flex-enamad">
              <div className="enamadItem">
                 <Link referrerPolicy="origin" to="https://trustseal.enamad.ir/?id=220841&amp;code=dgsiolxgvdofskzzy34r">
                    <img referrerPolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=220841&amp;Code=dGSIolXgVdoFskzzY34R"
                        alt='logo-enamad' id="dGSIolXgVdoFskzzY34R" />
                 </Link>
                    <img referrerPolicy='origin' id='nbqewlaosizpjzpefukzrgvj'
                         onClick='window.open("https://logo.samandehi.ir/Verify.aspx?id=249763&p=uiwkaodspfvljyoegvkaxlao",
          "Popup", "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")'
                        alt='logo-samandehi' src='https://logo.samandehi.ir/logo.aspx?id=249763&p=odrfshwlbsiyyndtwlbqqfti' />
                </div>
            </div>
            <div className="flex-enamad">
                <div className="enamadItem">
                    <Link to="/about" className="siteInfo" >درباره استارفود</Link> &nbsp;
                    <Link to="/policy" className="siteInfo">حریم خصوصی</Link> &nbsp;
                    <Link to="/constact" className="siteInfo" >اطلاعات فروشگاه</Link> &nbsp;
                    <Link to="/privacy" className="siteInfo" >شرایط و قوانین</Link>
                </div>
            </div>
        </div >
      )
    }else{
        window.location.href="/login"
    }
} 
