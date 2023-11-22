import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faIdCard, faMoon, faSun, faTruck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {JBDateInput} from 'jb-date-input-react';
import Swal from 'sweetalert2';

export default function Shiping(props) {
    let now = new Date();
    const currentHour = now.getHours();
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
    const[isUsedTakhfifCode,setTakhfifCode]=useState(0)
    const[selectdFactorDate,setSelectedFactorDate]=useState(0)
    const[selectdAddress,setSelectedAddress]=useState(defaultAddress)
    const[selectdPayType,setSelectedPayType]=useState(0)
    const[allMoney,setAllMoney]=useState(localStorage.getItem("allMoney"))
    const[allProfit, setAllProfit]=useState(localStorage.getItem("allProfit"))
    const[takhfifCase,setTakhfifCase]=useState(0)
    const[sendFast,setFastFactor]=useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    const[payUrl, setPayUrl] = useState('');
    const changePayMoneyAndTakhfif=()=>{
        let element =document.getElementById("takhfifSwitch");
        if(isUsedTakhfifCode !==1){
            if(element.checked){
                setAllMoney(allMoney - takhfifCase)
            }else{
                setAllMoney(allMoney + takhfifCase)
            }
        }else{
            Swal.fire("استفاده همزمان از کد تخفیف و کیف تخفیف ممکن نیست.");
            element.checked=false;
        }
    }

    useEffect(() => {
        axios.get("https://starfoods.ir/api/shippingData",{
         params:{psn:localStorage.getItem("psn")}})
        .then((data) =>{
            setTakhfifCase(data.data.takhfifCase/10);
            setWeekDay1(data.data.date1);
            setWeekDay2(data.data.date2);
            setTomorrowDate(data.data.tomorrowDate);
            setAfterTomorrowDate(data.data.afterTomorrowDate);
            setMoorningTimeContent(data.data.setting.moorningTimeContent);
            setaAternoonTimeContent(data.data.setting.afternoonTimeContent);
            setDefaultAddress(data.data.customer.peopeladdress);
            setSelectedAddress(0+'_'+data.data.customer.peopeladdress);
            setOtherAddresses(data.data.addresses.map((element)=> <option value={parseInt(element.SnPeopelAddress) +'_'+ element.AddressPeopel}> {element.AddressPeopel} </option> ))
            // used for takhfifcode updating
        })
    },[]);

    

    useEffect(() => {
        axios.get('https://starfoods.ir/api/getPaymentFormApi', {
          params: { psn: localStorage.getItem("psn"),allMoney:allMoney }
          }).then((data) => {
            setPayUrl(data.data)
        });
      }, []);

      let payOnline=document.getElementById("payOnline");
      let payHozori=document.getElementById("payHozori");
      let fastErsalRadio=document.getElementById("fastErsalRadio");
      
      let fastErsal = () => {
        checkSelectedFactorDay(factorDay);
        setpayType("online");
        sendOnlinePayStuff(); 
        payOnline.checked = true;
        payHozori.checked = false;
      }
      
      let payHozoriFun = () => {
        fastErsalRadio.checked=false
        setIsButtonDisabled(false);
        payHozori.checked = true;
      }

    const checkSelectedFactorDay=(factorDay)=>{
        if(!factorDay && payType ==="hozori"){
          Swal.fire("لطفا تاریخ فاکتور را انتخاب کنید.");
        }
     }

    const sendOnlinePayStuff=()=>{
        let takhfifCode="";
        if(isUsedTakhfifCode === 1){
            takhfifCode=localStorage.getItem("takhfifCode");
        }
        
        localStorage.setItem("recivedTime", selectdFactorDate);
        localStorage.setItem("takhfif", 0);
        localStorage.setItem("takhfifCode", takhfifCode);
        localStorage.setItem("receviedAddress", selectdAddress);
        setIsButtonDisabled(false);
    }

    const addFactorToSefarish=()=>{
        if(selectdPayType,selectdFactorDate,selectdAddress,allMoney){
            axios.get("https://starfoods.ir/api/addFactorApi",{params:{
            pardakhtType:selectdPayType,
            recivedTime:selectdFactorDate,
            customerAddress:selectdAddress,
            psn:localStorage.getItem("psn"),
            allMoney:allMoney
        }}).then((data)=>{
            window.location.href = '/success'
        });
        }else{
            console.log("which one go empty", selectdPayType, +"1"+selectdFactorDate,  +"2"+ selectdAddress,  +"3"+ allMoney)
        }
   }


const calculateTakhfifCode=()=>{
    let element=document.getElementById("takhfifSwitch");
    if(element.checked){
        document.getElementById("errorContainer").textContent=" استفاده همزمان از کد تخفیف و کیف تخفیف ممکن نیست.";
    }else{
        axios.get("https://starfoods.ir/api/checkTakhfifCodeReliablity",
        {params:{
            psn:localStorage.getItem("psn"),
            code:localStorage.getItem("takhfifCode")
        }}).then((respond)=>{
            if(respond.data.takhfifCodeMoneyInToman===0){
                document.getElementById("errorContainer").textContent="کد تخفیف شما استفاده و یا اینکه موعدش گذشته است.";
            }else{
                document.getElementById("errorContainer").textContent="";
            }
            setTakhfifCode(1)
        })
    }
}

if(localStorage.getItem("isLogedIn")){
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop mb-4 p-3 rounded">
                <div className="shipigContainer">
                    <div className="shippingPart">
                        <div className="row">
                            <div className="col-2">
                                <p className="weekDay"> {weekDay1}  </p>
                            </div>
                            <div className="col-10">
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" htmlFor="dayOneMorining">
                                        {moorningTimeContent} &nbsp; <FontAwesomeIcon style={{ color:"orange", fontSize:"18px"}} icon={faSun} />
                                        <input className="form-check-input float-end mx-3 customRadio" value={tomorrowDate} 
                                        onChange={(e)=>{setFactorDay(true);setSelectedFactorDate("1,"+e.target.value); setFastFactor(0);}} 
                                        type="radio" name="factorDay" id="dayOneMorining" />
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" htmlFor="flexRadioDefault1">
                                       {afternoonTimeContent} &nbsp; <FontAwesomeIcon style={{ color: "green", fontSize:"18px"}} icon={faMoon} />
                                        <input className="form-check-input float-end mx-3 customRadio" value={tomorrowDate} 
                                        onChange={(e)=>{setFactorDay(true);setSelectedFactorDate("2,"+e.target.value); setFastFactor(0);}}  
                                        type="radio" name="factorDay" id="flexRadioDefault1" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shippingPart">
                        <div className="row">
                            <div className="col-lg-2 col-2">
                                <p className="weekDay"> {weekDay2}  </p>
                            </div>
                            <div className="col-lg-10 col-10">
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" htmlFor="flexRadioDefault1">
                                       {moorningTimeContent} &nbsp; <FontAwesomeIcon style={{ color: "orange", fontSize: "18px"}} icon={faSun} />
                                        <input className="form-check-input float-end mx-3 customRadio" value={afteromorrowDate} 
                                        onChange={(e)=>{setFactorDay(true);setSelectedFactorDate("1,"+e.target.value); setFastFactor(0);}} 
                                        type="radio" name="factorDay" id="flexRadioDefault1" />
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" htmlFor="flexRadioDefault1">
                                       {afternoonTimeContent} &nbsp; <FontAwesomeIcon style={{ color: "green", marginTop: "5px", fontSize: "18px" }} icon={faMoon} />
                                        <input className="form-check-input float-end mx-3 customRadio" value={afteromorrowDate} 
                                        onChange={(e)=>{setFactorDay(true);setSelectedFactorDate("2,"+e.target.value); setFastFactor(0);}} 
                                        type="radio" name="factorDay"  />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                {(currentHour >= 7 && currentHour < 19)?
                    <div className="shippingPart">
                        <div className="row w-100">
                            <div className="col-2">
                                <p className="weekDay"> ارسال سریع  </p>
                            </div>
                            <div className="col-10 px-0 pt-2">
                                <div className="form-check px-0">
                                    <label className="form-check-label text-start timeLabel" htmlFor="fastErsalRadio">
                                      <input className="form-check-input float-end mx-3 customRadio" id="fastErsalRadio" value={afteromorrowDate} 
                                      onChange={(e)=>{setFactorDay(true);setSelectedFactorDate("2,"+e.target.value); setFastFactor(1); fastErsal();}} 
                                      type="radio" name="factorDay"/>
                                      {sendFast ?  <p id="fastSendText" style={{display:"inline"}}>هزینه حمل در زمان هماهنگی اعلان می شود.</p> : ""}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    : "" }
                </div>

                <div className="shipigContainer">
                    <div className="shippingPart">
                        <div className="row w-100">
                            <div className="col-lg-3 col-4">
                                <p className="weekDay"> تاریخ دلخواه </p>
                            </div>
                            <div className="col-lg-5 col-8 pe-0">
                               <div className="date-picker"> 
                                <JBDateInput id="date" calendarDefaultDateView={{dateString}} min={dateString} value=""> </JBDateInput>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="shippingPart">
                        <div className="row w-100">
                            <div className="col-4">
                                <p className="weekDay">  انتخاب آدرس </p>
                            </div>
                            <div className="col-8">
                                <select className="form-select form-select-sm mt-2"
                                  onChange={(e)=>setSelectedAddress(e.target.value)} style={{ width: "195px" }}
                                  aria-label=".form-select-sm example">
                                    <option value={0+'_'+defaultAddress} className="text-end">  {defaultAddress}  </option>
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
                            <label className="form-check-label text-start timeLabel" htmlFor="payHozori">
                                <input className="form-check-input float-end mx-1 mt-2 customRadio"
                                onChange={()=>{checkSelectedFactorDay(factorDay); setpayType("hozori"); setSelectedPayType("hozori"); payHozoriFun()}}
                                type="radio" name="payTypeRadio" id="payHozori" />
                                حضوری  <FontAwesomeIcon style={{ color: "red", marginTop: "5px", fontSize: "18px" }} icon={faTruck} />
                            </label>
                        </div>
                    </div>
                    <div className="shippingPartBottom">
                        <div className="form-check mt-2">
                            <label className="form-check-label text-start timeLabel" htmlFor="payOnline">
                                <input className="form-check-input float-end mx-1 mt-2 customRadio"
                                  onChange={()=>{checkSelectedFactorDay(factorDay);setpayType("online");sendOnlinePayStuff(); setSelectedPayType("online");}}
                                  type="radio" name="payTypeRadio" id="payOnline" />
                                  غیر حضوری  <FontAwesomeIcon style={{ color: "red", marginTop: "5px", fontSize: "18px" }} icon={faIdCard} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="shipingBottom">
                    <div className="shippingPartBottom">
                        <p className="factorInfo"> قیمت کالا  </p>
                        <p className="factorInfo"> کیف تخفیف </p>
                        <p className="factorInfo"> تخفیف کالا ها </p>
                        <p className="factorInfo"> مبلغ قابل پرداخت</p>
                        <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#takhfifCodeModal"> استفاده از کد تخفیف % </button>
                    </div>
                    <div className="shippingPartBottom mt-2">
                        <p className="factorInfo"> {parseInt(parseInt(allMoney) + parseInt(allProfit)).toLocaleString("fa-IR")} تومان </p>
                        <p className="factorInfo" style={{display:"inline"}}> {parseInt(takhfifCase).toLocaleString("fa-IR")} تومان  </p> 
                        <input className="takhfifKalaCheckbox" type="checkbox" onChange={()=>changePayMoneyAndTakhfif()} id="takhfifSwitch" />
                        <p className="factorInfo text-danger"> {parseInt(allProfit).toLocaleString("fa-IR")} تومان </p>
                        <p className="factorInfo"> {parseInt(allMoney).toLocaleString("fa-IR")} تومان </p>
                    </div>
                    
                    <div className="shippingPartBottom">
                       {(payType==="hozori" && factorDay) ? (
                           <button type="button" className="btn btn-sm btn-danger mt-3 hozori p-2 continueBtn" disabled={isButtonDisabled} onClick={()=>addFactorToSefarish()}> <FontAwesomeIcon icon={faCheckCircle} /> ارسال فاکتور </button>
                       )
                       :((payType==="online" && factorDay)?
                        <Link id="payOnlineForm" to={payUrl} target={"_blank"}>
                           <button type="button" className="btn btn-sm btn-danger mt-3 online p-2 continueBtn" disabled={isButtonDisabled}> <FontAwesomeIcon icon={faCheckCircle}/> ارسال فاکتور</button>
                        </Link>
                       :<Link to="#">
                           <button type="button" className="btn btn-sm btn-danger mt-3 nonofthem p-2 continueBtn" disabled={isButtonDisabled} onClick={()=>alert("تاریخ و نوعیت پرداخت را انتخاب کنید.")}> <FontAwesomeIcon icon={faCheckCircle} /> ارسال فاکتور</button>
                        </Link>
                        )
                       }
                    </div>
                </div>
                <div id="takhfifCodeModal" className="modal fade" role="dialog"  tabIndex="-1">
                    <div className="modal-dialog modal-dialog-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title text-center"> استفاده از کد تخفیف </h6>
                            </div>
                            <div className="modal-body">
                                <label className="form-label" htmlFor="takhfif-code">کد تخفیف</label>
                                <input type="text" value={localStorage.getItem("takhfifCode")} className="form-control" name="takhfifCode"></input>
                                <span id="errorContainer" style={{color:"red", fontSize:"1rem"}}></span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={()=>calculateTakhfifCode()} className="btn btn-sm btn-success float-end"> استفاده شود <i className="fa fa-repeat"></i></button>
                                <button type="button" className="btn btn-sm btn-danger float-end" data-bs-dismiss="modal"> انصراف <i className="fa fa-xmark"></i></button>
                            </div>
                        </div>
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
