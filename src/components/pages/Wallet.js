import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";

export default function Wallet() {
    const [yesNo, setYesNo] = useState(false);
    const [questions, setQuestions] = useState(false);
    const [takhfifMoney,settakhfifMoney] = useState(0)
    const [firstQuestions,setFirstQuestions]=useState(0)
    const [secondQuestions,setSecondQuestions]=useState(0)
    const [thirdQuestions,setThirdQuestions]=useState(0)
    const [nazarId,sertNazarId]=useState(0)
    
    useEffect(()=>{
        axios.get("http://192.168.10.27:8080/api/wallet").then((data)=>{
            settakhfifMoney(data.data.moneyTakhfif)
            setFirstQuestions(data.data.nazars[0].question1)
            setSecondQuestions(data.data.nazars[0].question2)
            setThirdQuestions(data.data.nazars[0].question3)
            sertNazarId(data.data.nazars[0].id)
        })
    },[])
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop">

                <div className="row text-center">
                    <div className="col-lg-12">
                        <div className="mywalet mt-3">
                            <span className="walletContent"> {takhfifMoney} ریال </span>
                        </div>
                        <div className="labelContent">
                            موجودی شما
                        </div>

                        <div className="mt-4 p-4" id="useWallet" style={{ boxShadow: "0 2px 4px 0 #f50303cc", borderRadius: "5px" }}>
                            <p className="explain"> استفاده از کیف پول منوط به پرداخت آنلاین می باشد. </p>
                            <Link type="button" onClick={() => setYesNo(!yesNo)} className="btn btn-sm btn-success" > استفاده از کیف پول <FontAwesomeIcon icon={faCheckCircle} /> </Link>
                        </div>

                        {yesNo ? <div className="walletGuid mt-3 p-4" id="yesNoBtn" style={{ fontSize: "16px", boxShadow: "0 2px 4px 0 #f50303cc", borderRadius: "5px" }}>
                            <p className="explain">
                                برای استفاده از کیف پول در نظر سنجی ما شرکت نمایید!
                            </p>
                            <Link type="button" onClick={() => setQuestions(!questions)} id="yesBtn" className="btn btn-sm btn-success" > بلی <FontAwesomeIcon icon={faCheckCircle} /> </Link> &nbsp;
                            <Link to="/" type="button" className="btn btn-sm btn-danger"> خیر <FontAwesomeIcon icon={faXmarkCircle} /> </Link>
                        </div> : ""}
                    </div>
                </div >

                {questions ? <div className="row rounded-3 mt-3" id="questionPart">
                    <div div className="col-lg-12 p-2" >
                        <ul className="list-group  pe-1">
                            <input type="hidden" name="nazarId" value={nazarId} />
                            <li className="list-group-item question">
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label"> <b> سوال اول : {firstQuestions}</b></label>
                                    <textarea className="form-control" name="answer2" required id="exampleFormControlTextarea1" minlength="15" rows="3"></textarea>
                                </div>
                            </li>
                            <li className="list-group-item question">
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label"> <b> سوال دوم : {secondQuestions}</b></label>
                                    <textarea className="form-control" name="answer2" required id="exampleFormControlTextarea1" minlength="15" rows="3"></textarea>
                                </div>
                            </li>
                            <li className="list-group-item question">
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label"> <b> سوال سوم: {thirdQuestions}</b></label>
                                    <textarea className="form-control" name="answer3" required id="exampleFormControlTextarea1" minlength="15" rows="3"></textarea>
                                </div>
                            </li>
                            <span className="list-group-item question textn-end">
                                <input type="hidden" name="takhfif" value="" />
                                <button className="walletbutton" type="submit"> ارسال </button>
                            </span>
                        </ul>
                    </div >
                </div > : ""
                }

            </div >
            <Footer />
        </>
    )
}