import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper";
import 'swiper/swiper.min.css';
import contactImage from '../../assets/images/contactImage.jpg'
import MainGroupItem from './MainGroupItem'
import axios from "axios";
import SecondMenu from "./SecondMenu";

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

        axios.get("http://192.168.10.33:8080/api/getSlidersApi").then((data) => {

            setSlides(data.data.sliders[0])
            setSmallSlider(data.data.smallSlider[0])
        })

    axios.get("http://192.168.10.33:8080/api/getMainGroups").then((data) => {
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
            </div >
            <div className="row" style={{boxShadow: "0px 0px 1px 1px #DEF"}}>
                <SecondMenu /> 
                <div className="categories">
                    {mainGroups}
                </div>
            </div>             
            {/* مراقبت سلامت فردی  */}
            {/* <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6>مراقبت سلامت فردي  </h6>
                </div>
                <div className="forTitleItem text-start">
                    <Link to="/"> <h6> مشاهده همه  </h6> </Link>
                </div>
            </div>

            <div className="fourColSide border-top">

                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}

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
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper text-center mx-2">
                    <SwiperSlide className="bg-light text-center">
                        <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                        <span className="buyLabel"> خرید </span>
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> <Counter /></div> : null}
                        <Link to="/"><img className="fourColSliderImg" alt="مراقبت سلامت فردی" src={category} /> </Link>

                        <div className="bottomPart">
                            <span className="bottommPartItem">
                                <p>  </p>
                                <span className="takhfif-round"> 5% </span>
                            </span>
                            <span className="bottommPartItem">
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </span>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="bg-light text-center">
                        <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                        <span className="buyLabel"> خرید </span>
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> <Counter /></div> : null}
                        <Link to="/"><img className="fourColSliderImg" alt="مراقبت سلامت فردی" src={category} /> </Link>

                        <div className="bottomPart">
                            <span className="bottommPartItem">
                                <p>  </p>
                                <span className="takhfif-round"> 5% </span>
                            </span>
                            <span className="bottommPartItem">
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-light text-center">
                        <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                        <span className="buyLabel"> خرید </span>
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> <Counter /></div> : null}
                        <Link to="/"><img className="fourColSliderImg" alt="مراقبت سلامت فردی" src={category} /> </Link>
                        <div className="bottomPart">
                            <span className="bottommPartItem">
                                <p>  </p>
                                <span className="takhfif-round"> 5% </span>
                            </span>
                            <span className="bottommPartItem">
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-light text-center">
                        <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                        <span className="buyLabel"> خرید </span>
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> <Counter /></div> : null}
                        <Link to="/"><img className="fourColSliderImg" alt="مراقبت سلامت فردی" src={category} /> </Link>
                        <div className="bottomPart">
                            <span className="bottommPartItem">
                                <p>  </p>
                                <span className="takhfif-round"> 5% </span>
                            </span>
                            <span className="bottommPartItem">
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-light text-center">
                        <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                        <span className="buyLabel"> خرید </span>
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> <Counter /></div> : null}
                        <Link to="/"><img className="fourColSliderImg" alt="مراقبت سلامت فردی" src={category} /> </Link>
                        <div className="bottomPart">
                            <span className="bottommPartItem">
                                <p>  </p>
                                <span className="takhfif-round"> 5% </span>
                            </span>
                            <span className="bottommPartItem">
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </span>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>



            {/* جدیدترین کالا ها  

            <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6> جدید ترین کالاها </h6>
                </div>
                <div className="forTitleItem text-start">
                    <Link to="/"> <h6> مشاهده همه  </h6> </Link>
                </div>
            </div>

            <div className="fourColSide border-top">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}

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
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper text-center mx-2">
                    <SwiperSlide className="bg-light text-center">
                        <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                        <span className="buyLabel"> خرید </span>
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> <Counter /></div> : null}
                        <Link to="/"><img className="fourColSliderImg" alt="مراقبت سلامت فردی" src={category} /> </Link>
                        <div className="bottomPart">
                            <span className="bottommPartItem">
                                <p>  </p>
                                <span className="takhfif-round"> 5% </span>
                            </span>
                            <span className="bottommPartItem">
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-light text-center">
                        <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                        <span className="buyLabel"> خرید </span>
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> <Counter /></div> : null}
                        <Link to="/"><img className="fourColSliderImg" alt="مراقبت سلامت فردی" src={category} /> </Link>
                        <div className="bottomPart">
                            <span className="bottommPartItem">
                                <p>  </p>
                                <span className="takhfif-round"> 5% </span>
                            </span>
                            <span className="bottommPartItem">
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-light text-center">
                        <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                        <span className="buyLabel"> خرید </span>
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> <Counter /></div> : null}
                        <Link to="/"><img className="fourColSliderImg" alt="مراقبت سلامت فردی" src={category} /> </Link>
                        <div className="bottomPart">
                            <span className="bottommPartItem">
                                <p>  </p>
                                <span className="takhfif-round"> 5% </span>
                            </span>
                            <span className="bottommPartItem">
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-light text-center">
                        <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                        <span className="buyLabel"> خرید </span>
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> <Counter /></div> : null}
                        <Link to="/"><img className="fourColSliderImg" alt="مراقبت سلامت فردی" src={category} /> </Link>
                        <div className="bottomPart">
                            <span className="bottommPartItem">
                                <p>  </p>
                                <span className="takhfif-round"> 5% </span>
                            </span>
                            <span className="bottommPartItem">
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-light text-center">
                        <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                        <span className="buyLabel"> خرید </span>
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> <Counter /></div> : null}
                        <Link to="/"><img className="fourColSliderImg" alt="مراقبت سلامت فردی" src={category} /> </Link>

                        <div className="bottomPart">
                            <span className="bottommPartItem">
                                <p>  </p>
                                <span className="takhfif-round"> 5% </span>
                            </span>
                            <span className="bottommPartItem">
                                <p className="price" style={{ color: "#ff2c50" }}> <del > 19, 500 تومان </del> </p>
                                <p className="price" style={{ color: "#39ae00" }}>29,200 تومان </p>
                            </span>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div> */}


            {/* برندها  

            <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6> برندها </h6>
                </div>
                <div className="forTitleItem text-start">
                    <Link to="/"> <h6> مشاهده همه  </h6> </Link>
                </div>
            </div>

            <div className="fourColSide border-top">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}

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
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper text-center mx-2">
                    <SwiperSlide className="brandDiv text-center">
                        <Link to="/" className="brandImageAnchor"><img className="brandImage" alt="مراقبت سلامت فردی" src={brand} /> </Link>
                    </SwiperSlide>
                    <SwiperSlide className="brandDiv text-center">
                        <Link to="/" className="brandImageAnchor"><img className="brandImage" alt="مراقبت سلامت فردی" src={brand} /> </Link>
                    </SwiperSlide>
                    <SwiperSlide className="brandDiv text-center">
                        <Link to="/" className="brandImageAnchor"><img className="brandImage" alt="مراقبت سلامت فردی" src={brand} /> </Link>
                    </SwiperSlide>
                    <SwiperSlide className="brandDiv text-center">
                        <Link to="/" className="brandImageAnchor"><img className="brandImage" alt="مراقبت سلامت فردی" src={brand} /> </Link>
                    </SwiperSlide>
                    <SwiperSlide className="brandDiv text-center">
                        <Link to="/" className="brandImageAnchor"><img className="brandImage" alt="مراقبت سلامت فردی" src={brand} /> </Link>
                    </SwiperSlide>
                    <SwiperSlide className="brandDiv text-center">
                        <Link to="/" className="brandImageAnchor"><img className="brandImage" alt="مراقبت سلامت فردی" src={brand} /> </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
            */}

            <div className="row my-5 p-2 text-center">
                <img className="fourColSliderImg" alt="تماس با ما" src={contactImage} />
            </div>

            <div className="flex-enamad">
                <div className="enamadItem">
                    <Link referrerPolicy="origin" to="https://trustseal.enamad.ir/?id=220841&amp;code=dgsiolxgvdofskzzy34r">
                        <img referrerPolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=220841&amp;Code=dGSIolXgVdoFskzzY34R"
                            alt="" style={{ cursor: "pointer" }} id="dGSIolXgVdoFskzzY34R" />
                    </Link>
                    <img referrerPolicy='origin' id='nbqewlaosizpjzpefukzrgvj'
                        style={{ cursor: "pointer" }} onClick='window.open("https://logo.samandehi.ir/Verify.aspx?id=249763&p=uiwkaodspfvljyoegvkaxlao",
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