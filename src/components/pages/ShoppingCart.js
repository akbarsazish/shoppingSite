import React, { useState, useEffect } from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"
import Footer from "../genrealComponent/Footer";
import axios from "axios";
import Swal from 'sweetalert2';

export default function ShoppingCart(props) {
    const [cartItems, setCartItems] = useState(0)
    const [allMoney, setAllMoney] = useState(0)
    const [currencyName, setCurrencyName] = useState('تومان')
    const [allProfit, setAllProfit] = useState(0)
    const [minSalePriceFactor, setMinSalePriceFactor] = useState(0)
    const [intervalBetweenBuys, setIntervalBetweenBuys] = useState(0)
    const [changePriceState, setChangePriceState] = useState(2)
    const [snHDS, setSnHDS] = useState(0)
    const [buyOption, setBuyOption] = useState(0)
    const [changedItems, setChanedItems] = useState(0);

    useEffect(() => {
        axios.get("https://starfoods.ir/api/cartsList",{
            params:{
                psn:localStorage.getItem("psn")}})
            .then((data) => {
                
            let currency = data.data.currency;
            setMinSalePriceFactor(data.data.minSalePriceFactor)
            setCurrencyName(data.data.currencyName)
            setIntervalBetweenBuys(data.data.intervalBetweenBuys)
            setAllMoney(data.data.orders.reduce((accomulator, currentValue) => accomulator + parseInt(currentValue.Price / currency), 0))
            setChangePriceState(data.data.changedPriceState)
            setSnHDS(data.data.orders.length > 0 ? data.data.orders[0].SnHDS : 0)
        
            if(data.data.orders[0].Price > 0 && data.data.orders[0].Price1){
                let allMoneyProfit = data.data.orders.reduce((accumulator1, currentValue) => {
                    const price1 = parseInt(currentValue.Price1);
                    if(price1 > 0){
                    accumulator1 += price1 / parseInt(currency);
                    }
                    return accumulator1;
                }, 0);

                let allMoneyNoProfit = data.data.orders.reduce((accumulator, currentValue) => {
                    const price = parseInt(currentValue.Price);
                    if(price > 0){
                        accumulator += price / parseInt(currency);
                    }
                        return accumulator;
                    }, 0);


                if (allMoneyProfit > allMoneyNoProfit) {
                    setAllProfit(parseInt(allMoneyProfit) - parseInt(allMoneyNoProfit));
                } else {
                    console.error("Invalid data for profit calculation");
                }
            }

            setCartItems(data.data.orders.map((element) => <div className="shoppingItem" id={element.GoodSn + 'cartDiv'} ref={props.cartRef}>
                <div className="firstItem text-center">
                    <img className="shoppedImge" src={"https://starfoods.ir/resources/assets/images/kala/" + element.GoodSn + "_1.jpg"} alt="slider " />
                </div>
                <div className="secondItem">
                    <p className="shoppingItemName" style={{ fontWeight: "bold", fontSize: "14px" }}> {element.GoodName} </p>
                    <button className="btn btn-sm btn-info selectAmount" onClick={() => showUpdateBuyModal(element.GoodSn, element.SnOrderBYS)} data-bs-toggle="modal" data-bs-target="#exampleModal"> {parseInt(element.PackAmount) + ' ' + element.secondUnitName + ' معادل ' + parseInt(element.Amount) + ' ' + element.UName} <FontAwesomeIcon icon={faShoppingCart} />  </button>
                    <p className="shoppingPrice" style={{ marginTop: "8px", color: "#00712e" }} > {parseInt(element.Fi / currency).toLocaleString("fa-IR")} {data.data.currencyName}</p>
                    <p className="shoppingPrice" style={{ fontWeight: "bold" }}> {parseInt(element.Price / currency).toLocaleString("fa-IR")} {data.data.currencyName}</p>
                </div>
                <div className="thirdItem">
                    <FontAwesomeIcon className="text-danger" onClick={() => deleteOrder(element.SnOrderBYS, element.GoodSn)} style={{ margin: "10px", cursor: "pointer", fontSize: "19px" }} icon={faTrashAlt} />
                </div>
            </div>));
        
            setChanedItems(data.data.orders);
        })
    }, []);

    const changeCartsPrice = (snHDS) => {
        axios.get("https://starfoods.ir/api/updateChangedPrice", { 
            params: { SnHDS: snHDS,psn:localStorage.getItem("psn")}})
            .then((data) => {
            renewCarts();
          })  
    }

    const renewCarts = () => {
        axios.get("https://starfoods.ir/api/cartsList",{
            params:{psn:localStorage.getItem("psn")}})
            .then((data) => {
              let currency = data.data.currency;
              setMinSalePriceFactor(data.data.minSalePriceFactor)
              setCurrencyName(data.data.currencyName)
              setIntervalBetweenBuys(data.data.intervalBetweenBuys)
              setAllMoney(data.data.orders.reduce((accomulator, currentValue) => accomulator + parseInt(currentValue.Price / currency), 0))
              setChangePriceState(data.data.changedPriceState)
              setSnHDS(data.data.orders.length > 0 ? data.data.orders[0].SnHDS : 0)

            if(data.data.orders[0].Price > 0 && data.data.orders[0].Price1){
              let allMoneyProfit = data.data.orders.reduce((accumulator1, currentValue) => {
                 const price1 = parseInt(currentValue.Price1);
                 if(price1 > 0){
                   accumulator1 += price1 / parseInt(currency);
                 }
                  return accumulator1;
              }, 0);

              let allMoneyNoProfit = data.data.orders.reduce((accumulator, currentValue) => {
                  const price = parseInt(currentValue.Price);
                  if(price > 0){
                     accumulator += price / parseInt(currency);
                  }
                    return accumulator;
                }, 0);

                if (parseInt(allMoneyProfit) > parseInt(allMoneyNoProfit)) {
                    setAllProfit(allMoneyProfit - allMoneyNoProfit);
                } else {
                    console.error("Invalid data for profit calculation");
                }
            }
            
            setCartItems(data.data.orders.map((element) => <div className="shoppingItem" id={element.GoodSn + 'cartDiv'} ref={props.cartRef}>
                <div className="firstItem text-center">
                    <img className="shoppedImge" src={"https://starfoods.ir/resources/assets/images/kala/" + element.GoodSn + "_1.jpg"} alt="slider " />
                </div>
                <div className="secondItem">
                    <p className="shoppingItemName" style={{ fontWeight: "bold", fontSize: "14px" }}> {element.GoodName} </p>
                    <button className="btn btn-sm btn-info selectAmount" onClick={() => showUpdateBuyModal(element.GoodSn, element.SnOrderBYS)} data-bs-toggle="modal" data-bs-target="#exampleModal"> {parseInt(element.PackAmount) + ' ' + element.secondUnitName + ' معادل ' + parseInt(element.Amount) + ' ' + element.UName} <FontAwesomeIcon icon={faShoppingCart} />  </button>
                    <p className="shoppingPrice" style={{ marginTop: "8px", color: "#00712e" }} > {parseInt(element.Fi / currency).toLocaleString("fa-IR")} {data.data.currencyName}</p>
                    <p className="shoppingPrice" style={{ fontWeight: "bold" }}> {parseInt(element.Price / currency).toLocaleString("fa-IR")} {data.data.currencyName}</p>
                </div>
                <div className="thirdItem">
                    <FontAwesomeIcon className="text-danger" onClick={() => deleteOrder(element.SnOrderBYS, element.GoodSn)} style={{ margin: "10px", cursor: "pointer", fontSize: "19px" }} icon={faTrashAlt} />
                </div>
            </div>))
            setChanedItems(data.data.orders);
        })
      }

    const showUpdateBuyModal = (goodSn, snOrderBYS) => {
        fetch("https://starfoods.ir/api/getUnitsForUpdate/?Pcode=" + goodSn)
            .then(response => response.json())
            .then((data) => {
                let modalItems = [];
                for (let index = 1; index <= data.maxSale; index++) {
                    modalItems.push(<button data-bs-dismiss="modal" className="btn btn-sm btn-info buyButton" onClick={() => updateBuy(snOrderBYS, data.amountUnit * index, data.kalaId)}>{index + ' ' + data.secondUnit + ' معادل ' + ' ' + index * data.amountUnit + ' ' + data.defaultUnit}</button>)
                }
                const items = modalItems.map((item) => item)
                setBuyOption(items)
            })
    }

    const updateBuy = (orderId, amountUnit, goodSn) => {
        axios.get('https://starfoods.ir/api/updateOrderBYS',
            {
                params: {
                    kalaId: goodSn,
                    amountUnit: amountUnit,
                    orderBYSSn: orderId
                }
            }
        ).then((response) => {
            renewCarts()
        })
    }

    const deleteOrder = (orderBYSSn, goodSn) => {
        Swal.fire({
          title: '!آیا مطمئن هستید',
          text: "دیگر قادر به بازیابی این کالا نیستید؟",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'بلی ',
          cancelButtonText: 'خیر'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.get('https://starfoods.ir/api/deleteOrderBYS',
              {
                params: {
                  SnOrderBYS: orderBYSSn
                }
              }
            ).then((data) => {
              let countBought = parseInt(localStorage.getItem('buyAmount'));
              if (countBought > 0) {
                localStorage.setItem('buyAmount', countBought - 1);
                let cartDiv = document.getElementById(goodSn + "cartDiv");
                cartDiv.style.display = "none";
                renewCarts();
              }
            });
          }
        });
      };

    props.setAllMoneyToLocaleStorage(allMoney);
    props.setAllProfitToLocaleStorage(allProfit);

    if(localStorage.getItem("isLogedIn")){
        return (
            <>
                <Header />
                <Sidebar />
                <div className="container marginTop rounded">
                    <h5 className="fw-bold"> سبد خرید : </h5>
                    <div className="shoppingCart p-2">
                        <div className="shoppingRight">
                            <div className="shoppingItems">
                                {cartItems == "" || 0 ? <span className="empty-basket"> سبد خرید شما خالی است! </span> : cartItems}
                            </div>
                        </div>
                        <div className="shoppingLeft">
                            <div className="shoppingLefFirst">
                                <h6 className="payAbleTitle"> مبلغ قابل پرداخت </h6>
                                <p className="payAbleAmount"> {parseInt(allMoney ).toLocaleString("fa-IR")} {currencyName} </p>
                            </div>
                            <div className="shoppingLeftSecond">
                                <div>
                                    {((allMoney >= minSalePriceFactor || intervalBetweenBuys <= 12) & changePriceState===0)?
                                        <Link to="/shipping" type="button" className="btn btn-sm btn-danger mt-3 continueBtn"> ادامه خرید <FontAwesomeIcon icon={faShoppingCart}/></Link>
                                    :((allMoney <= minSalePriceFactor)?
                                        <Link to="#" type="button" className="btn btn-sm btn-danger mt-2 mx-0 px-1 less-than-amount"> مبلغ کمتر از حداقل است </Link>
                                        :
                                        <Link to="#" type="button"  data-bs-toggle="modal" data-bs-target="#myModal" className="btn btn-sm btn-danger mt-3"> ادامه خرید </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="yourBenefit">
                        <p className="benfitTitle mb-0"> سود شما از این خرید {allProfit.toLocaleString("fa-IR")} تومان  </p>
                    </div>
                       
                </div>

                <Footer />
                
                {true &&
                    <div className="modal fade " id="exampleModal" tabIndex="-1">
                        <div className="modal-dialog buyModal">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div id='unitStuffContainer' className="alert alert-danger buyButtonDiv">
                                        {buyOption}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div id="myModal" className="modal fade" role="dialog"  tabIndex="-1">
                    <div className="modal-dialog modal-dialog-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title text-center">کالاهای زیر تغییر قیمت دارند.</h6>
                            </div>
                            <div className="modal-body">
                                <ul className="list-group list-group-flush">
                                  {
                                  changedItems && changedItems.map((element) => {
                                        if (element.changedPrice !== 0) {
                                            return <li className="list-group-item" style={{ fontSize: "14px" }}> {element.GoodName}  </li>
                                        }
                                    })
                                  }
                                </ul>
                                <hr/>
                                <h6>در صورت ادامه با قیمت جدید ثبت خواهد شد.</h6>
                            </div>
                            <div className="modal-footer">
                                    <button type="button" className="btn btn-success float-end" onClick={()=>changeCartsPrice(snHDS)} data-bs-dismiss="modal">ادامه <i className="fa fa-repeat"></i></button>
                                <button type="button" className="btn btn-danger float-end" data-bs-dismiss="modal">خیر <i className="fa fa-xmark"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }else{
        window.location.href = '/login'
    }
}