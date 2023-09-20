import React, {useState, memo} from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import category from "../../assets/images/category.jpg";

const  MoragebatFardi = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
         {/* مراقبت سلامت فردی  */}
           <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6> مراقبت سلامت فردی </h6>
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
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> +  </div> : null}
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
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> + </div> : null}
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
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> + </div> : null}
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
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> + </div> : null}
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
                        {showModal ? <div className='smallModalTobuy' id="preBuyFromHome"> + </div> : null}
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
        </>
    )
}

export default memo(MoragebatFardi);