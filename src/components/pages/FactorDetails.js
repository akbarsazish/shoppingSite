import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHistory, faIdCard} from "@fortawesome/free-solid-svg-icons";
import Footer from "../genrealComponent/Footer";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import axios from "axios";
import { useState } from "react";

export default function FactorDetails() {
    const navigate = useNavigate();
    const [factorItem, setFactorItem] = useState([]);
    const [allPrice, setAllPrice] = useState(0);
    const [payUrl, setPayUrl] = useState('');
  
    useEffect(() => {
      axios
        .get('https://starfoods.ir/api/factorView', {
          params: {
            factorSn: localStorage.getItem('selectedHDS'),
            psn: localStorage.getItem('psn'),
          },
        })
        .then((data) => {
          setFactorItem(
            data.data.factorBYS.map((element, index) => (
              <div className="factorDetailPart" key={index}>
                <span className="factorDetailItems">
                  <b> اسم کالا : </b> {element.GoodName}
                </span>
                <span className="factorDetailItems">
                  <b> قیمت کالا : </b>{' '}
                  {parseInt(element.Price / 10).toLocaleString()}
                </span>
                <span className="factorDetailItems">
                  <b> وقت خرید : </b>{' '}
                  {new Date(element.TimeStamp).toLocaleDateString('fa-IR-u-nu-latn')}
                </span>
              </div>
            ))
          );
          setAllPrice(
            data.data.factorBYS.reduce(
              (acc, curValue) => acc + parseInt(curValue.Price),
              0
            )
          );
        });
    }, []);
  
    useEffect(() => {
      const allMoney = parseInt(allPrice);
      if (allMoney > 0) {
        axios
          .get('https://starfoods.ir/api/getFactorPaymentFormApi', {
            params: {
              allMoney: allMoney,
            },
          })
          .then((data) => {
            setPayUrl(data.data);
          });
      }
    }, [allPrice]);
  
    const clickToPay = () => {
      if(payUrl) {
        window.open(payUrl, '_blank');
      }
    }

if(localStorage.getItem("isLogedIn")){
    return(
        <>
           <Header />
           <Sidebar />
            <div className="container marginTop" style={{ borderRadius: "10px 10px 5px 5px" }}>
                      <span className="p-3"> تعداد کالا: </span>
                      <div className="factorView">
                         <div className="factors card">  
                            {factorItem}
                         </div>
                        <div className="factorsResult card">
                            <div className="factorDetailPart">
                                <span className="factorDetailItems"> <b> قیمت کالا  : </b> {parseInt(allPrice/10).toLocaleString()} </span>
                                <span className="factorDetailItems"> <b> تخفیف کالا : </b> </span>
                            </div>
                            <div className="factorDetailPart">
                                <span className="factorDetailItems"> <b> جمع: </b>  {parseInt(allPrice/10).toLocaleString()} </span>
                                <span className="factorDetailItems"> <b> هزینه : </b> 0 </span>
                            </div>
                            <div className="factorDetailPart">
                                <span className="factorDetailItems"> <b> مبلغ قابل پرداخت : </b> {parseInt(allPrice/10).toLocaleString()} </span>
                            </div>

                            <div className="factor-details">
                                <div className="factor-details-item">
                                    <button className="btn btn-sm btn-danger" onClick={() => navigate(-1)}> <FontAwesomeIcon icon={faHistory} /> بازگشت </button>
                                </div>
                                <div className="factor-details-item text-start">
                                    <button onClick={clickToPay} className="btn btn-sm btn-danger" id="payOnlineForm">
                                        <FontAwesomeIcon icon={faIdCard} /> پرداخت 
                                    </button>
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