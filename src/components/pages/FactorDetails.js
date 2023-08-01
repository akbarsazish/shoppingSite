import React, { useEffect } from "react";
import Footer from "../genrealComponent/Footer";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import axios from "axios";
import { useState } from "react";

export default function FactoreDetails(props){
    const [factorItem, setFactorItem] = useState(0);
    const [allPrice, setAllPrice] = useState(0)
    useEffect(()=>{
        axios.get("https://s.starfoods.ir/api/factorView", 
        {params:{
            factorSn:localStorage.getItem("selectedHDS"),
            psn:localStorage.getItem("psn")
        }}).then((data)=>{
         setFactorItem(data.data.factorBYS.map((element, index) => 
            <div className="factors card">
            <div className="factorDetailPart">
                <span className="factorDetailItems"> <b> اسم کالا  : </b>     {element.GoodName}  </span>
                <span className="factorDetailItems"> <b>   قیمت کالا : </b>   {parseInt(element.Price/10).toLocaleString()}   </span>
                <span className="factorDetailItems"> <b>   وقت خرید : </b>   {new Date(element.TimeStamp).toLocaleDateString('fa-IR-u-nu-latn')}  </span>
            </div>
          </div>
        ))
        setAllPrice( data.data.factorBYS.reduce((acc, curValue)=> acc + parseInt(curValue.Price), 0));
        })
    },[])

  

if(localStorage.getItem("isLogedIn")){
    return(
        <>
        <Header />
        <Sidebar />
            <div className="container marginTop" style={{ borderRadius: "10px 10px 5px 5px" }}>
                <div className="row p-2">
                         <h4 className="p-3"> تعداد کالا: 8 </h4>
                        <div className="factorView">
                            
                           {factorItem}

                            <div className="factorsResult card">
                                    <div className="factorDetailPart">
                                        <span className="factorDetailItems"> <b>  قیمت کالا  : </b> {parseInt(allPrice/10).toLocaleString()} </span>
                                        <span className="factorDetailItems"> <b>  تخفیف کالا    : </b> 0 </span>
                                    </div>
                                    <div className="factorDetailPart">
                                        <span className="factorDetailItems"> <b>  جمع: </b>  {parseInt(allPrice/10).toLocaleString()} </span>
                                        <span className="factorDetailItems"> <b>  هزینه    : </b> 0 </span>
                                    </div>
                                    <div className="factorDetailPart">
                                        <span className="factorDetailItems"> <b>  مبلغ قابل پرداخت  : </b> {parseInt(allPrice/10).toLocaleString()} </span>
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