import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper";
import contactImage from '../../assets/images/contactImage.jpg'
import MainGroupItem from './MainGroupItem'
import axios from "axios";
import SecondMenu from "./SecondMenu";
import HomeSliders from "../slider/HomeSliders";

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [mainGroups, setMainGroups] = useState(0);
    const [slides,setSlides]=useState([]);
    const [smallSlider,setSmallSlider]=useState([]);

    useEffect(() => {
        setTimeout(function () {
            setShowModal(false)
        }, 10000);
    }, [showModal]);

    useEffect(() => {
        axios.get("https://starfoods.ir/api/getSlidersApi",{
            params:{psn:localStorage.getItem("psn")}})
            .then((data) => {
            setSlides(data.data.sliders[0])
            setSmallSlider(data.data.smallSlider[0])
        })

    axios.get("https://starfoods.ir/api/getMainGroups").then((data) => {
            setMainGroups(data.data.map((element,index)=>
            <MainGroupItem key={index} title={element.title} id={element.id} ></MainGroupItem>))
        })
    },[])

    if(localStorage.getItem("isLogedIn")){    
    return (
        <div className="container bg-light marginTop">
            <div className="mainSliderContainer">
                <div className={`${smallSlider.activeOrNot == 1 ? 'mainSlider-right' : 'mainSlider-full-page'}`}>
                    <Swiper
                        spaceBetween={10}
                        autoplay={{
                            delay: 2800,
                            disableOnInteraction: false,
                          }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper mainSlider">
                        <SwiperSlide><img className="img-responsive me-1 logo" src={"https://starfoods.ir/resources/assets/images/mainSlider/"+slides.firstPic} alt="لوگو" /></SwiperSlide>
                        <SwiperSlide><img className="img-responsive me-1 logo" src={"https://starfoods.ir/resources/assets/images/mainSlider/"+slides.secondPic} alt="لوگو" /></SwiperSlide>
                        <SwiperSlide><img className="img-responsive me-1 logo" src={"https://starfoods.ir/resources/assets/images/mainSlider/"+slides.thirdPic} alt="لوگو" /></SwiperSlide>
                        <SwiperSlide><img className="img-responsive me-1 logo" src={"https://starfoods.ir/resources/assets/images/mainSlider/"+slides.fourthPic} alt="لوگو" /></SwiperSlide>
                        <SwiperSlide><img className="img-responsive me-1 logo" src={"https://starfoods.ir/resources/assets/images/mainSlider/"+slides.fifthPic} alt="لوگو" /></SwiperSlide>
                    </Swiper>
                </div>
                {smallSlider.activeOrNot==1 ?
                <div className="mainSlider-left">
                    <div className="row">
                        <img  className="img-responsive smallSlider" src={"https://starfoods.ir/resources/assets/images/smallSlider/"+smallSlider.secondPic} alt={smallSlider.secondPic} />
                    </div>
                    <div className="row">
                        <img  className="img-responsive smallSlider" src={"https://starfoods.ir/resources/assets/images/smallSlider/"+smallSlider.firstPic} alt={smallSlider.firstPic} />
                    </div>
                </div>
                :""}

            </div>
            <div className="row">
                <SecondMenu /> 
                <div className="categories">
                    {mainGroups}
                </div>
                 <HomeSliders />
                <div className="text-center mt-4">
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
                    <Link to="/contact" className="siteInfo" >اطلاعات فروشگاه</Link> &nbsp;
                    <Link to="/privacy" className="siteInfo" >شرایط و قوانین</Link>
                </div> <hr/>
            </div>
        </div>
      )
    }else{
        window.location.href="/login"
    }
} 
