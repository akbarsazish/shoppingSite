import { faEdit, faEye, faHeart, faHistory, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import Footer from "../genrealComponent/Footer";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Profile(props) {
    const [sendedFactors, setSendedFactors] = useState(0);  
    const [waitingOrders, setWaitingOrders] = useState(0);
    const [customerName, setCustomerName] = useState(0)
    const [introducerCode, setIntroducerCode] = useState(0)
    const [customerMobile, setCustomerMobile] = useState(0)
    const [customerPhone, setCustomerPhone] = useState(0);
   
    
    useEffect(() => {
        axios.get("https://starfoods.ir/api/profile",{
            params:{psn:localStorage.getItem("psn")},
            headers:props.headers
          
        }).then((data) => {
            setSendedFactors(data.data)
            setWaitingOrders(data.data)
            setCustomerName(data.data.profile.Name)
            setIntroducerCode(data.data.profile.selfIntroCode)
            setCustomerMobile((data.data.profile.PhoneStr.split("-"))[0])
            setCustomerPhone((data.data.profile.PhoneStr.split("-"))[1])
        });

    },[])


    if(localStorage.getItem("isLogedIn")){
        return (
            <>
                <Header />
                <Sidebar />
                <div className="container marginTop">
                    <div className="profile">
                        <div className="profileRightPart shadow card">
                            <div className="profileHeader text-center">
                                <img className="profilePic" alt="عکس یوزر" src={ profile } />
                                <p className="userName">  { customerName } </p>
                            </div> <br />
                            <div className="profileInfo border-top mx-2">
                                <div className="profileInfoItems">
                                    همراه: { customerMobile }
                                </div>
                                <div className="profileInfoItems">
                                    تلفن ثابت : { customerPhone }
                                </div>
                            </div>

                            <div className="profileInfo border-top mx-2">
                                <div className="profileInfoItems">
                                    شناس نامه
                                </div>
                                <div className="profileInfoItems">
                                    <Link className="editProfile" to={`/editProfile`}>  ویرایش <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> </Link>
                                </div>
                            </div>

                            <div className="profileFooter text-center">
                                <div className="profileItems">
                                    <Link to="/inviteCode" className="profileFooterIcon">  کد معرف: {introducerCode} <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> </Link>
                                </div>
                                <div className="profileItems">
                                    <Link className="profileFooterIcon" to="/returnedFactor">  فاکتورهای برگشتی  <FontAwesomeIcon icon={faHistory}></FontAwesomeIcon> </Link>
                                </div>
                                <div className="profileItems">
                                    <Link className="profileFooterIcon" to="/favorite">  علاقه مندیها  <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> </Link>
                                </div>
                            </div>
                        </div>
                        <div className="profileLeftPart card">
                                <span className="tableTitle">فاکتور های ارسال شده </span>
                            <table className="table table-bordered table-sm factorTable">
                                <thead className="tableHeader">
                                    <tr>
                                        <th> ردیف </th>
                                        <th>شماره </th>
                                        <th>تاریخ </th>
                                        <th>تاریخ تحویل </th>
                                        <th> مبلغ (تومان) </th>
                                        <th>  پرداخت </th>
                                        <th> جزئیات </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sendedFactors && sendedFactors.factors.map((element, index) =>(
                                        <tr>
                                            <th>{index + 1}</th>
                                            <td>{element.FactNo}</td>
                                            <td>{new Date(element.timestamp).toLocaleDateString('fa-IR-u-nu-latn')}</td>
                                            <td>{element.FactDate}</td>
                                            <td> {parseInt(element.TotalPriceHDS / 10).toLocaleString()} </td>
                                            <td> <Link to="/factorDetails" style={{textDecoration:'none'}} onClick={() => { localStorage.setItem("selectedHDS", element.SerialNoHDS) }} > پرداخت </Link> </td>
                                            <td> <Link to="/factorDetails" onClick={() => { localStorage.setItem("selectedHDS", element.SerialNoHDS) }} > <FontAwesomeIcon icon={faEye} />  </Link> </td>
                                        </tr>
                                     ))}
                                </tbody>
                            </table>

                            <h5 className="tableTitle"> فاکتور های در انتظار ارسال </h5>
                            <table className="table table-bordered table-sm factorTable">
                                <thead className="tableHeader">
                                    <tr>
                                        <th> ردیف </th>
                                        <th>شماره </th>
                                        <th>تاریخ </th>
                                        <th>تاریخ تحویل </th>
                                        <th>   مبلغ (تومان) </th>
                                        <th> عملیات پرداخت </th>
                                        <th> جزئیات </th>
                                    </tr>
                                </thead>
                                <tbody className="tableBody"style={{height:"5rem"}}>
                                  {waitingOrders && waitingOrders.orders.map((element, index) =>(
                                    <tr><th>{index + 1}</th>
                                        <td>{element.OrderNo}</td>
                                        <td>{new Date(element.TimeStamp).toLocaleDateString('fa-IR-u-nu-latn')}</td>
                                        <td>{element.OrderDate}</td><td> {parseInt(element.Price / 10).toLocaleString()} </td>
                                        <td>  پرداخت در محل  </td>
                                        <td> <Link to="/orderDetails" onClick={() => { localStorage.setItem("selectedHDS", element.SnOrder) }}> <FontAwesomeIcon icon={faEye} /> {element.orders} </Link> </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }else{
        window.location.href = '/login'
    }
}