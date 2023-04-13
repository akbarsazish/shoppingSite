
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import indianRice from "../../assets/images/indianRice.jpg"
import { Link } from "react-router-dom"
import Header from "../genrealComponent/Header"
import Sidebar from "../genrealComponent/Sidebar"
import { changeHeartIconColor } from "./Utils"

export default function DescKala() {
    const [byModal, setByModal] = useState(false);
    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop mb-5">
                <div className="kalaDescibe mt-2 p-2">
                    <div className="kalaImg">
                        <FontAwesomeIcon className={`descKalaIcon + ${isActive ? 'defaultHeartColor' : ''}`} icon={faHeart} onClick={() => changeHeartIconColor(setIsActive, isActive)}  ></FontAwesomeIcon>
                        <img className="descKalaTakImg" src={indianRice} alt="descKala" />
                    </div>

                    <div className="kalaDescibtion">
                        <div className="descHeader">
                            <div className="desckTitle">
                                <span className="title" > <b> برنج هندي 1121 طبيعت :</b>  47,900 تومان </span>
                            </div>
                            <div className="desckBuyBtn text-start">
                                <button className="btn btn-sm btn-danger selectAmount" onClick={() => setByModal(!byModal)}> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                            </div>
                        </div>

                        <div className="desckalaBody">
                            <p className="title mt-2">  <b> گروه اصلی  :</b> برنج </p>
                            <p className="title">  <b> کد محصول :</b> 33 </p>
                            <p className="desciption">
                                برنج از محبوب‌ترين و رايج‌ترين غذاهاي کشور ايران است و طرفداران زيادي دارد. اين محصول در کشورهاي بسياري از سرتاسر جهان از جمله ايران، هندوستان، پاکستان، تايلند و… کشت مي شود. برنج طبيعت هم از گذشته تاکنون جزو محصولات وارداتي از کشور هند به ايران بوده و به علت قيمت مقطوع و مناسب، بازار فروش خوبي دارد. به طور کلي مي‌توان گفت که با وجود توليد برنج باکيفيت در کشور، همواره ايران از واردکنندگان اصلي برنج از کشورهاي ديگر به خصوص هند و پاکستان مي باشد. برنج به تنهايي پروتئين کمي دارد اما اسيد آمينه هاي ضروري موجود در آن باعث مي شود که در ترکيب با حبوبات پروتئين آن بسيار افزايش يابد و بنابراين براي رژيم غذايي گياه خواران مفيد خواهد بود. اخيرا محبوبيت برنج هاي هندي در ميان مردم بيشتر شده است چرا که عطر و طعم خوب اين برنج به همراه دانه هاي کشيده اش براي رستوران ها بسيار مناسب است. اين محصول در کيسه هاي 40 کيلويي جهت ارائه به بازار عرضه ميگردد.
                            </p>
                        </div> <hr></hr>


                        <h5 className="similarKalaTitle"> کالاهای مشابه </h5>
                        <div className="similarKala">

                            <div className="similarKalaImg ">
                                <Link to="#" className="similarImgLink">
                                    <img className="similarKalaImage" src={indianRice} alt="descKala" />
                                    <h6 className="similarKalaName"> برنج هندي 1121 خاطره </h6>
                                </Link>
                            </div>
                            <div className="similarKalaImg ">
                                <Link to="#" className="similarImgLink">
                                    <img className="similarKalaImage" src={indianRice} alt="descKala" />
                                    <h6 className="similarKalaName"> برنج هندي 1121 خاطره </h6>
                                </Link>
                            </div>
                            <div className="similarKalaImg ">
                                <Link to="#" className="similarImgLink">
                                    <img className="similarKalaImage" src={indianRice} alt="descKala" />
                                    <h6 className="similarKalaName"> برنج هندي 1121 خاطره </h6>
                                </Link>
                            </div>
                            <div className="similarKalaImg ">
                                <Link to="#" className="similarImgLink">
                                    <img className="similarKalaImage" src={indianRice} alt="descKala" />
                                    <h6 className="similarKalaName"> برنج هندي 1121 خاطره </h6>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}