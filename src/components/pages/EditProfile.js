import React, { useState } from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { Link } from "react-router-dom";


export default function EditProfile() {
    const [activeTab, setActiveTab] = useState(0);
    const handleSelect = (index) => {
        setActiveTab(index);
    };

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
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="name" className="form-label">نام:</label>
                                            <input type="text" className="form-control form-control-sm" id="name" name="name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="familyName" className="form-label"> نام خانوادگی  :</label>
                                            <input type="text" className="form-control form-control-sm" id="familyName" name="familyName" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="shenasahmilli" className="form-label"> شماره ملی   :</label>
                                            <input type="number" className="form-control form-control-sm" id="shenasahmilli" name="codeMilli" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="economicCode" className="form-label"> کد اقتصادی :</label>
                                            <input type="number" className="form-control form-control-sm" id="economicCode" name="codeEqtisadi" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="roleNo" className="form-label"> کد نقش :</label>
                                            <input type="number" className="form-control form-control-sm" id="roleNo" name="codeNaqsh" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="address" className="form-label"> آدرس :</label>
                                            <input type="text" className="form-control form-control-sm" id="address" name="address" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="postalCode" className="form-label">کد پستی :</label>
                                            <input type="number" className="form-control form-control-sm" id="postalCode" name="codePosti" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="email" className="form-label">ایمیل آدرس:</label>
                                            <input type="email" className="form-control form-control-sm" id="email" name="email" />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input type="submit" className="btn btn-sm btn-success" value="ذخیره " />
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className={`tab-pane fade p-3 ${activeTab === 1 ? 'show active' : ''}`} id="tab2">
                            <div className="row">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="company" className="form-label">نام شرکت :</label>
                                            <input type="company" className="form-control form-control-sm" id="company" name="companyName" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="shenasahmilli" className="form-label"> شناسه ملی   :</label>
                                            <input type="number" className="form-control form-control-sm" id="shenasahmilli" name="shenasahMilli" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="economicCode" className="form-label"> کد اقتصادی :</label>
                                            <input type="number" className="form-control form-control-sm" id="economicCode" name="codeEqtisadi" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="roleNo" className="form-label"> کد نقش :</label>
                                            <input type="number" className="form-control form-control-sm" id="roleNo" name="codeNash" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="registerNo" className="form-label"> شماره ثبت :</label>
                                            <input type="number" className="form-control form-control-sm" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="address" className="form-label"> آدرس :</label>
                                            <input type="text" className="form-control form-control-sm" id="address" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="postalCode" className="form-label">کد پستی :</label>
                                            <input type="number" className="form-control form-control-sm" id="postalCode" name="codePosti" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mt-2">
                                            <label for="email" className="form-label">Email:</label>
                                            <input type="email" className="form-control form-control-sm" id="email" name="email" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input type="submit" className="btn btn-sm btn-success" value="ذخیره" />
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >

            <Footer />
        </>
    )
}