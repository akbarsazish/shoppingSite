import React, { useEffect, useState } from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {JBDateInput} from 'jb-date-input-react';

export default function ChequeRequest(){
    const [showForm,setShowForm]=useState(0);
    
    const [acceptState,setAcceptState]=useState("Rejected");
    useEffect(() => {
        axios.get("https://starfoods.ir/api/getChequeReqState",{
            params:{customerId:localStorage.getItem("psn")}}).then((result)=>{
            setShowForm(result.data.requestState)
            setAcceptState(result.data.acceptState)
    })},[]);


    function showHiddenDiv() {
        var selectElement = document.getElementById("ownershipStatus");
        var selectedOption = selectElement.value;
        
        var hiddenDiv = document.getElementById("endOfContract");
        
        if (selectedOption === "mostager") {
          hiddenDiv.style.display = "block";
        } else {
          hiddenDiv.style.display = "none";
        }
      }


      function howHideReturnedCheckSate() {
        var returnedCheckSelect = document.getElementById("returnCheckSelect");
        var returnedCheckState = returnedCheckSelect.value;
        var returnedCheckInfoDiv = document.getElementById("returnedCheck");

        alert(returnedCheckState)
        
        if (returnedCheckState === "yes") {
            returnedCheckInfoDiv.style.display = "block";
        } else {
            returnedCheckInfoDiv.style.display = "none";
        }
    }

      
      function requestAmountShowValue(element,containerId,mynumber) {
        let number=mynumber.replace(/,/g, '');
        const first = ['','یک ','دو ','سه ','چهار ', 'پنج ','شش ','هفت ','هشت ','نه ','ده ','یازده ','دوازده ','سیزده ','چهارده ','پانزده ','شانزده ','هفده ','هیجده ','نزده '];
        const tens = ['', '', 'بیست','سی','چهیل','پنجاه', 'شصت','هفتاد','هشتاد','نود'];
        const mad = ['', 'هزار', 'میلیون', 'میلیارد', 'بیلیون', 'تریلیون'];
        let word = '';

        for (let i = 0; i < mad.length; i++) {
          let tempNumber = number%(100*Math.pow(1000,i));
          if (Math.floor(tempNumber/Math.pow(1000,i)) !== 0) {
            if (Math.floor(tempNumber/Math.pow(1000,i)) < 20) {
              word = first[Math.floor(tempNumber/Math.pow(1000,i))] + mad[i] + ' ' + word;
            } else {
              word = tens[Math.floor(tempNumber/(10*Math.pow(1000,i)))] + '-' + first[Math.floor(tempNumber/Math.pow(1000,i))%10] + mad[i] + ' ' + word;
            }
          }
          tempNumber = number%(Math.pow(1000,i+1));
          if (Math.floor(tempNumber/(100*Math.pow(1000,i))) !== 0) word = first[Math.floor(tempNumber/(100*Math.pow(1000,i)))] + 'صد ' + word;
        }
        document.getElementById(containerId).textContent = word + " ریال ";
    }

  function addCommas(numberString) {
    var parts = numberString.split(".");
    var integerPart = parts[0];
    var decimalPart = parts[1] || "";
  
    var formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var formattedNumber = formattedInteger + (decimalPart ? "." + decimalPart : "");
    return formattedNumber;
  }

    const [formData, setFormData] = useState({
        name : '',
        customerId : '',
        milliCode : '',
        PhoneNumber : '',
        milkState : '',
        bankAccNum : '',
        bankName : '',
        branchName : '',
        contractDate : '',
        malikName : '',
        depositAmount : '',
        malikPhone : '',
        homeAddress : '',
        jawazState : '',
        workExperience : '',
        lastAddress : '',
        reliablityMony : '',
        returnedCheckState : '',
        returnedCheckMoney : '',
        returnedCheckCause : '',
        zaminName : '',
        zaminAddress : '',
        zaminPhone : '',
        zaminJob : '',
        lastSuppName : '',
        lastSuppPhone : '',
        lastSuppAddress : '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
   
      axios.get(`https://starfoods.ir/api/addRequestCheck`,{params:{
        name : document.getElementById("name").value,
        customerId : document.getElementById("customerId").value,
        milliCode : document.getElementById("milliCode").value,
        PhoneNumber : document.getElementById("phone").value,
        milkState : document.getElementById("ownershipStatus").value,
        bankAccNum : document.getElementById("accountNo").value,
        bankName : document.getElementById("bankName").value,
        branchName : document.getElementById("branchName").value,
        contractDate : document.getElementById("contractEnEnd").value,
        malikName : document.getElementById("malikName").value,
        depositAmount : document.getElementById("depositAmount").value,
        malikPhone : document.getElementById("malikPhone").value,
        homeAddress : document.getElementById("homeAddress").value,
        jawazState : document.getElementById("jawazState").value,
        workExperience : document.getElementById("workExperience").value,
        lastAddress : document.getElementById("lastAddress").value,
        reliablityMony : document.getElementById("requestedAmount").value,
        returnedCheckState : document.getElementById("returnCheckSelect").value,
        returnedCheckMoney : document.getElementById("returnedCheckMoney").value,
        returnedCheckCause : document.getElementById("returnedCheckCause").value,
        zaminName : document.getElementById("zaminName").value,
        zaminAddress : document.getElementById("zaminAddress").value,
        zaminPhone : document.getElementById("zaminPhone").value,
        zaminJob : document.getElementById("zaminJob").value,
        lastSuppName : document.getElementById("lastSuppName").value,
        lastSuppPhone : document.getElementById("lastSuppPhone").value,
        lastSuppAddress : document.getElementById("lastSuppAddress").value
      }})
        .then((response) => {
          console.log('Response:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    return (
    <>
     <Header />
     <Sidebar />

     { showForm == 0 ?
    <>
     <div className="container marginTop">
        <div className="row my-4">
            <div className="col-lg-12">
            <fieldset className="cheque-fieldset rounded p-2">
            <legend className="float-none w-auto legendLabel p-2 m-1 fw-bold"> در خواست خرید چکی  </legend>
              <form onSubmit={handleSubmit} id="addRequestCheckForm" className="p-3">
                <div className="row ">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="roleNo" className="form-label check-request-label cheque-label" > نام و نام خانوادگی :</label>
                            <input type="text" className="form-control form-control-sm" id="name" name="name" onChange={handleChange} value={formData.name} required  />
                            <input type="hidden" id="customerId" name="customerId" onChange={handleChange} value={localStorage.getItem("psn")} />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="postalCode" className="form-label check-request-label cheque-label">کد ملی :</label>
                            <input type="number" className="form-control form-control-sm" id="milliCode" name="milliCode" onChange={handleChange} value={formData.milliCode} required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> شماره تماس   :</label>
                            <input type="number" className="form-control form-control-sm" id="phone" name="PhoneNumber" onChange={handleChange} value={formData.PhoneNumber} required />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="address" className="form-label check-request-label cheque-label"> وضعیت ملک :</label>
                            <select className="form-select form-select-sm" id="ownershipStatus" name="milkState" value={formData.milkState} onChange={(e) => {showHiddenDiv(); handleChange(e);}}>
                              <option value="sarqufli"> سر قفلی </option>
                              <option value="malik"> صاحب ملک </option>
                              <option value="mostager"> مستاجر </option>
                            </select>
                        </div>
                    </div>
                </div>

                <fieldset className="rounded p-1 cheque-fieldset" id="endOfContract">
                <legend  className="float-none w-auto legendLabel p-0 mb-0" style={{fontSize:"14px", fontWeight:"bold", color:"red"}}> جزئیات قرار داد </legend>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label">  تاریخ اتمام :</label>
                                <JBDateInput style={{height:"22px"}} id="contractEndDate" onChange={handleChange} value={formData.contractDate}> </JBDateInput>
                                <input type="hidden" id="contractEnEnd" name="contractDate" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> صاحب ملک  :</label>
                                <input type="text" className="form-control form-control-sm" id="malikName" name="malikName" onChange={handleChange} value={formData.malikName} />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> مبلغ ودیعه (ریال) :</label>
                                <input type="text" onInput={(e) => requestAmountShowValue(this, 'checkAmountContainer', e.target.value)} onChange={handleChange} id="depositAmount" className="form-control form-control-sm" name="depositAmount" value={formData.depositAmount} />
                            </div>
                            <span className="show-amount" id="checkAmountContainer"> </span>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> شماره تماس  :</label>
                                <input type="number" className="form-control form-control-sm" onChange={handleChange} name="malikPhone" value={formData.malikPhone} id="malikPhone" />
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> آدرس منزل :</label>
                            <input type="text" className="form-control form-control-sm" name="homeAddress" onChange={handleChange} value={formData.homeAddress} id="homeAddress" required />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="address" className="form-label check-request-label cheque-label">  جواز  :</label>
                            <select className="form-select form-select-sm" name="jawazState" value={formData.jawazState} onChange={handleChange} aria-label="form-select-sm example" id="jawazState">
                                <option value="yes"> دارم </option>
                                <option value="no" > ندارم </option>
                                <option value="underWork"> در دست اقدام </option>
                            </select>
                        </div>
                    </div>
                </div> 

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> چند سال است که در این حوزه فعال هستید؟ </label>
                            <select className="form-select form-select-sm" name="workExperience" value={formData.workExperience} onChange={handleChange} id="workExperience" required>
                                <option value="یک تا سه سال "> یک تا سه سال </option>
                                <option value="سه تا شش سال "> سه تا شش سال  </option>
                                <option value="پنج تا ده سال"> پنج تا ده سال  </option>
                                <option value="ده سال به بالا"> ده سال به بالا  </option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> مکان قبلی فعالیت :</label>
                            <input type="text" className="form-control form-control-sm" id="lastAddress" name="lastAddress" onChange={handleChange} value={formData.lastAddress} />
                        </div>
                    </div>
                </div> 

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label">
                            مبلغ در خواستی اعتبار (ریال) :
                            </label>
                            <input type="text" className="form-control form-control-sm" name="reliablityMony" value={formData.reliablityMony} id="requestedAmount" onChange={handleChange} onInput={(e) => requestAmountShowValue(this, 'checkDepositAmountContainer', e.target.value)} required />
                        </div>
                        <span className="show-amount" id="checkDepositAmountContainer"></span>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="address" className="form-label check-request-label cheque-label"> آیا هنوز تجربه چک برگشتی داشته‌اید؟ </label>
                            <select className="form-select form-select-sm" name="returnedCheckState" value={formData.returnedCheckState} onChange={howHideReturnedCheckSate} id="returnCheckSelect">
                                <option> انتخاب </option>
                                <option value="yes"> بله </option>
                                <option value="no"> خیر </option>
                            </select>
                        </div>
                    </div>
                </div> 
                <div className="row" id="showRequestedAmount">
                    <p id="amountOutput"></p>
                </div>

               <fieldset className="cheque-fieldset rounded p-1" id="returnedCheck">
                  <legend  className="float-none w-auto legendLabel p-0 mb-0" style={{fontSize:"14px", fontWeight:"bold", color:"red"}}> چک برگشتی </legend>
                    <div className="row" >
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> مبلغ (ریال)  :</label>
                                <input type="text" onChange={handleChange} onInput={(e) => requestAmountShowValue(this, 'checkRetAmountContainer', e.target.value)} className="form-control form-control-sm" name="returnedCheckMoney" value={formData.returnedCheckMoney} id="returnedCheckMoney"/>
                            </div>
                            <span className="show-amount" id="checkRetAmountContainer"></span>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-1 mt-1">
                                <label htmlFor="address" className="form-label check-request-label cheque-label"> علت برگشت :</label>
                                <textarea className="form-control" name="returnedCheckCause" onChange={handleChange} value={formData.returnedCheckCause} id="returnedCheckCause" rows="1"></textarea>
                            </div>
                        </div>
                    </div> 
                </fieldset>

                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" > اسم بانک :</label>
                            <select className="form-select form-select-sm" name="bankName" onChange={handleChange} value={formData.bankName} id="bankName">
                                <option value="بانک ملی">بانک ملی </option>
                                <option value="بانک تجارت"> بانک تجارت </option>
                                <option value=" بانک کشاورزی">  بانک کشاورزی </option>
                                <option value="بانک ملیت"> بانک ملت </option>
                                <option value="بانک سپه"> بانک سپه </option>
                                <option value="بانک مسکن"> بانک مسکن </option>
                                <option value="بانک رفاه"> بانک رفاه </option>
                                <option value="بانک انصار"> بانک انصار </option>
                                <option value="بانک پارسیان"> بانک پارسیان </option>
                                <option value="پست بانک"> پست بانک </option>
                                <option value="بانک آینده "> بانک آینده </option>
                                <option value=" بانک پاسارگاد  "> بانک پاسارگاد </option>
                                <option value=" بانک توسعه صادرات ">  بانک توسعه صادرات </option>
                                <option value=" بانک دی">  بانک دی</option>
                                <option value=" بانک سپه ">  بانک سپه </option>
                                <option value=" بانک شهر ">  بانک شهر </option>
                                <option value=" بانک قرض‌الحسنه رسالت ">  بانک قرض‌الحسنه رسالت </option>
                                <option value="  بانک کارآفرین  ">  بانک کارآفرین </option>
                                <option value=" بانک مرکزی">  بانک مرکزی</option>
                                <option value=" بانک اقتصاد نوین  ">  بانک اقتصاد نوین </option>
                                <option value=" بانک ایران و ونزوئلا ">  بانک ایران و ونزوئلا </option>
                                <option value=" بانک حکمت ایرانیان ">  بانک حکمت ایرانیان </option>
                                <option value="  بانک رفاه کارگران  ">  بانک رفاه کارگران </option>
                                <option value=" بانک سرمایه ">  بانک سرمایه </option>
                                <option value=" بانک قرض‌الحسنه مهر ایران ">  بانک قرض‌الحسنه مهر ایران </option>
                                <option value=" بانک مسکن ">  بانک مسکن </option>
                                <option value=" بانک مهر اقتصاد ">  بانک مهر اقتصاد </option>
                                <option value=" بانک انصار ">  بانک انصار </option>
                                <option value=" بانک پارسیان ">  بانک پارسیان </option>
                                <option value=" بانک توسعه تعاون ">  بانک توسعه تعاون </option>
                                <option value=" بانک خاورمیانه ">  بانک خاورمیانه </option>
                                <option value=" بانک سامان ">  بانک سامان </option>
                                <option value=" بانک سینا ">  بانک سینا </option>
                                <option value=" بانک صنعت و معدن ">  بانک صنعت و معدن </option>
                                <option value=" بانک قوامین ">  بانک قوامین </option>
                                <option value=" بانک گردشگری ">  بانک گردشگری </option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="address" className="form-label check-request-label cheque-label"> اسم شعبه - کد:</label>
                            <input type="text" className="form-control form-control-sm" name="branchName" onChange={handleChange} value={formData.branchName} id="branchName" required />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="address" className="form-label check-request-label cheque-label"> شماره حساب: </label>
                            <input type="number" id="accountNo" className="form-control form-control-sm" name="bankAccNum" onChange={handleChange} value={formData.bankAccNum} required />
                        </div>
                    </div>
                </div>

                <fieldset className="cheque-fieldset rounded p-1">
                <legend  className="float-none w-auto legendLabel p-0 mb-0" style={{fontSize:"14px", fontWeight:"bold", color:"red"}}> مشخصات ضامن </legend>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> نام   :</label>
                                <input type="text" className="form-control form-control-sm" id="zaminName" name="zaminName" onChange={handleChange} value={formData.zaminName} required />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> آدرس   :</label>
                                <input type="text" className="form-control form-control-sm" id="zaminAddress" name="zaminAddress" onChange={handleChange} value={formData.zaminAddress} required />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> تلفن  :</label>
                                <input type="number" id="zaminPhone" className="form-control form-control-sm phoneNoLimit"  name="zaminPhone" onChange={handleChange} value={formData.zaminPhone} required />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> شغل :</label>
                                <input type="text" className="form-control form-control-sm" id="zaminJob" name="zaminJob" onChange={handleChange} value={formData.zaminJob} required />
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border rounded p-1" style={{border:"1px dashed red !important"}}>
                <legend  className="float-none w-auto legendLabel p-0 mb-0" style={{fontSize:"14px", fontWeight:"bold", color:"red"}}> تامین کننده قبلی، کالاهای مورد نیاز خویش  را نام ببرید  </legend>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> نام   :</label>
                                <input type="text" id="lastSuppName" className="form-control form-control-sm" name="lastSuppName" onChange={handleChange} value={formData.lastSuppName} />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> تلفن    :</label>
                                <input type="text" id="lastSuppPhone" className="form-control form-control-sm phoneNoLimit" name="lastSuppPhone" onChange={handleChange} value={formData.lastSuppPhone} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label"> آدرس  :</label>
                                <input type="text" className="form-control form-control-sm" id="lastSuppAddress" name="lastSuppAddress" onChange={handleChange} value={formData.lastSuppAddress} />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <button type="submit" className="btn btn-sm btn-danger m-2"> ثبت <FontAwesomeIcon icon={faCheckCircle} /> </button>
             </form>     
            </fieldset>
         </div>
      </div>
    </div>
    </>:
         <div className="container marginTop">
         <div className="row my-4">
             <div className="col-lg-12 p-5 text-center">
                {acceptState=="Accepted"?
                <h2>درخواست خرید چکی شما بعد از بررسی تأیید شد و از این پس مجاز به خریدهای چکی می‌باشید.</h2>
                :<h3>درخواست خرید چکی شما بعد از بررسی اطلاع داده خواهد شد.</h3>
                }
             </div>
       </div>
     </div>
    }</>
)
}