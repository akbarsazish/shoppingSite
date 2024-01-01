import React,{useEffect,useState} from "react";
import {useLocation } from "react-router-dom"
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import axios from "axios";

export default function SuccessPay() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Access specific query parameters
    const iN = queryParams.get('iN');
    const iD = queryParams.get('iD');
    const tref = queryParams.get('tref');
    const[currenyInfo,setCurrencyInfo]=useState({currncy:1,currencyName:"ریال"});
    const[paymentRespond,setPaymentStat]=useState("");
    const[factorBYS,setFactorBYS]=useState([]);
    const[payInfo,setPaymentInfo]=useState([]);
    const[factorNo,setFactorNo]=useState(0);
    const[allProfit,setAllProfit]=useState(0);

    useEffect(() => {
        axios.get("https://starfoods.ir/api/successPayApi",{params:{
            psn:localStorage.getItem("psn")
            ,tref:tref
            ,iN:iN
            ,iD:iD
            ,recivedTime:localStorage.getItem("recivedTime")
            ,takhfif:localStorage.getItem("takhfif")
            ,takhfifCode:localStorage.getItem("takhfifCode")
            ,receviedAddress:localStorage.getItem("receviedAddress")
            ,allMoney:localStorage.getItem("allMoney")
        }})
        .then((response)=>{
            if(response.data.result === "OK"){
                localStorage.setItem("recivedTime","");
                localStorage.setItem("takhfif",0);
                localStorage.setItem("takhfifCode","");
                localStorage.setItem("receviedAddress","");
                localStorage.setItem('buyAmount',0);
                setFactorNo(response.data.factorNo)
                setAllProfit(response.data.profit);
                setCurrencyInfo({currencyName:response.data.currencyName,currncy:response.data.currncy});
                setFactorBYS(response.data.factorBYS.map((element,index)=>{return <tr><td>{index+1}</td>
                <td>{element.GoodName}</td>
                <td>{element.PackAmount/1+' '+element.secondUnit+' معادل '+element.Amount/1+' '+element.firstUnit}</td>
                <td>{parseInt(element.Fi/response.data.currency).toLocaleString("fa-ir")+' '+response.data.currencyName}</td>
                <td>{parseInt(element.Price/response.data.currency).toLocaleString("fa-ir")+' '+response.data.currencyName}</td></tr>}));
                setPaymentInfo(
                  <tr>
                    <td> 1 </td>
                    <td> {response.data.payResults.TraceNumber} </td>
                    <td> {response.data.payResults.ReferenceNumber} </td>
                    <td> {response.data.payResultsTransactionDate} </td>
                    <td> {response.data.payResults.TransactionReferenceID} </td>
                    <td> {response.data.payResults.InvoiceNumber} </td>
                    <td> {response.data.payResultsInvoiceDate} </td>
                    <td> {response.data.payResults.Amount} </td>
                    <td> {response.data.payResults.TrxMaskedCardNumber} </td>
                    <td> {response.data.payResults.IsSuccess} </td>
                    <td> {response.data.payResults.Message} </td>
                   </tr>
                );
            }
            setPaymentStat(response.data.result)
            });
        },[]);
        
    return(
    <>
    <Header/>
    <Sidebar/>
    <div className="container  marginTop text-center rounded">
        <div className="row">
            <div className="col-sm-12">
              {paymentRespond==="OK"? 
                <>
                <ul class="c-checkout-steps d-none">
                    <li class="is-active is-completed">
                        <div className="c-checkout-steps__item c-checkout-steps__item--summary" data-title="اطلاعات ارسال"></div>
                    </li>
                    <li className="is-active is-completed">
                        <div className="c-checkout-steps__item c-checkout-steps__item--payment" data-title="اتمام خرید "></div>
                    </li>
                </ul>
                <div class="container px-0 bg-white">
                <section className="c-checkout-alert">
                    <div className="c-checkout-alert__icon success"><i className="fa fa-check"></i></div>
                    <div className="c-checkout-alert__title">
                        <h4> شماره فاکتور: <span className="c-checkout-alert__highlighted c-checkout-alert__highlighted--success"> {factorNo} </span></h4>
                    </div>
                </section>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <div className="card text-dark p-3">
                            <h6>شماره فاکتور :  {factorNo} </h6>
                            <h6 className="">سود شما از این خرید : {allProfit} {currenyInfo.currencyName} </h6>
                            <div className="c-checkout-details__row">
                                <div className="c-checkout-details__col--text">
                                   <a className="btn btn-danger btn-sm" href="https://star.starfoods.ir/home">  <i className="fa fa-back">  </i>  بازگشت به صفحه اصلی</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12">
                      <div className="table-responsive">
                        <table className="table table-bordered">
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
                                {factorBYS}
                            </tbody>
                        </table>
                      </div>
                     </div>
                 </div>
	        <div className="row">
                <table className='table table-bordered table-striped table-sm'>
                    <thead>
                    <tr>
                        <th >ردیف</th>
                        <th >شماره ارجاع</th>
                        <th > تاریخ تراکنش </th>
                        <th > شماره صورتحساب </th>
                        <th> تاریخ صورتحساب </th>
                        <th > مبلغ </th>
                        <th > شماره کارت با ماسک</th>
                        <th > وضعیت </th>
                        <th > پیام </th>
                    </tr>
                    </thead>
                    <tbody className="select-highlight" id="customerListBody1">
                        {payInfo}
                    </tbody>
                </table>
	      </div>
       </div>
     </>
     :(paymentRespond ==="Not Varified"?<h2>not Varified</h2>:(paymentRespond ==="Not Payed"?<h2>not payed</h2>:<h2>not connected</h2>))}
    </div>
  </div>
</div>
<Footer/>
</>)
}
