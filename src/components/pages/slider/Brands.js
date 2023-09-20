
import React, {useState, memo} from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import brand from "../../../assets/images/brand.jpg";

const Brands = ()=>{

    return (
        <>
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
        </>
    )

}

export default memo (Brands)