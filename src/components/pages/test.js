import React, { useState, useEffect } from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { Link } from "react-router-dom";
import axios from "axios";


export default function EditProfile() {
    const [activeTab, setActiveTab] = useState(0);
    const [haqiqiCustomerInfo, setHaqiqiCustomerInfo] = useState(0);
    const [customerSn, setcustomerSn] = useState(localStorage.getItem("psn"));
    const [haqiqiType, sethaqiqiType] = useState('haqiqi');

    console.log("target", haqiqiCustomerInfo)

  

    const [haqiqiData, sethaqiqiData] = useState({
        customerName: '',
        familyName: '',
        codeMilli: '',
        codeEqtisadi: '',
        codeNaqsh: '',
        address: '',
        codePosti: '',
        email: ''
    });

    const [updateHqiqiData, setUpdateHqiqiData] = useState({});

    const haqiqiInputChange = (e) => {
    const { name, value } = e.target;
        sethaqiqiData({
            ...haqiqiData,
            [name]: value
        });
    };

    const submitHaqiqiCustomer = (e) => {
        e.preventDefault();
        axios.get(`https://starfoods.ir/api/storeHaqiqiCustomerApi`,{params:{
            customerName : document.getElementById("haqiqiName").value,
            psn: document.getElementById("haqiqiPsn").value,
            customerType : document.getElementById("haqiqiType").value,
            familyName : document.getElementById("haqiqiFamily").value,
            codeMilli : document.getElementById("haqiqiCodeMilli").value,
            codeEqtisadi : document.getElementById("haqiqiEconomicCode").value,
            codeNaqsh : document.getElementById("haqiqiCodeNaqsh").value,
            address : document.getElementById("hqiqiAddress").value,
            codePosti : document.getElementById("haqiqiPostalCode").value,
            email : document.getElementById("haqiqiEmail").value,
        }})
          .then((response) => {
              setUpdateHqiqiData(response.data.exacHaqiqi)
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      };
      

    const handleSelect = (index) => {
        setActiveTab(index);
    };

    useEffect(() => {
        axios.get("https://starfoods.ir/api/getCustomerOfficialInfo", {
            params: { psn: localStorage.getItem("psn") }
        })
            .then((data) => {
              setHaqiqiCustomerInfo(data.data.exacHaqiqi)
            })
    }, []);

if(localStorage.getItem("isLogedIn")){
    return (
      <>
        <Header />
        <Sidebar />
        <div className="container marginTop" style={{ borderRadius: "10px 10px 5px 5px" }}>
          <div className="editProfile">
            <ul className="nav nav-tabs editProfileTab">
                <li className="nav-item ">
                    <Link className={`nav-link tabLink ${activeTab === 0 ? 'active' : ''}`} onClick={() => handleSelect(0)} data-bs-toggle="tab" data-bs-target="#tab1">
                        اشخاص حقیقی
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link tabLink ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleSelect(1)} data-bs-toggle="tab" data-bs-target="#tab2">
                         اشخاص حقوقی
                    </Link>
                </li>
            </ul>
            <div className="tab-content">
                <div className={`tab-pane fade p-3 ${activeTab === 0 ? 'show active' : ''}`} id="tab1">
                    <div className="row mt-2">
                         <form onSubmit={submitHaqiqiCustomer}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="mt-2">
                                        <label htmlFor="name" className="form-label">نام:</label>
                                        <input id="haqiqiName" type="text" className="form-control form-control-sm"  value={haqiqiCustomerInfo && haqiqiCustomerInfo.customerName} onChange={haqiqiInputChange} name="customerName" />
                                        <input id="haqiqiPsn" type="hidden" value={customerSn} onChange={haqiqiInputChange} name="customerShopSn" />
                                        <input id="haqiqiType" type="hidden" value={haqiqiType} onChange={haqiqiInputChange} name="customerType"/>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="mt-2">
                                        <label htmlFor="familyName" className="form-label"> نام خانوادگی  :</label>
                                        <input id="haqiqiFamily" type="text" className="form-control form-control-sm" value={haqiqiCustomerInfo && haqiqiCustomerInfo.familyName} onChange={haqiqiInputChange}  name="familyName" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="mt-2">
                                         <label htmlFor="shenasahmilli" className="form-label"> شماره ملی   :</label>
                                        <input id="haqiqiCodeMilli" type="number" className="form-control form-control-sm" value={haqiqiCustomerInfo && haqiqiCustomerInfo.codeMilli} onChange={haqiqiInputChange}  name="codeMilli" />
                                     </div>
                                </div>
                                 <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="mt-2">
                                        <label htmlFor="economicCode" className="form-label"> کد اقتصادی :</label>
                                        <input id="haqiqiEconomicCode"type="number" className="form-control form-control-sm"  value={haqiqiCustomerInfo && haqiqiCustomerInfo.codeEqtisadi} onChange={haqiqiInputChange}  name="codeEqtisadi" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="mt-2">
                                        <label htmlFor="roleNo" className="form-label"> کد نقش :</label>
                                        <input id="haqiqiCodeNaqsh" type="number" className="form-control form-control-sm" value={haqiqiCustomerInfo && haqiqiCustomerInfo.codeNaqsh} onChange={haqiqiInputChange} name="codeNaqsh" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="mt-2">
                                        <label htmlFor="address" className="form-label"> آدرس :</label>
                                        <input id="hqiqiAddress" type="text" className="form-control form-control-sm" value={haqiqiCustomerInfo && haqiqiCustomerInfo.address} onChange={haqiqiInputChange} name="address" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="mt-2">
                                        <label htmlFor="postalCode" className="form-label">کد پستی :</label>
                                        <input id="haqiqiPostalCode" type="number" className="form-control form-control-sm" value={haqiqiCustomerInfo && haqiqiCustomerInfo.codePosti} onChange={haqiqiInputChange} name="codePosti" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="mt-2">
                                        <label htmlFor="email" className="form-label">ایمیل آدرس:</label>
                                        <input id="haqiqiEmail" type="email" className="form-control form-control-sm" value={haqiqiCustomerInfo && haqiqiCustomerInfo.email} onChange={haqiqiInputChange}  name="email" />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input type="submit" className="btn btn-sm btn-danger" value="ذخیره " />
                                </div>
                            </div>
                            </form>
                            
                            </div>
                        </div>

                        <div className={`tab-pane fade p-3 ${activeTab === 1 ? 'show active' : ''}`} id="tab2">
                           
                        </div>
                    </div >
                </div >
            </div >
          <Footer />
        </>
    )
}else{
    window.location.href="/login"
}
}


