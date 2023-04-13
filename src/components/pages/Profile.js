import { faEdit, faHeart, faHistory, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import profile from "../../assets/images/profile.png"
import Footer from "../genrealComponent/Footer"
import Header from "../genrealComponent/Header"
import Sidebar from "../genrealComponent/Sidebar"
export default function Profile() {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop">
                <div className="profile">
                    <div className="profileRightPart shadow card">
                        <div className="profileHeader text-center">
                            <img className="profilePic" alt="عکس یوزر" src={profile} />
                            <p className="userName"> سایت یوزر </p>
                        </div> <br />
                        <div className="profileInfo border-top mx-2">
                            <div className="profileInfoItems">
                                همراه: 09100473242
                            </div>
                            <div className="profileInfoItems">
                                تلفن ثابت : 021021458
                            </div>
                        </div>
                        <div className="profileInfo border-top mx-2">
                            <div className="profileInfoItems">
                                شناس نامه
                            </div>
                            <div className="profileInfoItems">
                                <Link className="editProfile" to="/editProfile">  ویرایش <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> </Link>
                            </div>
                        </div>
                        <div className="profileFooter text-center">
                            <div className="profileItems">
                                <Link className="profileFooterIcon">  کد معرف: 2020 <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> </Link>
                            </div>
                            <div className="profileItems">
                                <Link className="profileFooterIcon" to="/returnedFactor">  فاکتورهای برگشتی  <FontAwesomeIcon icon={faHistory}></FontAwesomeIcon> </Link>
                            </div>
                            <div className="profileItems">
                                <Link className="profileFooterIcon" to="/favorite">  علاقه مندیها  <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> </Link>
                            </div>
                        </div>
                    </div>
                    <div className="profileLeftPart card">
                        <h5 className="tableTitle"> فاکتور های ثبت شده </h5>
                        <table class="table table-bordered table-sm factorTable">
                            <thead className="tableHeader">
                                <tr>
                                    <th> ردیف </th>
                                    <th>شماره </th>
                                    <th>تاریخ </th>
                                    <th>تاریخ تحویل </th>
                                    <th> مبلغ  </th>
                                    <th> عملیات پرداخت </th>
                                    <th> جزئیات </th>
                                </tr>
                            </thead>
                            <tbody className="tableBody">
                                <tr>
                                    <th>1</th>
                                    <td>0210212</td>
                                    <td>22/1/1402</td>
                                    <td>22/1/1402</td>
                                    <td> 12990000 </td>
                                    <td> صورت گرفت </td>
                                    <td> ندارد </td>
                                </tr>
                            </tbody>
                        </table>

                        <h5 className="tableTitle"> فاکتور های در انتظار ارسال </h5>
                        <table class="table table-bordered table-sm factorTable">
                            <thead className="tableHeader">
                                <tr>
                                    <th> ردیف </th>
                                    <th>شماره </th>
                                    <th>تاریخ </th>
                                    <th>تاریخ تحویل </th>
                                    <th> مبلغ  </th>
                                    <th> عملیات پرداخت </th>
                                    <th> جزئیات </th>
                                </tr>
                            </thead>
                            <tbody className="tableBody">
                                <tr>
                                    <th>1</th>
                                    <td>0210212</td>
                                    <td>22/1/1402</td>
                                    <td>22/1/1402</td>
                                    <td> 12990000 </td>
                                    <td> صورت گرفت </td>
                                    <td> ندارد </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}