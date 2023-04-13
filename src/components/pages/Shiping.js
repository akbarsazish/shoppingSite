import React from "react";
import { Link } from "react-router-dom";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faIdCard, faMoon, faSun, faTruck } from "@fortawesome/free-solid-svg-icons";
export default function Shiping() {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop">
                <div className="shipigContainer">
                    <div className="shippingPart">
                        <div className="row">
                            <div className="col-2">
                                <p className="weekDay"> دوشنبه  </p>
                            </div>
                            <div className="col-10">
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                        9 صبح تا 4 بعد از ظهر &nbsp; <FontAwesomeIcon style={{ color: "orange", fontSize: "18px" }} icon={faSun} />
                                        <input className="form-check-input float-end mx-3 customRadio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                        9 صبح تا 4 بعد از ظهر &nbsp; <FontAwesomeIcon style={{ color: "green", fontSize: "18px" }} icon={faMoon} />
                                        <input className="form-check-input float-end mx-3 customRadio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shippingPart">
                        <div className="row">
                            <div className="col-2">
                                <p className="weekDay"> دوشنبه  </p>
                            </div>
                            <div className="col-10">
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                        9 صبح تا 4 بعد از ظهر &nbsp; <FontAwesomeIcon style={{ color: "orange", fontSize: "18px" }} icon={faSun} />
                                        <input className="form-check-input float-end mx-3 customRadio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                        9 صبح تا 4 بعد از ظهر &nbsp; <FontAwesomeIcon style={{ color: "green", marginTop: "5px", fontSize: "18px" }} icon={faMoon} />
                                        <input className="form-check-input float-end mx-3 customRadio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shipigContainer">
                    <div className="shippingPart">
                        <div className="row">
                            <div className="col-4">
                                <p className="weekDay">   تاریخ دلخواه   </p>
                            </div>
                            <div className="col-8">
                                <input className="form-control form-control-sm mt-2 mt-0" type="text" aria-label=".form-control-sm example" />
                            </div>
                        </div>
                    </div>
                    <div className="shippingPart">
                        <div className="row">
                            <div className="col-4">
                                <p className="weekDay">  انتخاب آدرس </p>
                            </div>
                            <div className="col-8">
                                <select className="form-select form-select-sm mt-2" style={{ width: "195px" }} aria-label=".form-select-sm example">
                                    <option selected className="text-end">  آدرس   </option>
                                    <option value="1">  تهران  </option>
                                    <option value="2"> شهریار </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shipingBottom">
                    <div className="shippingPartBottom">
                        <p className="weekDay"> انتخاب پرداخت   </p>
                    </div>
                    <div className="shippingPartBottom mt-2">
                        <div className="form-check">
                            <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                <input className="form-check-input float-end mx-1 mt-2 customRadio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                حضوری  <FontAwesomeIcon style={{ color: "green", marginTop: "5px", fontSize: "18px" }} icon={faTruck} />
                            </label>
                        </div>
                    </div>
                    <div className="shippingPartBottom">
                        <div className="form-check mt-2">
                            <label className="form-check-label text-start timeLabel" for="flexRadioDefault1">
                                <input className="form-check-input float-end mx-1 mt-2 customRadio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                غیر حضوری  <FontAwesomeIcon style={{ color: "green", marginTop: "5px", fontSize: "18px" }} icon={faIdCard} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="shipingBottom">
                    <div className="shippingPartBottom">
                        <p className="factorInfo"> قیمت کالا () </p>
                        <p className="factorInfo"> کیف تخفیف </p>
                        <p className="factorInfo"> تخفیف کالا ها </p>
                        <p className="factorInfo"> مبلغ قابل پرداخت</p>
                    </div>
                    <div className="shippingPartBottom mt-2">
                        <p className="factorInfo"> 234000 تومان  </p>
                        <p className="factorInfo"> 0 تومان  </p>
                        <p className="factorInfo text-danger"> 234000 تومان  </p>
                        <p className="factorInfo"> 234000 تومان  </p>
                    </div>
                    <div className="shippingPartBottom">
                        <Link to="/success"><button type="submit" className="btn btn-sm btn-danger mt-3 p-2 continueBtn" id="sendFactorSumbit" > <FontAwesomeIcon icon={faCheckCircle} /> ارسال فاکتور</button> </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
