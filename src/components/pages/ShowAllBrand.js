import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import starfood from "../../assets/images/starfood.png";
import 'swiper/swiper.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faBell, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const ShowAllBrand = (props)=> {
    const {brandId} = useParams();
    const [allBrand, setAllBrand] = useState([]);
    const [buyOption, setBuyOption]=useState(0);

        useEffect(() => {
            renewGroupItems();
        },[brandId])

        const requestProduct=(psn,goodSn,event)=>{
            axios.get("https://starfoods.ir/api/addRequestedProduct",{params:{
              customerId:psn,
              productId:goodSn
            }}).then((data)=>{
                renewGroupItems();
            })
          }
          
        const cancelRequestKala=(psn,goodSn,event)=>{
           axios.get("https://starfoods.ir/api/cancelRequestedProduct",{params:{
             psn:psn,
             gsn:goodSn
           }}).then((data)=>{
              renewGroupItems();
           })
        }

    const renewGroupItems=()=>{
      axios.get('https://starfoods.ir/api/getKalaOfBrand',{
        params: {
          psn:localStorage.getItem('psn'),
          brandId:brandId
        }})
        .then((data) => {
          setAllBrand(data.data.kala.map((element,index)=>
            <div key={index} className="groupingItem">
                <img className="topLeft" src={starfood} alt="slider" />
                {(element.Price4>0 & element.Amount>0) ? <span className="groupingTakhfif"> {parseInt(((element.Price4-element.Price3)*100)/element.Price4)}%</span>: ''}
                <Link to={"/descKala/"+element.GoodSn+"/"+brandId} className="groupingItemLink">
                    <img className="groupingItemsImg"
                        src={"https://starfoods.ir/resources/assets/images/kala/" + element.GoodSn + "_1.jpg"}
                        onError={(e) => { e.target.src = starfood; }} alt="slider" />
                </Link>

                <Link to={"/descKala/"+element.GoodSn+"/"+brandId} className="groupingItemTitleLink">
                    <p className="groupingItemTitle"> {element.GoodName} </p>
                </Link>
                
                <div className="groupingItemBottomInfo">
                    <div className="groupingItemInfo">
                      <FontAwesomeIcon onClick={(e) => props.changeHeartIconColor(element.GoodSn,e)} className={(element.favorite==='NO') ? 'defaultHeartIcon' :'favHeartIcon'} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} />
                    </div>
                    <div className="groupingItemInfo">
                    {parseInt(element.Amount) > 0 ? (
                        <>
                            <div className="price" style={{ color: "#39ae00" }}>
                                {parseInt(element.Price3 / 10).toLocaleString()}  تومان
                            </div>
                            {element.overLine === 1 && element.Price4 > 0 && (
                                <div className="price" style={{ color: "#ff2c50" }}>
                                    <del>{parseInt(element.Price4 / 10).toLocaleString()} تومان </del>
                                </div>
                            )}
                        </>
                    ) : (element.Amount > 0 || element.activePishKharid > 0 || element.freeExistance > 0) ? (
                        ''
                    ) : (
                        
                    parseInt(element.requested) === 0 ? 
                            <span className="prikalaGroupPricece fw-bold mt-1 float-start" id={"request" + element.GoodSn}>
                                <button value="0" id={"preButton" + element.GoodSn} onClick={(event) => requestProduct(localStorage.getItem("psn"), element.GoodSn, event)}
                                    className="btn btn-sm btn-danger selectAmount">
                                    خبرم کنید <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                                </button>
                            </span>
                         : 
                            <span className="prikalaGroupPricece fw-bold mt-1 float-start" id={"norequest" + element.GoodSn}>
                                <button
                                    value="1"
                                    id={"afterButton" + element.GoodSn}
                                    onClick={(event) => cancelRequestKala(localStorage.getItem("psn"), element.GoodSn, event)}
                                    className="btn btn-sm  selectAmount announced">
                                    اعلام شد <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                </button>
                            </span>
                       )}
                    </div>
                </div>
                
                <div className="groupingItemBottomBtn">
                    {element.activePishKharid<1
                        ?
                            (element.bought==="Yes" ?
                                <button className="btn btn-sm btn-info selectAmount"
                                  onClick={()=>showUpdateBuyModal(element.GoodSn,element.SnOrderBYS)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                     {parseInt(element.BoughtPackAmount)+" "+element.secondUnit +" معادل "+parseInt(element.BoughtAmount)+" "+ element.firstUnit} 
                                     <FontAwesomeIcon icon={faShoppingCart} />
                                </button>

                                :(element.callOnSale>0?
                                    <button  className="btn-add-to-cart">برای خرید تماس بگیرید <i className="far fa-shopping-cart text-white ps-2"></i></button>
                                    :((element.Amount>0 || element.activePishKharid>0 || element.freeExistance>0) 
                                        ?
                                        <button className="btn btn-sm btn-danger selectAmount" id={"buyButton"+element.GoodSn} onClick={(event)=>{showBuyModal(element.GoodSn,event)}}  data-bs-toggle="modal" data-bs-target="#exampleModal"> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} /></button>
                                        :
                                       <div className="c-product__add mt-0">
                                          <button className="btn btn-sm btn-dark selectAmount">ناموجود &nbsp; <i className="fas fa-ban"></i></button>
                                       </div>   
                                     )
                                )
                            )
                        : 'Result3'
                    }
                </div>
            </div>))
         })}

    const showBuyModal=(goodSn,event)=>{
        axios.get("https://starfoods.ir/api/getUnitsForUpdate",{params:{
            Pcode:goodSn,
            psn:localStorage.getItem("psn")
        }})
        .then((data) => {
        let modalItems=[];
            for (let index = 1; index <= data.data.maxSale; index++) {
            modalItems.push(
                <button data-bs-dismiss="modal" className="btn btn-sm btn-danger buyButton"
                 onClick={(e) =>buySomething(data.data.amountExist,data.data.freeExistance,data.data.zeroExistance,data.data.costLimit,data.data.costError,data.data.amountUnit*index,data.data.kalaId,data.data.defaultUnit,e,event)}>{index+' '+data.data.secondUnit+' معادل '+' '+index*data.data.amountUnit+' '+data.data.defaultUnit}</button>)
            }
            const items=modalItems.map((item)=>item)
            setBuyOption(items)
        })
     }

        const showUpdateBuyModal=(goodSn,snOrderBYS)=>{
          axios.get("https://starfoods.ir/api/getUnitsForUpdate",{params:{
            Pcode:goodSn,
            psn:localStorage.getItem("psn")
          }})
          .then((data) => {
            let modalItems=[];
            for (let index = 1; index <= data.data.maxSale; index++) {
                modalItems.push(<button data-bs-dismiss="modal" className="btn btn-sm btn-info buyButton" onClick={() =>updateBuy(snOrderBYS,data.data.amountUnit*index,data.data.kalaId)}>{index+' '+data.data.secondUnit+' معادل '+' '+index*data.data.amountUnit+' '+data.data.defaultUnit}</button>)
            }
            const items=modalItems.map((item)=>item)
            setBuyOption(items);
          })
        }
        const updateBuy=(orderId,amountUnit,goodSn)=>{
          axios.get('https://starfoods.ir/api/updateOrderBYS',
          {params:{
            kalaId: goodSn,
            amountUnit: amountUnit,
            orderBYSSn: orderId
          }
         }
        ).then((response)=> {
            renewGroupItems();
        })
     }
    
    const buySomething=(amountExist,freeExistance,zeroExistance,costLimit,costError,amountUnit,goodSn,defaultUnit,btnModalEvent,event)=>{
        if((amountUnit > amountExist) && (freeExistance===0)){
        alert("حد اکثر مقدار خرید شما " + amountExist + " " + defaultUnit + "می باشد");
        }else{
            if (costLimit > 0) {
                if (amountUnit >= costLimit) {
                    alert(costError);
                }}
                axios.get('https://starfoods.ir/api/buySomething',
                {params:{
                  kalaId: goodSn,
                  amountUnit: amountUnit,
                  psn:localStorage.getItem("psn")
                }})
                .then((response)=> {
                let countBought=parseInt(localStorage.getItem('buyAmount'));
                localStorage.setItem('buyAmount',countBought+1);
                renewGroupItems();
            })
        }   
    }

    if(localStorage.getItem("isLogedIn")){
        return (
            <>
                <Header />
                <Sidebar />
                <div className="container marginTop">
                    <div className="groupingItems">
                        {allBrand}
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog buyModal">
                      <div className="modal-content">
                          <div className="modal-body p-2">
                              <div id='unitStuffContainer' className="alert alert-danger buyButtonDiv">
                                 {buyOption}
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
     }else {
        window.location.href="/login"
    }
}

export default ShowAllBrand;