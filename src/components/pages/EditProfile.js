import React, { useState, useEffect } from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';


export default function EditProfile() {
    const [activeTab, setActiveTab] = useState(0);
    const [customerSn, setcustomerSn] = useState(localStorage.getItem("psn"));
    const [haqiqiType, sethaqiqiType] = useState('haqiqi');
    const [hoqoqiType, sethoqoiType] = useState('hoqoqi');
    
    const [haqiqiCustomerInfo, setHaqiqiCustomerInfo] = useState({
        customerName: '',
        familyName: '',
        codeMilli: '',
        codeEqtisadi: '',
        codeNaqsh: '',
        address: '',
        codePosti: '',
        email: ''
    });

    const haqiqiInputChange = (e) => {
    const { name, value } = e.target;
        setHaqiqiCustomerInfo({
            ...haqiqiCustomerInfo,
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
              setHaqiqiCustomerInfo(response.data.exacHaqiqi);
              Swal.fire({
                title: 'آیا معلومات ذخیره گردد؟',
                showDenyButton: true,
                confirmButtonText: 'بلی',
                denyButtonText: `خیر`,
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire('ذخیره شد!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('تغییرات ذخیره نگردید', '', 'info')
                }
              })
          })
          .catch((error) => {
              console.error('Error:', error);
          }); 
      };

    // Hoqoqi customer 
    const [hoqoqiCustomerInfo, setHoqoqiCustomerInfo]=useState({
       companyName: '',
       shenasahMilli: '',
       codeNaqsh: '',
       codePosti: '',
       address: ''
    });

    const hoqoqiInputChange = (e) => {
    const { name, value } = e.target;
    setHoqoqiCustomerInfo({
            ...hoqoqiCustomerInfo,
            [name]: value
        });
    };

    const submitHoqoqiCustomer = (e) => {
        e.preventDefault();
        axios.get(`https://starfoods.ir/api/storeHoqoqiCustomerApi`,{params:{
            companyName : document.getElementById("company").value,
            psn: document.getElementById("hoqoqiPsn").value,
            customerType : document.getElementById("hoqoqiType").value,
            shenasahMilli : document.getElementById("hoqoqiShenasahmilli").value,
            codeNaqsh : document.getElementById("hoqoqiCodeNaqsh").value,
            codePosti : document.getElementById("hoqoqiCostalCode").value,
            address : document.getElementById("address").value
        }})
          .then((response) => {
            setHoqoqiCustomerInfo(response.data.exactHoqoqi);
              Swal.fire({
                title: 'آیا معلومات ذخیره گردد؟',
                showDenyButton: true,
                confirmButtonText: 'بلی',
                denyButtonText: `خیر`,
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire('ذخیره شد!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('تغییرات ذخیره نگردید', '', 'info')
                }
              })
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
            setHoqoqiCustomerInfo(data.data.exactHoqoqi)
        })
    }, []);

if(localStorage.getItem("isLogedIn")){
    return (
      <>
        <Header />
        <Sidebar />
        <div className="container marginTop" style={{ borderRadius: "10px 10px 5px 5px" }}>
          <div className="editProfile rounded border">
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
                    <div className="row mt-2">
                      <form onSubmit={submitHoqoqiCustomer}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="mt-2">
                                    <label htmlFor="company" className="form-label">نام شرکت :</label>
                                    <input type="company" className="form-control form-control-sm" value={hoqoqiCustomerInfo && hoqoqiCustomerInfo.companyName} onChange={hoqoqiInputChange} id="company"  name="companyName"/>
                                    <input id="hoqoqiPsn" type="hidden" value={customerSn} onChange={hoqoqiInputChange} name="customerShopSn" />
                                    <input id="hoqoqiType" type="hidden" value={hoqoqiType} onChange={hoqoqiInputChange} name="customerType"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="mt-2">
                                    <label htmlFor="shenasahmilli" className="form-label"> شناسه ملی   :</label>
                                    <input type="number" className="form-control form-control-sm" value={hoqoqiCustomerInfo && hoqoqiCustomerInfo.shenasahMilli} onChange={hoqoqiInputChange}  id="hoqoqiShenasahmilli" name="shenasahMilli" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="mt-2">
                                    <label htmlFor="roleNo" className="form-label"> کد نقش :</label>
                                    <input type="number" className="form-control form-control-sm" value={hoqoqiCustomerInfo && hoqoqiCustomerInfo.codeNaqsh} onChange={hoqoqiInputChange}  id="hoqoqiCodeNaqsh" name="codeNaqsh" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="mt-2">
                                    <label htmlFor="postalCode" className="form-label">کد پستی :</label>
                                    <input type="number" className="form-control form-control-sm" value={hoqoqiCustomerInfo && hoqoqiCustomerInfo.codePosti} onChange={hoqoqiInputChange} id="hoqoqiCostalCode" name="codePosti" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="mt-2">
                                    <label htmlFor="address" className="form-label"> آدرس :</label>
                                    <input type="text" className="form-control form-control-sm" value={hoqoqiCustomerInfo && hoqoqiCustomerInfo.address} onChange={hoqoqiInputChange} id="address" name="address" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input type="submit" className="btn btn-sm btn-danger" value="ذخیره" />
                        </div>
                    </form>
                  </div>
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


