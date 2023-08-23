import React, { useEffect, useState } from "react";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import axios from "axios";

export default function ReturnedFactor(props) {
    const[returnedFactors,setReturnedFactors]=useState(0)
    useEffect(()=>{
        axios.get("http://192.168.10.33:8080/api/listFactors",{data:{psn:localStorage.getItem('psn')}}).then((data)=>{
            setReturnedFactors(data.data.rejectedFactors.map((element,index)=>
            <tr>
                <td>{index+1}</td>
                <td>{element.FactNo}</td>
                <td>{element.FactDate}</td>
                <td>وضعیت پرداخت</td>
                <td>{parseInt(element.TotalPriceHDS/10).toLocaleString()}</td>
                <td>جزئیات</td>
            </tr>))
        })
    },[])

    if(localStorage.getItem("isLogedIn")){
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop card">

                <div className="row p-2">
                    <div className="col-lg-12 text-start">
                        <Link to={-1} className="btn btn-danger btn-sm"> بازگشت < FontAwesomeIcon icon={faHistory} />  </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h4>فاکتورهای فروش </h4>
                        <table className="table table-sm table-bordered border-gray">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>فاکتور</th>
                                    <th> تاریخ </th>
                                    <th>وضعیت پرداخت </th>
                                    <th>مبلغ کل </th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-lg-12 text-center">
                        <h4>فاکتورهای مرجوعی </h4>
                        <table className="table table-sm table-bordered border-gray">
                            <thead >
                                <tr>
                                    <th>#</th>
                                    <th>فاکتور</th>
                                    <th>تاریخ </th>
                                    <th>وضعیت پرداخت</th>
                                    <th>مبلغ کل (تومان)</th>
                                    <th>نمایش</th>
                                </tr>
                            </thead>
                            <tbody>
                                {returnedFactors}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    )
    }else{
        window.location.href="/login"
    }
}