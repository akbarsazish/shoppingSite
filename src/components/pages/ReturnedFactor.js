import React from "react";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";

export default function ReturnedFactor() {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop card">

                <div className="row p-2">
                    <div className="col-lg-12 text-start">
                        <Link to={-1} className="btn btn-danger btn-sm"> بازگشت < FontAwesomeIcon icon={faHistory} />  </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h4>فاکتورهای فروش </h4>
                        <table className="table table-sm table-bordered border-gray">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>فاکتور</th>
                                    <th> تاریخ </th>
                                    <th>وضعیت پرداخت </th>
                                    <th>مبلغ کل </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th> 1</th>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-lg-12 text-center">
                        <h4>فاکتورهای مرجوعی </h4>
                        <table className="table table-sm table-bordered border-gray">
                            <thead >
                                <tr>
                                    <th>#</th>
                                    <th>فاکتور</th>
                                    <th>تاریخ </th>
                                    <th>وضعیت پرداخت</th>
                                    <th>مبلغ کل</th>
                                    <th>نمایش</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>وضعیت پدراخت</td>
                                    <td></td>
                                    <td></td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    )
}