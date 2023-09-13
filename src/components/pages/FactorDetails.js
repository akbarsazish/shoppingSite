import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackwardFast, faHistory, faIdCard} from "@fortawesome/free-solid-svg-icons";
import Footer from "../genrealComponent/Footer";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import axios from "axios";
import { useState } from "react";

export default function FactoreDetails(props){
    const navigate = useNavigate();
    const [factorItem, setFactorItem] = useState(0);
    const [allPrice, setAllPrice] = useState(0);
    const allMoney = localStorage.getItem("allMoney");
    const[payUrl, setPayUrl] = useState('');

    useEffect(()=>{
        axios.get("https://starfoods.ir/api/factorView", 
        {params:{
            factorSn:localStorage.getItem("selectedHDS"),
            psn:localStorage.getItem("psn")
        }}).then((data)=>{
         setFactorItem(data.data.factorBYS.map((element, index) => 
               <div className="factorDetailPart">
                  <span className="factorDetailItems"> <b> اسم کالا  : </b> {element.GoodName}  </span>
                  <span className="factorDetailItems"> <b> قیمت کالا : </b> {parseInt(element.Price/10).toLocaleString()}   </span>
                  <span className="factorDetailItems"> <b> وقت خرید : </b> {new Date(element.TimeStamp).toLocaleDateString('fa-IR-u-nu-latn')}  </span>
              </div>
        ))
        setAllPrice( data.data.factorBYS.reduce((acc, curValue)=> acc + parseInt(curValue.Price), 0));
        })
    },[]);

    useEffect(() => {
        axios.get('https://starfoods.ir/api/getPaymentFormApi', {
          params: {
            psn: localStorage.getItem("psn"),
            allMoney:allMoney
          }
        }).then((data) => {
            setPayUrl(data.data);
        });
      }, []);
  
if(localStorage.getItem("isLogedIn")){
    return(
        <>
           <Header />
           <Sidebar />
            <div className="container marginTop" style={{ borderRadius: "10px 10px 5px 5px" }}>
                      <span className="p-3"> تعداد کالا: 8 </span>
                      <div className="factorView">
                         <div className="factors card">  
                            {factorItem}
                          </div>
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

                            <div className="factor-details">
                                <div className="factor-details-item">
                                    <button className="btn btn-sm btn-danger" onClick={() => navigate(-1)}> <FontAwesomeIcon icon={faHistory} /> بازگشت </button>
                                </div>
                                <div className="factor-details-item text-start">
                                    <Link id="payOnlineForm" to={payUrl} target={"_blank"}>
                                       <button className="btn btn-sm btn-danger"> <FontAwesomeIcon icon={faIdCard} /> پرداخت   </button>
                                    </Link>
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