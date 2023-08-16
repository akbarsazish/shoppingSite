import React,{useEffect,useState} from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHistory } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Success() {
    localStorage.setItem("buyAmount",0)
    const [succedFactorData,setSuccedFactorData]=useState(0)
    useEffect(()=>{
        axios.get("http://192.168.10.33:8080/api/successFactorInfo",{params:{psn:localStorage.getItem("psn")}}).then((data)=>{
            setSuccedFactorData( data.data.factorBYS.map((element,index)=><tr><td> {(index+1)} </td><td>{element.GoodName}</td><td>{parseInt(element.PackAmount).toLocaleString()}</td><td>{parseInt(element.Fi/10).toLocaleString()}</td><td>{parseInt(element.Price/10).toLocaleString()}</td></tr>))
        })
    },[])

    if(localStorage.getItem("isLogedIn")){
        return (
            <>
                <Header />
                <Sidebar />
                <div className="container  marginTop text-center rounded">
                    <FontAwesomeIcon style={{ textAlign: "center", fontSize: "55px" }} className="text-info p-2" icon={faCheckCircle} />
                    <h5 className="fw-bold" style={{ textAlign: "center", padding: "10px" }}>  شماره فاکتور  6356 </h5>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="card text-dark p-3 ">
                                <p className="factorStaff">سود شما از این خرید : 2</p>
                                <Link to={-3} style={{ textDecoration: "none", margin: "0 auto" }} className="btn btn-danger btn-sm w-50"> بازگشت < FontAwesomeIcon icon={faHistory} />  </Link>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                            <table className="table table-bordered ">
                                <thead>
                                    <tr>
                                        <th>ردیف</th>
                                        <th>نام کالا </th>
                                        <th>تعداد</th>
                                        <th>قیمت واحد</th>
                                        <th>مبلغ کل</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {succedFactorData}
                                </tbody>
                            </table>
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