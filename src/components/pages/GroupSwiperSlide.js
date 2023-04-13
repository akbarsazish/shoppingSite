import { React,useState } from "react";
export default function GroupSwiperSlide(props) {
    return (<><SwiperSlide>
                <Link to="/" className="topSliderLink">
                    <img className="topSliderImg" src={indianRice} alt="slider " />
                    <p className="topSliderTile"> {props.title} </p>
                </Link>
            </SwiperSlide>
            </>)
}