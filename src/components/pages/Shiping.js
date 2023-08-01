import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faIdCard, faMoon, faSun, faTruck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default function Shiping(props) {
    const[weekDay1,setWeekDay1]=useState(0)
    const[weekDay2,setWeekDay2]=useState(0)
    const[tomorrowDate,setTomorrowDate]=useState(0)
    const[afteromorrowDate,setAfterTomorrowDate]=useState(0)
    const[moorningTimeContent,setMoorningTimeContent]=useState(0)
    const[afternoonTimeContent,setaAternoonTimeContent]=useState(0)
    const[defaultAddress,setDefaultAddress]=useState(0)
    const[otherAddresses,setOtherAddresses]=useState('')
    const[factorDay,setFactorDay]=useState(false)
    const[payType,setpayType]=useState("");

    const[selectdFactorDate,setSelectedFactorDate]=useState(0)
    const[selectdAddress,setSelectedAddress]=useState(defaultAddress)
    const[selectdPayType,setSelectedPayType]=useState(0)
     const[allMoney,setAllMoney]=useState(localStorage.getItem("allMoney"))
    // const[allProfit,setAllProfit]=useState(localStorage.getItem("allProfit"))
    const[takhfifCase,setTakhfifCase]=useState(0)

    useEffect(() => {
        axios.get("https://s.starfoods.ir/api/shippingData",{params:{psn:localStorage.getItem("psn")}})
        .then((data) => {
            setTakhfifCase(data.data.takhfifCase)
            setWeekDay1(data.data.date1);
            setWeekDay2(data.data.date2);
            setTomorrowDate(data.data.tomorrowDate);
            setAfterTomorrowDate(data.data.afterTomorrowDate);
            setMoorningTimeContent(data.data.setting.moorningTimeContent);
            setaAternoonTimeContent(data.data.setting.afternoonTimeContent);
            setDefaultAddress(data.data.customer.peopeladdress)
            setSelectedAddress(0+'_'+data.data.customer.peopeladdress)
            setOtherAddresses(data.data.addresses.map((element)=><option value={element.AddressPeopel+'_'+element.SnPeopelAddress}>{element.AddressPeopel}</option>))
        })
    },[])

    const checkSelectedFactorDay=(factorDay)=>{
        if(!factorDay){
alert("لطفا تاریخ فاکتور را انتخاب کنید.")
        }
    }
    const addFactorToSefarish=()=>{
axios.get("https://s.starfoods.ir/api/addFactorApi",{params:{
    pardakhtType:selectdPayType,
    recivedTime:selectdFactorDate,
    customerAddress:selectdAddress,
    psn:localStorage.getItem("psn"),
    allMoney:allMoney}
}).then((data)=>{
window.location.href = '/success'
})    }

if(localStorage.getItem("isLogedIn")){
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop">
                <div className="shipigContainer">
                    <div className="shippingPart">
                        <div className="row">
                            <div className="col-2">
                                <p className="weekDay"> {weekDay1}  </p>
                            </div>
                            <div className="col-10">
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                        {moorningTimeContent} &nbsp; <FontAwesomeIcon style={{ color: "orange", fontSize: "18px" }} icon={faSun} />
                                        <input className="form-check-input float-end mx-3 customRadio" value={tomorrowDate} onChange={(e)=>{setFactorDay(true);setSelectedFactorDate("1,"+e.target.value)}} type="radio" name="factorDay" id="flexRadioDefault1" />
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                       {afternoonTimeContent} &nbsp; <FontAwesomeIcon style={{ color: "green", fontSize: "18px" }} icon={faMoon} />
                                        <input className="form-check-input float-end mx-3 customRadio" value={tomorrowDate} onChange={(e)=>{setFactorDay(true);setSelectedFactorDate("2,"+e.target.value)}}  type="radio" name="factorDay" id="flexRadioDefault1" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shippingPart">
                        <div className="row">
                            <div className="col-2">
                                <p className="weekDay"> {weekDay2}  </p>
                            </div>
                            <div className="col-10">
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                    {moorningTimeContent}  &nbsp; <FontAwesomeIcon style={{ color: "orange", fontSize: "18px" }} icon={faSun} />
                                        <input className="form-check-input float-end mx-3 customRadio" value={afteromorrowDate} onChange={(e)=>{setFactorDay(true);setSelectedFactorDate("2,"+e.target.value)}} type="radio" name="factorDay" id="flexRadioDefault1" />
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                    {afternoonTimeContent} &nbsp; <FontAwesomeIcon style={{ color: "green", marginTop: "5px", fontSize: "18px" }} icon={faMoon} />
                                        <input className="form-check-input float-end mx-3 customRadio" value={afteromorrowDate} onChange={(e)=>{setFactorDay(true);setSelectedFactorDate("2,"+e.target.value)}} type="radio" name="factorDay" id="flexRadioDefault1" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shipigContainer">
                    <div className="shippingPart">
                        <div className="row">
                            <div className="col-4">
                                <p className="weekDay">   تاریخ دلخواه   </p>
                            </div>
                            <div className="col-8">
                                <input className="form-control form-control-sm mt-2 mt-0" type="text" aria-label=".form-control-sm example" />
                            </div>
                        </div>
                    </div>
                    <div className="shippingPart">
                        <div className="row">
                            <div className="col-4">
                                <p className="weekDay">  انتخاب آدرس </p>
                            </div>
                            <div className="col-8">
                                <select className="form-select form-select-sm mt-2" onChange={(e)=>setSelectedAddress(e.target.value)} style={{ width: "195px" }} aria-label=".form-select-sm example">
                                    <option selected value={0+'_'+defaultAddress} className="text-end">  {defaultAddress}  </option>
                                    {otherAddresses}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shipingBottom">
                    <div className="shippingPartBottom">
                        <p className="weekDay"> انتخاب پرداخت </p>
                    </div>
                    <div className="shippingPartBottom mt-2">
                        <div className="form-check">
                            <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                <input className="form-check-input float-end mx-1 mt-2 customRadio" onChange={()=>{checkSelectedFactorDay(factorDay);setpayType("hozori");setSelectedPayType("hozori")}} type="radio" name="payTypeRadio" id="flexRadioDefault1" />
                                حضوری  <FontAwesomeIcon style={{ color: "green", marginTop: "5px", fontSize: "18px" }} icon={faTruck} />
                            </label>
                        </div>
                    </div>
                    <div className="shippingPartBottom">
                        <div className="form-check mt-2">
                            <label className="form-check-label text-start timeLabel" for="">
                                <input className="form-check-input float-end mx-1 mt-2 customRadio" onChange={()=>{checkSelectedFactorDay(factorDay);setpayType("online")}} type="radio" name="payTypeRadio" id="flexRadioDefault1" />
                                غیر حضوری  <FontAwesomeIcon style={{ color: "green", marginTop: "5px", fontSize: "18px" }} icon={faIdCard} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="shipingBottom">
                    <div className="shippingPartBottom">
                        <p className="factorInfo"> قیمت کالا () </p>
                        <p className="factorInfo"> کیف تخفیف </p>
                        <p className="factorInfo"> تخفیف کالا ها </p>
                        <p className="factorInfo"> مبلغ قابل پرداخت</p>
                    </div>
                    <div className="shippingPartBottom mt-2">
                        <p className="factorInfo"> {parseInt(parseInt(localStorage.getItem('allMoney'))+parseInt(localStorage.getItem('allProfit'))).toLocaleString("fa-IR")} تومان </p>
                        <p className="factorInfo"> {parseInt(takhfifCase).toLocaleString("fa-IR")} تومان  </p>
                        <p className="factorInfo text-danger"> {parseInt(localStorage.getItem('allProfit')).toLocaleString("fa-IR")} تومان  </p>
                        <p className="factorInfo"> {parseInt(localStorage.getItem('allMoney')).toLocaleString("fa-IR")} تومان  </p>
                    </div>
                    <div className="shippingPartBottom">
                       {(payType==="hozori" && factorDay) ? (
                       <button type="button" className="btn btn-sm btn-danger mt-3 p-2 continueBtn" onClick={()=>addFactorToSefarish()} > <FontAwesomeIcon icon={faCheckCircle} /> ارسال فاکتور</button>
                       )
                       :((payType==="online" && factorDay)?
                        <Link  to="/payOnline"><button type="button" className="btn btn-sm btn-danger mt-3 p-2 continueBtn"> <FontAwesomeIcon icon={faCheckCircle} /> ارسال فاکتور</button> </Link>
                       :<Link  to="#"><button type="button" className="btn btn-sm btn-danger mt-3 p-2 continueBtn" onClick={()=>alert("تاریخ و نوعیت پرداخت را انتخاب کنید.")} > <FontAwesomeIcon icon={faCheckCircle} /> ارسال فاکتور</button> </Link>
                        )
                       }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
    }else{
        window.location.href="/login"
    }
}
