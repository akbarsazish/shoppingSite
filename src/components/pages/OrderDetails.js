import React, { useEffect } from "react";
import Footer from "../genrealComponent/Footer";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import axios from "axios";
import { useState } from "react";

export default function FactoreDetails(props){
    const [orderItem, setFactorItem] = useState(0);
    const [allPrice, setAllPrice] = useState(0)
    useEffect(()=>{
        axios.post("http://192.168.10.27:8080/api/listOrders", {factorSn:localStorage.getItem("selectedHDS")

        }).then((data)=>{
            console.log(data.data)
         setFactorItem(data.data.orders.map((element, index) => 
            <div className="factors card">
            <div className="factorDetailPart">
                <span className="factorDetailItems"> <b>     اسم کالا: </b>     {element.GoodName}  </span>
                <span className="factorDetailItems"> <b>   قیمت کالا : </b>   {parseInt(element.Price/10).toLocaleString("fa-IR")}   </span>
                <span className="factorDetailItems"> <b>   وقت خرید : </b>   {new Date(element.TimeStamp).toLocaleString('fa-IR')}  </span>
            </div>
          </div>
        ))
        setAllPrice( data.data.orders.reduce((acc, curValue)=> acc + parseInt(curValue.Price), 0));
        })

    },[])


    if(localStorage.getItem("isLogedIn")){
        return(
            <>
            <Header />
            <Sidebar />
                <div className="container marginTop" style={{ borderRadius: "10px 10px 5px 5px" }}>
                    <div className="row p-2">
                            <h4 className="p-3"> تعداد کالا: {parseInt(orderItem.length).toLocaleString("fa-IR")} </h4>
                            <div className="factorView">
                                
                            {orderItem}

                                <div className="factorsResult card">
                                        <div className="factorDetailPart">
                                            <span className="factorDetailItems"> <b>  قیمت کالا  : </b> {parseInt(allPrice/10).toLocaleString("fa-IR")} </span>
                                            <span className="factorDetailItems"> <b>  تخفیف کالا    : </b> 0 </span>
                                        </div>
                                        <div className="factorDetailPart">
                                            <span className="factorDetailItems"> <b>  جمع: </b>  {parseInt(allPrice/10).toLocaleString("fa-IR")} </span>
                                            <span className="factorDetailItems"> <b>  هزینه    : </b> 0 </span>
                                        </div>
                                        <div className="factorDetailPart">
                                            <span className="factorDetailItems"> <b>  مبلغ قابل پرداخت  : </b> {parseInt(allPrice/10).toLocaleString("fa-IR")} </span>
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