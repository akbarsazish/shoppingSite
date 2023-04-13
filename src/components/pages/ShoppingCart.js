import React from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import indianRice from "../../assets/images/indianRice.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"
import Footer from "../genrealComponent/Footer";

export default function ShoppingCart() {
    return (
        <>
            <Header />
            <Sidebar />

            <div className="container marginTop">
                <h5 className="fw-bold"> سبد خرید : </h5>
                <div className="shoppingCart p-2">
                    <div className="shoppingRight">
                        <div className="shoppingItems">
                            <div className="shoppingItem">
                                <div className="firstItem text-center">
                                    <img className="shoppedImge" src={indianRice} alt="slider " />
                                </div>
                                <div className="secondItem">
                                    <p className="shoppingItemName" style={{ fontWeight: "bold", fontSize: "14px" }}> برنج خوشبخت هندی </p>
                                    <button className="btn btn-sm btn-danger selectAmount" > انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                                    <p className="shoppingPrice" style={{ marginTop: "8px", color: "#00712e" }} > 200 تومان</p>
                                    <p className="shoppingPrice" style={{ fontWeight: "bold" }}> 20000 تومان</p>
                                </div>
                                <div className="thirdItem">
                                    <FontAwesomeIcon className="text-danger" style={{ margin: "10px", cursor: "pointer", fontSize: "19px" }} icon={faTrashAlt} />
                                </div>
                            </div>
                            <div className="shoppingItem">
                                <div className="firstItem text-center">
                                    <img className="shoppedImge" src={indianRice} alt="slider " />
                                </div>
                                <div className="secondItem">
                                    <p className="shoppingItemName" style={{ fontWeight: "bold", fontSize: "14px" }}> برنج خوشبخت هندی </p>
                                    <button className="btn btn-sm btn-danger selectAmount" > انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                                    <p className="shoppingPrice" style={{ marginTop: "8px", color: "#00712e" }} > 200 تومان</p>
                                    <p className="shoppingPrice" style={{ fontWeight: "bold" }}> 20000 تومان</p>
                                </div>
                                <div className="thirdItem">
                                    <FontAwesomeIcon className="text-danger" style={{ margin: "10px", cursor: "pointer", fontSize: "19px" }} icon={faTrashAlt} />
                                </div>
                            </div>
                            <div className="shoppingItem">
                                <div className="firstItem text-center">
                                    <img className="shoppedImge" src={indianRice} alt="slider " />
                                </div>
                                <div className="secondItem">
                                    <p className="shoppingItemName" style={{ fontWeight: "bold", fontSize: "14px" }}> دستکش وينيل 50 عددي  لارج  </p>
                                    <button className="btn btn-sm btn-danger selectAmount" > انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                                    <p className="shoppingPrice" style={{ marginTop: "8px", color: "#00712e" }} > 200 تومان</p>
                                    <p className="shoppingPrice" style={{ fontWeight: "bold" }}> 20000 تومان</p>
                                </div>
                                <div className="thirdItem">
                                    <FontAwesomeIcon className="text-danger" style={{ margin: "10px", cursor: "pointer", fontSize: "19px" }} icon={faTrashAlt} />
                                </div>
                            </div>
                            <div className="shoppingItem">
                                <div className="firstItem text-center">
                                    <img className="shoppedImge" src={indianRice} alt="slider " />
                                </div>
                                <div className="secondItem">
                                    <p className="shoppingItemName" style={{ fontWeight: "bold", fontSize: "14px" }}> برنج خوشبخت هندی </p>
                                    <button className="btn btn-sm btn-danger selectAmount" > انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} />  </button>
                                    <p className="shoppingPrice" style={{ marginTop: "8px", color: "#00712e" }} > 200 تومان</p>
                                    <p className="shoppingPrice" style={{ fontWeight: "bold" }}> 20000 تومان</p>
                                </div>
                                <div className="thirdItem">
                                    <FontAwesomeIcon className="text-danger" style={{ margin: "10px", cursor: "pointer", fontSize: "19px" }} icon={faTrashAlt} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shoppingLeft">
                        <div className="shoppingLefFirst">
                            <h6 className="payAbleTitle"> مبلغ قابل پرداخت  </h6>
                            <p className="payAbleAmount"> 12300000 تومان </p>
                        </div>
                        <div className="shoppingLeftSecond">
                            <div>
                                <Link to="/shipping" type="button" id="continueBuyBtn" className="btn btn-sm btn-danger mt-3 continueBtn"> ادامه خرید <FontAwesomeIcon icon={faShoppingCart} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="yourBenefit">
                    <p className="benfitTitle mb-0"> سود شما از این خرید 120000 تومان  </p>
                </div>
            </div>

            <Footer />
        </>
    )
}