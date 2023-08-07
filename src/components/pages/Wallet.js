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
    const baseUrl = "http://192.168.10.24:8080/api";
    const [yesNo, setYesNo] = useState(false);
    const [showQuestion, setShowQuestions] = useState(false);
    const [takhfifMoney,settakhfifMoney] = useState(0)
    const [firstQuestions,setFirstQuestions]=useState(0)
    const [secondQuestions,setSecondQuestions]=useState(0)
    const [thirdQuestions,setThirdQuestions]=useState(0)
    const [nazarId,sertNazarId]=useState(0);

    if (showQuestion) {
       let yesNoPart = document.getElementById("yesNoBtn");
           yesNoPart.style.display = 'none';
      }

    const [answers, setAnswer] = useState({
        answer1: '',
        answer2: '',
        answer3: '',
      });
    
    useEffect(()=>{
        axios.get(`${baseUrl}/wallet`,{params:{psn:localStorage.getItem("psn")}}).then((data)=>{
            settakhfifMoney(data.data.moneyTakhfif)
            setFirstQuestions(data.data.nazars[0].question1)
            setSecondQuestions(data.data.nazars[0].question2)
            setThirdQuestions(data.data.nazars[0].question3)
            sertNazarId(data.data.nazars[0].id)
        })
    },[]);

    const handleAnswerChange = (event) => {
        const { name, value } = event.target;
        setAnswer((prevAnswer) => ({ ...prevAnswer, [name]: value }));
      };

    const handleSubmit = (event) => {
        console.log(JSON.stringify(answers))
        event.preventDefault();
        fetch(`${baseUrl}/addMoneyToCase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers),
        })
        .then((response) => response.json())
           .then((data) => {
            console.log('Response from server:', data);
      })
        .catch((error) => {
            console.error('Error:', error);
        });
      };

    if(localStorage.getItem("isLogedIn")){
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
                                <Link type="button" onClick={() => setShowQuestions(!showQuestion)} id="yesBtn" className="btn btn-sm btn-success" > بلی <FontAwesomeIcon icon={faCheckCircle} /> </Link> &nbsp;
                                <Link to="/" type="button" className="btn btn-sm btn-danger"> خیر <FontAwesomeIcon icon={faXmarkCircle} /> </Link>
                            </div> : ""}
                        </div>
                    </div >

                    {showQuestion ? <div className="row rounded-3 mt-3" id="questionPart">
                        <div div className="col-lg-12 p-2" >
                            <ul className="list-group  pe-1">
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="nazarId" value={nazarId} />
                                <li className="list-group-item question">
                                    <div className="mb-3">
                                        <label for="question-text-area" className="form-label"> <b> سوال اول : {firstQuestions}</b></label>
                                        <textarea value={answers.answer1} onChange={handleAnswerChange} className="form-control" name="answer1" required id="question-text-area" minlength="15" rows="3"></textarea>
                                    </div>
                                </li>
                                <li className="list-group-item question">
                                    <div className="mb-3">
                                        <label for="question-text-area" className="form-label"> <b> سوال دوم : {secondQuestions}</b></label>
                                        <textarea value={answers.answer2} onChange={handleAnswerChange} className="form-control" name="answer2" required id="question-text-area" minlength="15" rows="3"></textarea>
                                    </div>
                                </li>
                                <li className="list-group-item question">
                                    <div className="mb-3">
                                        <label for="question-text-area" className="form-label"> <b> سوال سوم: {thirdQuestions}</b></label>
                                        <textarea value={answers.answer3} onChange={handleAnswerChange} className="form-control" name="answer3" required id="question-text-area" minlength="15" rows="3"></textarea>
                                    </div>
                                </li>
                                <span className="list-group-item question textn-end">
                                    <input type="hidden" name="takhfif" value="" />
                                    <button className="walletbutton" type="submit"> ارسال </button>
                                </span>
                             </form>
                            </ul>
                        </div >
                    </div > : ""
                    }
                </div >
                <Footer />
            </>
        )
    }else{
        window.location.href="/login"
    }
}