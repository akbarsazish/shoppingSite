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
        axios.get("http://192.168.10.27:8080/api/loginApi", {params:data}).then(res => {
            console.log(res);

            if(res.data.loginInfo){
                if(res.data.loginInfo.length>0){
                    console.log(res.data)
                    setUserToken(res.data.token)
                    localStorage.setItem("isLogedIn",res.data.token);
                    setCustomerId(res.data.psn)
                    setDeviceInfo(res.data.loginInfo.map((element,index)=>
                    <>
                       <tr>
                        <td>{element.platform}</td>
                        <td>{element.browser}</td>
                        <td><input type="radio" onChange={()=>{setUserToken(element.sessionId);setCustomerId(element.customerId);}} name="removeDevice"></input></td>
                       </tr>
                    </>))
                    deviceDialog.showModal();
                }
            }
            if(res.data.introducerCode){
                setCustomerId(res.data.psn)
                setUserToken(res.data.token)
                introducerDialog.showModal();
            }
            if (res.data.isSuccessfull) {
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

            if (res.data.Allowed===0) {
                alert(res.data.message)
            }
        });
    }

    const saveIntroduceCode=()=>{
        axios.get("http://192.168.10.27:8080/api/addIntroducerCode", {params:{
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

    const confirmBrowserLogOut=()=>{
        axios.get("http://192.168.10.27:8080/api/logOutConfirm", {params:{
            customerId:customerId,
            token:userToken
        }}).then(res => {

            localStorage.setItem("isLogedIn",res.data.token);
            localStorage.setItem('userName', res.data.username);
            localStorage.setItem('psn',customerId);
            localStorage.setItem("buyAmount",res.data.buyAmount);
            window.location.href="/home"
        })
    }


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
                            <label className="text-start" style={{ float: "right" }}>  شماره موبایل</label>
                            <input className="form-control form-control-sm" autoComplete="off" name="email" type="text"  onChange={handleInput} value={loginInput.email} placeholder="09120000000" aria-label=".form-control-sm example" />
                            <label className="text-start mt-2" style={{ float: "right" }}> کلمه عبور </label>
                            <input name="password" autoComplete="off" className="form-control form-control-sm" type="password"  onChange={handleInput} value={loginInput.password} asp-for="Password" placeholder="کلمه عبور خود را وارد نمایید" required /> <br></br>
                            <button type="button"  onClick={()=>{loginSubmit()}} className="btn btn-dark btn-sm"> <FontAwesomeIcon icon={faUnlockAlt} /> ورود به استار فود</button>
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

             <dialog id="favDialog" className="loginDialog">
                <table className="table table-sm table-striped table-bordered">
                   <tr>
                      <th> انتخاب  </th>
                     <th> مرورگر  </th>
                     <th> سیستم عامل </th>
                   </tr>
                   <tbody>
                       {deviceInfo}
                   </tbody>
                </table>   
             <div>
               <button className="btn btn-sm btn-danger" id="cancel" onClick={()=>hideModal()} style={{marginLeft:"10px"}} type="reset">خیر</button>
                <button className="btn btn-sm btn-success" onClick={()=>confirmBrowserLogOut()}>ادامه</button>
            </div>
            </dialog>

            <dialog id="introducerDialog" style={{width:'300px',margin:'0 auto'}}>
                <div>
                    <form>
                        <div className="form-group">
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
