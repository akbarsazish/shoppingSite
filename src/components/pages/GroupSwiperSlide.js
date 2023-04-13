import { React,useState } from "react";
import {SwiperSlide } from "swiper/react";
import {Link} from "react-router-dom"
export default function GroupSwiperSlide(props) {
    return (<SwiperSlide>
                <Link to="/" className="topSliderLink">
                    <img className="topSliderImg" alt="slider"/>
                    <p className="topSliderTile"> {props.title} </p>
                </Link>
            </SwiperSlide>);
}