import React from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "zaman";
import axios from "axios";
import { data } from "jquery";

export default function ChequeRequest(){

    function showHiddenDiv() {
        var selectElement = document.getElementById("ownershipStatus");
        var selectedOption = selectElement.value;
        
        var hiddenDiv = document.getElementById("endOfContract");
        
        if (selectedOption === "mostager") {
          hiddenDiv.style.display = "block";
        } else {
          hiddenDiv.style.display = "none";
        }
      
        var returnedChqueSelect = document.getElementById("returnCheckSelect");
        var returnedChequState = returnedChqueSelect.value;
        
        var returnedChequeInfoDiv = document.getElementById("returnedCheck");
        
        if (returnedChequState === "yes") {
          returnedChequeInfoDiv.style.display = "block";
        } else {
          returnedChequeInfoDiv.style.display = "none";
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

  const submitRequestCheque=()=>{
    let formdata={
        name : document.getElementById("name").value,
        customerId : document.getElementById("customerId").value,
        milliCode : document.getElementById("milliCode").value,
        phone : document.getElementById("phone").value,
        milkState : document.getElementById("ownershipStatus").value,
        bankAccNum : document.getElementById("accountNo").value,
        bankName : document.getElementById("bankName").value,
        bankBrandName : document.getElementById("branchName").value,
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
        lastSuppAddress : document.getElementById("lastSuppAddress").value,
        accountNo : document.getElementById("accountNo").value};
    axios.post("https://starfoods.ir/api/addRequestCheck",{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(formdata)}).then((result)=>{
        alert(result);
    });
  }

    return (
    <>
    <Header></Header>
    <Sidebar></Sidebar>
     <div className="container marginTop">
        <div className="row my-4">
            <div className="col-lg-12">
            <fieldset className="cheque-fieldset rounded p-2">
            <legend className="float-none w-auto legendLabel p-2 m-1 fw-bold"> در خواست خرید چکی  </legend>
              <form action="{{url('/addRequestCheck')}}" method="post" id="addRequestCheckForm" className="p-3">
                
                <div className="row ">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="roleNo" className="form-label check-request-label cheque-label"  data-toggle="tooltip" data-placement="bottom"> نام و نام خانوادگی :</label>
                            <input type="text" className="form-control form-control-sm" id="name"  name="name" required />
                            <input type="hidden"  id="customerId" name="customerId" value={localStorage.getItem("psn")} />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="postalCode"  className="form-label check-request-label cheque-label"  data-toggle="tooltip" data-placement="bottom" >کد ملی :</label>
                            <input  type="number"  className="form-control form-control-sm" id="milliCode"  name="milliCode" required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> شماره تماس   :</label>
                            <input  type="number"  className="form-control form-control-sm" id="phone" name="phone" required />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="address " className="form-label check-request-label cheque-label"> وضعیت ملک :</label>
                            <select className="form-select form-select-sm" id="ownershipStatus" name="milkState" onChange={()=>showHiddenDiv()}>
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
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom">  تاریخ اتمام :</label>
                                {/* <input  type="text" className="form-control form-control-sm" id="contractEndDate" /> */}
                                <div className="date-picker"> 
                                    <DatePicker round="x2" onChange={(d) => console.log(d)}  inputAttributes={{ placeholder: "انتخاب تاریخ "}} />
                                </div>
                                <input  type="hidden" id="contractEnEnd" name="contractDate" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> صاحب ملک  :</label>
                                <input  type="text" className="form-control form-control-sm" id="malikName" name="malikName" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> مبلغ ودیعه (ریال) :</label>
                                <input  type="text"  onInput={(e) => requestAmountShowValue(this, 'checkAmountContainer', e.target.value)} id="depositAmount" className="form-control form-control-sm" name="depositAmount" />
                            </div>
                            <span id="checkAmountContainer"> </span>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> شماره تماس  :</label>
                                <input  type="number"  className="form-control form-control-sm" name="malikPhone" id="malikPhone"/>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> آدرس منزل :</label>
                            <input  type="text" className="form-control form-control-sm" name="homeAddress" id="homeAddress" required />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="address" className="form-label check-request-label cheque-label">  جواز  :</label>
                            <select className="form-select form-select-sm" name="jawazState" aria-label="form-select-sm example" id="jawazState">
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
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> چند سال است که در این حوزه فعال هستید؟ </label>
                            <select className="form-select form-select-sm" name="workExperience" id="workExperience" required>
                                <option value="یک تا سه سال "> یک تا سه سال </option>
                                <option value="سه تا شش سال "> سه تا شش سال  </option>
                                <option value="پنج تا ده سال"> پنج تا ده سال  </option>
                                <option value="ده سال به بالا"> ده سال به بالا  </option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> مکان قبلی فعالیت :</label>
                            <input  type="text" className="form-control form-control-sm" id="lastAddress"  name="lastAddress" />
                        </div>
                    </div>
                </div> 

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom">
                            مبلغ در خواستی اعتبار (ریال) :
                            </label>
                            <input type="text" className="form-control form-control-sm" name="reliablityMony" id="requestedAmount" onInput={(e) => requestAmountShowValue(this, 'checkDepositAmountContainer', e.target.value)} required />
                        </div>
                        <span id="checkDepositAmountContainer"></span>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="address" className="form-label check-request-label cheque-label"> آیا هنوز تجربه چک برگشتی داشته‌اید؟ </label>
                            <select className="form-select form-select-sm" name="returnedCheckState" onChange={()=>showHiddenDiv()} id="returnCheckSelect">
                                <option value="no"> خیر </option>
                                <option value="yes"> بله </option>
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
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> مبلغ (ریال)  :</label>
                                <input  type="text" onInput={(e) => requestAmountShowValue(this, 'checkRetAmountContainer', e.target.value)} className="form-control form-control-sm" name="returnedCheckMoney" id="returnedCheckMoney"/>
                            </div>
                            <span id="checkRetAmountContainer"></span>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-1 mt-1">
                                <label htmlFor="address" className="form-label check-request-label cheque-label"> علت برگشت :</label>
                                <textarea className="form-control" name="returnedCheckCause" id="returnedCheckCause" rows="1"></textarea>
                            </div>
                        </div>
                    </div> 
                </fieldset>

                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> اسم بانک :</label>
                            <select className="form-select form-select-sm" name="bankName" onchange="showHiddenDiv()" id="bankName">
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
                            <input  type="text" className="form-control form-control-sm" name="branchName" id="branchName" required />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="mb-1 mt-1">
                            <label htmlFor="address" className="form-label check-request-label cheque-label"> شماره حساب: </label>
                            <input  type="number" id="accountNo" className="form-control form-control-sm" name="accountNo" required />
                        </div>
                    </div>
                </div>

                <fieldset className="cheque-fieldset rounded p-1">
                <legend  className="float-none w-auto legendLabel p-0 mb-0" style={{fontSize:"14px", fontWeight:"bold", color:"red"}}> مشخصات ضامن </legend>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> نام   :</label>
                                <input  type="text" className="form-control form-control-sm" id="zaminName"  name="zaminName" required />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> آدرس   :</label>
                                <input  type="text"  className="form-control form-control-sm" id="zaminAddress"  name="zaminAddress" required />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> تلفن  :</label>
                                <input  type="number" id="zaminPhone" className="form-control form-control-sm phoneNoLimit"  name="zaminPhone" required />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> شغل :</label>
                                <input  type="text" className="form-control form-control-sm" id="zaminJob" name="zaminJob" required />
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border rounded p-1" style={{border:"1px dashed red !important;"}}>
                <legend  className="float-none w-auto legendLabel p-0 mb-0" style={{fontSize:"14px", fontWeight:"bold", color:"red"}}> تامین کننده قبلی، کالاهای مورد نیاز خویش  را نام ببرید  </legend>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> نام   :</label>
                                <input  type="text" id="lastSuppName"  className="form-control form-control-sm"  name="lastSuppName" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> تلفن    :</label>
                                <input  type="text" id="lastSuppPhone"   className="form-control form-control-sm phoneNoLimit" name="lastSuppPhone" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="mb-1 mt-1">
                                <label htmlFor="shenasahmilli" className="form-label check-request-label cheque-label" data-toggle="tooltip" data-placement="bottom"> آدرس  :</label>
                                <input  type="text" className="form-control form-control-sm" id="lastSuppAddress" name="lastSuppAddress" />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <button type="button" onClick={()=>submitRequestCheque()} className="btn btn-sm btn-danger m-2"> ثبت <FontAwesomeIcon icon={faCheckCircle} /> </button>
             </form>     
            </fieldset>
         </div>
      </div>
    </div>
    </>

)
}