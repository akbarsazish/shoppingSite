import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';
import yourStar from '../../assets/images/siteImage/your-star.png'

export default function Instruction(props) {
  return (
    <>
      <div className="container marginTop">
        <div className="instruction-container">
            <h5> شیوه‌ی کسب ستاره از هرکدام از این فعالیت‌ها به شرح زیر است </h5>
            <div className="instruction-item">
                <h6 className="instruction-description"> 
                <FontAwesomeIcon className="text-danger ms-2" icon={faSquareCaretLeft} />   خرید از استار فود </h6>
                 <p className="instruction-details">
                 با هر خریدی که از استار فود انجام می‌دهید، به ازای مبلغ و اقلام خریداری شده، ستاره دریافت می‌کنید.
                 </p>

                <h6 className="instruction-description"> 
                <FontAwesomeIcon className="text-danger ms-2" icon={faSquareCaretLeft} />  شرکت در ستاره استار فود </h6>
                 <p className="instruction-details">
                 برای دریافت تعداد بیشتری ستاره، به مدت 7 روز متوالی در استار فود فعالیت کنید و سر بزنید.
                 </p>

                <h6 className="instruction-description"> 
                <FontAwesomeIcon className="text-danger ms-2" icon={faSquareCaretLeft} /> استفاده از ستاره استار فود </h6>
                 <p className="instruction-details">
                 با جمع آوری هر 500 ستاره، شما در قرعه‌کشی لاتاری شرکت می‌کنید و جوایز خود را با اولین خرید خود دریافت می‌کنید.
                 </p>
                 <p className="instruction-details">
                 از این مکانیزم استاره در استار فود بهره‌برداری کنید تا با خرید، شرکت مداوم و جمع آوری ستاره‌ها، به جوایز و مزایای منحصر به فرد دست پیدا کنید.
                 </p>
            </div>
            <div className="your-star p-2">
                <img src={yourStar} alt="star" className="star-img"/>
                <div className="your-star-text" id="allBonusDiv"> {props.mybonus}<br /> ستاره شما  </div>
            </div>
            <hr />
        </div>
      </div>
    </>
  )
}