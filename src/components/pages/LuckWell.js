import React, { useState } from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { useEffect } from "react";
import axios from "axios"
import LuckyCode from "./LuckyCode";
export default function LuckyWheel() {
    const [showWhell, setWheel] = useState(false)
    const [emtiyaz, setEmtiyaz] = useState(0)
    const [lotteryMinBonus, setLotteryMinBonus] = useState(0)

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop">
                <div className="row text-center">
                    <div className="col-lg-12 text-center">
                        <div className="five-pointed-star">
                            <span className="starContent">  امتیاز شما {emtiyaz} </span>
                        </div>
                        <div className="row mt-2">
                            <div className="col-lg-12 text-end p-2">
                                <div className="useStar">
                                    <ol className="list-group list-group-numbered pe-1">
                                        <li className="list-group-item"> استفاده از گردونه شانس {lotteryMinBonus} امتیاز <button id="useLuckyWheel" onClick={() => setWheel(!showWhell)} className="btn btn-sm btn-primary float-start p-1" > استفاده می کنم  </button> </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <LuckyCode />

                <div className="lotteryInformation my-5 text-center">
                    <div className="lotteryDesc">
                        <ul className="lists p-2">
                            <li className="itemList"> وقتی امتیاز شما بالای  شد چرخش فعال میگردد</li>
                            <li className="itemList"> روی دکمه چرخش کلید نماید.</li>
                            <li className="itemList"> هر  امتیاز یک شانس</li>
                            <li className="itemList"> شانش خویش را بیازمایید. </li>
                            <li className="itemList"> جایزه خویش را دریافت نمایید </li>
                        </ul>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

