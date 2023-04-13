import React from "react";
import { Link } from "react-router-dom";
import { faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import starfood from "../../assets/images/starfood.png"
import gPlay from "../../assets/images/Gplay.png"
import bazar from "../../assets/images/bazar.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faApple, faGooglePay } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
    return (
        <>
            <div className="containerFluid" style={{ height: "100vh", width: "100%" }}>
                <div className="loginWaper p-5">
                    <div className="login">
                        <div className="loginHeader text-center">
                            <img src={starfood} className="loginLogo p-2" alt="contact" />
                            <h4 className="loginEnter p-2">ورود به استارفود</h4>
                        </div>
                        <div className="loginBody py-2 px-4 text-center">
                            <label for="login" className="text-start" style={{ float: "right" }}>  شماره موبایل</label>
                            <input className="form-control form-control-sm" type="text" placeholder="09120000000" aria-label=".form-control-sm example" />
                            <label for="login" className="text-start mt-2" style={{ float: "right" }}>کلمه عبور</label>
                            <input name="password" className="form-control form-control-sm" type="password" asp-for="Password" placeholder="کلمه عبور خود را وارد نمایید" required /> <br></br>
                            <Link to="/home"> <button type="submit" className="btn btn-dark btn-sm"> <FontAwesomeIcon icon={faUnlockAlt} /> ورود به استار فود</button> </Link>
                        </div>
                        <div className="loginFooter p-1">
                            <div className="text-center my-2">
                                <Link to="" className="btn btn-dark btn-sm m-1">
                                    <img className="downloadImg" src={gPlay} />  <img className="downloadImg" src={bazar} /> <br /> دانلود  نسخه اندروید
                                </Link>
                                <Link to="" className="btn btn-dark btn-sm">
                                    IOS  <FontAwesomeIcon className="downloadIcon" icon={faApple} /> <br /> دانلود نسخه ویب آپ
                                </Link>
                            </div>
                            <Link className="loginContact" to="tel://02148286"> <FontAwesomeIcon className="contactIconLogin p-1 fs-6" icon={faPhone} />  <b>ارتباط :</b>  48286-021 </Link >
                            <Link className="loginContact" to="tel://02149973000"> <FontAwesomeIcon className="contactIconLogin p-1 fs-6" icon={faUser} /> <b>پشتیبان :</b>     49973000-021 </Link >

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
