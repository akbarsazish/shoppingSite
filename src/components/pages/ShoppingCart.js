import React, { useState,useEffect } from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import indianRice from "../../assets/images/indianRice.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"
import Footer from "../genrealComponent/Footer";
import axios  from "axios";

export default function ShoppingCart(props) {
    const [isLoad,setLoad]=useState(0)
    const [cartItems,setCartItems]=useState(0)
    const [allMoney,setAllMoney]=useState(0)
    const [currencyName,setCurrencyName]=useState('تومان')
    const [allProfit,setAllProfit]=useState(0)
    

    useEffect(()=>{
        axios.get("http://192.168.10.27:8080/api/cartsList").then((data)=>{

        let currency=data.data.currency;

        setCurrencyName(data.data.currencyName)

        setAllMoney(data.data.orders.reduce((accomulator,currentValue)=>accomulator+parseInt(currentValue.Price/currency),0))

        let allMoneyProfit=(data.data.orders.reduce((accomulator,currentValue)=>{
            if((currentValue.Price>0 && currentValue.Price1>0 ) && (currentValue.Price1>currentValue.Price)){
                accomulator += parseInt(currentValue.Price/currency)
                }
            return accomulator;},0))

            let allMoneyNoProfit=(data.data.orders.reduce((accomulator,currentValue)=>{
                if((currentValue.Price>0 && currentValue.Price1>0 ) && (currentValue.Price1>currentValue.Price)){
                    accomulator += parseInt(currentValue.Price1/currency)
                    }
                return accomulator;},0))
                setAllProfit(parseInt(allMoneyNoProfit)-parseInt(allMoneyProfit))
        setCartItems(data.data.orders.map((element)=>   <div className="shoppingItem" id={element.GoodSn+'cartDiv'} ref={props.cartRef}>
                                                            <div className="firstItem text-center">
                                                                <img className="shoppedImge" src={"https://starfoods.ir/resources/assets/images/kala/"+element.GoodSn+"_1.jpg"} alt="slider " />
                                                            </div>
                                                            <div className="secondItem">
                                                                <p className="shoppingItemName" style={{ fontWeight: "bold", fontSize: "14px" }}> {element.GoodName} </p>
                                                                <button className="btn btn-sm btn-info selectAmount" onClick={()=>props.showUpdateBuyModal(element.GoodSn,element.SnOrderBYS)} data-bs-toggle="modal" data-bs-target="#exampleModal"> {parseInt(element.PackAmount)+' '+element.secondUnitName+' معادل '+parseInt(element.Amount)+' '+element.UName} <FontAwesomeIcon icon={faShoppingCart} />  </button>
                                                                <p className="shoppingPrice" style={{ marginTop: "8px", color: "#00712e" }} > {parseInt(element.Fi/currency).toLocaleString()} {data.data.currencyName}</p>
                                                                <p className="shoppingPrice" style={{ fontWeight: "bold" }}> {parseInt(element.Price/currency).toLocaleString()} {data.data.currencyName}</p>
                                                            </div>
                                                            <div className="thirdItem">
                                                                <FontAwesomeIcon className="text-danger" onClick={()=>props.deleteOrder(element.SnOrderBYS,element.GoodSn)} style={{ margin: "10px", cursor: "pointer", fontSize: "19px" }} icon={faTrashAlt} />
                                                            </div>
                                                        </div>))    
    })
    },[isLoad]);
    props.setAllMoneyToLocaleStorage(allMoney);
    props.setAllProfitToLocaleStorage(allProfit);
    return (
        <>
            <Header />
            <Sidebar />

            <div className="container marginTop">
                <h5 className="fw-bold"> سبد خرید : </h5>
                <div className="shoppingCart p-2">
                    <div className="shoppingRight">
                        <div className="shoppingItems">
                            {cartItems}
                        </div>
                    </div>
                    <div className="shoppingLeft">
                        <div className="shoppingLefFirst">
                            <h6 className="payAbleTitle"> مبلغ قابل پرداخت </h6>
                            <p className="payAbleAmount"> {parseInt(allMoney).toLocaleString()} {currencyName} </p>
                        </div>
                        <div className="shoppingLeftSecond">
                            <div>
                                <Link to="/shipping" type="button" id="continueBuyBtn" className="btn btn-sm btn-danger mt-3 continueBtn"> ادامه خرید <FontAwesomeIcon icon={faShoppingCart} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="yourBenefit">
                    <p className="benfitTitle mb-0"> سود شما از این خرید {allProfit.toLocaleString()} تومان  </p>
                </div>
            </div>
            <Footer />
            {true &&
            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog buyModal">
                    <div className="modal-content">
                        <div className="modal-body">
                        <div id='unitStuffContainer' className="alert alert-danger buyButtonDiv">
                    {props.buyOption}
                </div>
                        </div>
                    </div>
                </div>
            </div>
}

        </>
    )
}