import React from "react";
import { Link } from "react-router-dom";
import { faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import starfood from "../../assets/images/starfood.png"
import gPlay from "../../assets/images/Gplay.png"
import bazar from "../../assets/images/bazar.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';

export default function Login(props) {
    const [deviceInfo,setDeviceInfo]=useState('');
    const [customerId,setCustomerId]=useState(0);
    const [userToken,setUserToken]=useState(0);
    const deviceDialog = document.getElementById("favDialog");
    const introducerDialog = document.getElementById("introducerDialog");
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });
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
        // e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
            token:localStorage.getItem("isLogedIn")
        }
<<<<<<< HEAD
        axios.get("http://192.168.10.33:8080/api/loginApi", {params:data}).then(res => {
=======
        axios.get("https://starfoods.ir/api/loginApi", {params:data}).then(res => {
>>>>>>> f83647e99b3e1e000c20e6f29e0afa46abf509e1

            if(res.data.loginInfo){
                if(res.data.loginInfo.length>0){
                    setUserToken(res.data.token)
                    localStorage.setItem("isLogedIn",res.data.token);
                    setCustomerId(res.data.psn)
                    setDeviceInfo(res.data.loginInfo.map((element,index)=>
                       <tr key={index}>
                         <td>{element.platform}</td>
                         <td>{element.browser}</td>
                         <td><input style={{width:"28px", height:"28px"}} className="select-to-logout" type="radio" onChange={()=>{setUserToken(element.sessionId);setCustomerId(element.customerId); setIsButtonDisabled(false)}} name="removeDevice" /></td>
                       </tr>
                    ))
                    deviceDialog.showModal();
                }
                else {
                    alert("Email or password is incorrect.");
                }
            }
            
            if(res.data.introducerCode){
                setCustomerId(res.data.psn)
                setUserToken(res.data.token)
                introducerDialog.showModal();
            }
            if(res.data.isSuccessfull == 1) {
                localStorage.setItem("isLogedIn",res.data.token);
                localStorage.setItem('userName', res.data.username);
                localStorage.setItem('psn', res.data.psn);
                localStorage.setItem("buyAmount",res.data.countBuy);
               window.location.href="/home"
            }
            if (res.data.logedInBefore) {
                localStorage.setItem("isLogedIn",res.data.token);
                localStorage.setItem('userName', res.data.username);
                localStorage.setItem('psn', res.data.psn);
                localStorage.setItem("buyAmount",res.data.countBuy);
               window.location.href="/home"
            }

            if (res.data.isSuccessfull===0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'اوه ... ',
                        text: res.data.message,
                    });
            }
        });
    }

    const saveIntroduceCode=()=>{
<<<<<<< HEAD
        axios.get("http://192.168.10.33:8080/api/addIntroducerCode", {params:{
=======
        axios.get("https://starfoods.ir/api/addIntroducerCode", {params:{
>>>>>>> f83647e99b3e1e000c20e6f29e0afa46abf509e1
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

<<<<<<< HEAD
    const confirmBrowserLogOut=()=>{
        axios.get("http://192.168.10.33:8080/api/logOutConfirm", {params:{
=======
    const confirmBrowserLogOut=()=> {
        axios.get("https://starfoods.ir/api/logOutConfirm", {params:{
>>>>>>> f83647e99b3e1e000c20e6f29e0afa46abf509e1
            customerId:customerId,
            token:userToken
        }}).then(res => {
            localStorage.setItem("isLogedIn",res.data.token);
            localStorage.setItem('userName', res.data.username);
            localStorage.setItem('psn',customerId);
            localStorage.setItem("buyAmount",res.data.buyAmount);
            window.location.href="/home";
        })
    }

    return (
        <>
            <div className="containerFluid" style={{ height: "100vh", width: "100%", backgroundColor:"#ff0014"}}>
                <div className="loginWaper p-5">
                    <div className="login">
                        <div className="loginHeader text-center">
                            <img src={starfood} className="loginLogo p-2" alt="contact" />
                            <h4 className="loginEnter p-2">ورود به استارفود</h4>
                        </div>
                        <div className="loginBody py-2 px-4 text-center">
                            <label className="text-start" style={{ float: "right" }}>  شماره موبایل</label>
                            <input className="form-control form-control-sm" autoComplete="off" name="email" type="text"  onChange={handleInput} value={loginInput.email} placeholder="09120000000" aria-label=".form-control-sm example" />
                            <label className="text-start mt-2" style={{ float: "right" }}> کلمه عبور </label>
                            <input name="password" autoComplete="off" className="form-control form-control-sm" type="password"  onChange={handleInput} value={loginInput.password} asp-for="Password" placeholder="کلمه عبور خود را وارد نمایید" required /> <br></br>
                            <button type="button"  onClick={()=>{loginSubmit()}} className="btn btn-dark btn-sm"> <FontAwesomeIcon icon={faUnlockAlt} /> ورود به استار فود</button>
                        </div>
                        <div className="loginFooter p-1">
                            <div className="text-center my-2">
                                <Link to="" className="btn btn-dark btn-sm m-1">
                                    <img className="downloadImg" alt="download-img" src={gPlay} />  <img alt="download-img" className="downloadImg" src={bazar} /> <br /> دانلود  نسخه اندروید
                                </Link>
                                <Link to="" className="btn btn-dark btn-sm">
                                    IOS  <FontAwesomeIcon className="downloadIcon" icon={faApple} /> <br /> دانلود نسخه ویب آپ
                                </Link>
                            </div>
                            <Link className="loginContact" to="tel://02148286"> <FontAwesomeIcon className="contactIconLogin p-1 fs-6" icon={faPhone} />  <b>ارتباط :</b>  48286-021 </Link >
                            <Link className="loginContact mb-2" to="tel://02149973000"> <FontAwesomeIcon className="contactIconLogin p-1 fs-6" icon={faUser} /> <b>پشتیبان :</b>     49973000-021 </Link >
                        </div>
                    </div>
                </div>
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
                    <form>
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
