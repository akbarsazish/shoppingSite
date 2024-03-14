import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { faPhone, faUser, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import starfood from "../../assets/images/starfood.png"
import gPlay from "../../assets/images/Gplay.png"
import bazar from "../../assets/images/bazar.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';
import "../../assets/css/login.css"

export default function Login(props) {
    const [deviceInfo,setDeviceInfo]=useState('');
    const [customerId,setCustomerId]=useState(0);
    const [userToken,setUserToken]=useState(0);
    const deviceDialog = document.getElementById("favDialog");
    const introducerDialog = document.getElementById("introducerDialog");
    const [loginInput, setLogin] = useState({ email: '',  password: '',  error_list: [],});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const hideModal=()=>{
        deviceDialog.close("animalNotChosen");
    }

    const hideIntroducerModal=()=>{
        introducerDialog.close();
    }

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        const data = {
            email: loginInput.email,
            password: loginInput.password,
            token: localStorage.getItem("isLogedIn"),
            browser:'',
            isAndroid:0
        };

    
        axios.get("https://starfoods.ir/api/loginApi", { params: data })
            .then(res => {
                console.log("looking for token", res.data)
                if (res.data.loginInfo && res.data.loginInfo.length > 0) {
                    setUserToken(res.data.token);
                    localStorage.setItem("isLogedIn", res.data.token);
                    setCustomerId(res.data.psn);
                    setDeviceInfo(res.data.loginInfo.map((element, index) => (
                        <tr key={index}>
                            <td>{element.platform}</td>
                            <td>{element.browser}</td>
                            <td>
                            <input style={{ width: "28px", height: "28px" }} className="select-to-logout" type="radio" name="removeDevice"
                                    onChange={() => {
                                        setUserToken(element.sessionId);
                                        setCustomerId(element.customerId);
                                        setIsButtonDisabled(false);
                            }}/>
                            </td>
                        </tr>
                    )));
                    deviceDialog.showModal();
                } else if (res.data.introducerCode) {
                    setCustomerId(res.data.psn);
                    setUserToken(res.data.token);
                    introducerDialog.showModal();
                } else if (res.data.isSuccessfull === 1 || res.data.logedInBefore) {
                    localStorage.setItem("isLogedIn", res.data.token);
                    localStorage.setItem('userName', res.data.username);
                    localStorage.setItem('psn', res.data.psn);
                    localStorage.setItem("buyAmount", res.data.countBuy);
                    window.location.href = "/home";
                } else if (res.data.isSuccessfull === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'اوه ... ',
                        text: res.data.message,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: "شماره تماس و یا کلمه عبور شما اشتباه است!",
                        });
                }
            })
            .catch(error => {
                console.error("An error occurred during login:", error);
            });
    };
    

    const saveIntroduceCode=()=>{
        axios.get("https://starfoods.ir/api/addIntroducerCode", {params:{
            introCode:document.getElementById("introducerCode").value,
            customerId:customerId,
            token:userToken
        }}).then(res => {
            localStorage.setItem("isLogedIn",userToken);
            localStorage.setItem('userName', res.data.username);
            localStorage.setItem('psn',customerId);
            localStorage.setItem("buyAmount",res.data.buyAmount);
            window.location.href="/home"
        })
        introducerDialog.close();
    }

    const confirmBrowserLogOut=()=> {
        axios.get("https://starfoods.ir/api/logOutConfirm", {params:{
            customerId:customerId,
            token:userToken,
            isAndroid:0,
            exitterToken:localStorage.getItem("isLogedIn"),
            browser:''
        }}).then(res => {
            console.log("confirm logout", res.data)
            localStorage.setItem("isLogedIn",res.data.token);
            localStorage.setItem('userName', res.data.username);
            localStorage.setItem('psn',customerId);
            localStorage.setItem("buyAmount",res.data.buyAmount);
            window.location.href="/home";
        })
    }

    const handleDownloadClick = () => {
        const apkLink = document.createElement('a');
        apkLink.href = 'https://starfoods.ir/api/downloadApk'; 
        apkLink.download = 'starfood001.apk';
        apkLink.click();
    };
   
    const createBubble = () => {
        const section = document.querySelector("section");
        const createElement = document.createElement("span");
        var size = Math.random() * 60;
    
        createElement.classList.add("bubbleSpan");
        createElement.style.animation = "bubbleAnimation 6s linear infinite";
        createElement.style.width = 180 + size + "px";
        createElement.style.height = 180 + size + "px";
        createElement.style.left = Math.random() * window.innerWidth + "px";
        section.appendChild(createElement);
    
        setTimeout(() => {
          createElement.remove();
        }, 4000);
      };
    
      useEffect(() => {
        const intervalId = setInterval(createBubble, 1000);
        return () => {
          clearInterval(intervalId);
        };
      }, []);

// loginWaper loginEnter
    return (
        <>
            <div className="containerFluid" style={{ height: "100vh", width: "100%", backgroundColor:"#ff0014"}}>
                <section className="login-container">
                    <div className="login">
                        <div className="text-center">
                            <img src={starfood} className="logo-img" alt="logo" />
                            <h3 className="login-label">ورود به استار فود </h3>
                        </div>
                        <div className="text-center">
                            <label className="label">  شماره موبایل </label>
                            <input className="login-input" autoComplete="off" name="email" type="text"  onChange={handleInput} value={loginInput.email} placeholder="09120000000" aria-label=".form-control-sm example" />
                            <label className="label"> کلمه عبور </label>
                            <input className="login-input" name="password" autoComplete="off" type="password"  onChange={handleInput} value={loginInput.password} asp-for="Password" placeholder="کلمه عبور خود را وارد نمایید" required /> <br></br>
                            <button type="button"  onClick={()=>{loginSubmit()}} className="btn btn-dark btn-md"> <FontAwesomeIcon icon={faUnlockAlt} /> ورود به استار فود</button>
                        </div>
                        <div className="loginFooter mt-4">
                            <div className="text-center">
                                <button onClick={handleDownloadClick} className="btn btn-dark btn-sm m-1">
                                    <img className="downloadImg" alt="download-img" src={gPlay} />  <img alt="download-img" className="downloadImg" src={bazar} /> <br /> دانلود  نسخه اندروید
                                </button>
                                <a href="appGuid" target="" className="btn btn-dark btn-sm">
                                    IOS  <FontAwesomeIcon className="downloadIcon" icon={faApple} /> <br /> دانلود نسخه ویب آپ
                                </a>
                            </div>
                            <Link className="contact-label" to="tel://02148286"> <FontAwesomeIcon className="contactIconLogin p-1 fs-6" icon={faPhone} />  <b>ارتباط:</b>  48286-021 </Link >  &nbsp; &nbsp;
                            <Link className="contact-label" to="tel://02149973000"> <FontAwesomeIcon className="contactIconLogin p-1 fs-6" icon={faUser} /> <b>پشتیبان:</b>   49973000-021 </Link >
                        </div>
                    </div>
                </section>
            </div>

             <dialog id="favDialog" className="loginDialog">
                <table className="table table-sm table-striped table-bordered">
                   <thead>
                    <tr><th> سیستم عامل </th><th>مرورگر</th><th> انتخاب</th></tr>
                   </thead>
                   <tbody>{deviceInfo}</tbody>
                </table>
             <div>
               <button className="btn btn-sm btn-danger" id="cancel" onClick={()=>hideModal()} style={{marginLeft:"10px"}} type="reset">خیر</button>
              <button id="continue" disabled={isButtonDisabled} className="btn btn-sm btn-success" onClick={()=>confirmBrowserLogOut()}>ادامه</button>
            </div>
            </dialog>

            <dialog className="loginDialog" id="introducerDialog" style={{width:'300px',margin:'0 auto'}}>
                <div>
                    <form className="login-form">
                        <div className="form-group my-2">
                            <label className="form-label">کد معرف</label>
                            <input className="form-control" id="introducerCode" ></input>
                        </div>
                        <button id="cancelIntroducer"  className="btn btn-sm btn-danger" onClick={()=>hideIntroducerModal()} style={{marginLeft:"10px"}} type="reset">خیر</button>
                        <button type="button" onClick={()=>saveIntroduceCode()} className="btn btn-sm btn-success">ادامه</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}
