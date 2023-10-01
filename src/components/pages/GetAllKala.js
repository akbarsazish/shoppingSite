import React, { useState, useEffect } from "react";
import {
    Link,
    useParams
} from "react-router-dom"
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import starfood from "../../assets/images/starfood.png"
import { Navigation } from "swiper";
import 'swiper/swiper.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faBell, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

export default function GetAllKala(props) {
    const {homepartId, id} = useParams();
    const [maingroupKala,setMainGroupKala]=useState(0);
    const [buyOption, setBuyOption]=useState(0);

    const requestProduct=(psn, goodSn, event)=>{
        axios.get("https://starfoods.ir/api/addRequestedProduct",{params:{
          customerId:psn,
          productId:goodSn
        }}).then((data)=>{
            renewSubGroupCarts();
        })
      }
      
      const cancelRequestKala=(psn,goodSn,event)=>{
        axios.get("https://starfoods.ir/api/cancelRequestedProduct",{params:{
          psn:psn,
          gsn:goodSn
        }}).then((data)=>{
            renewSubGroupCarts();
        });
      }

      useEffect(() => {
        renewSubGroupCarts();
    },[homepartId]);
    
      const renewSubGroupCarts=()=>{
        axios.get('https://starfoods.ir/api/listKalaOfPictureApi', {
            params: {
              picId: id,
              homepartId:homepartId,
              customerId: localStorage.getItem('psn') },
        })
        .then((data) => {
            console.log(data.data.kala)
            setMainGroupKala(data.data.kala.map((element,index)=>
            <div key={index} className="groupingItem rounded">
                <img className="topLeft" src={starfood} alt="slider" />
                {(element.Price4>0 & element.Amount>0) ? <span className="groupingTakhfif"> {parseInt(((element.Price4-element.Price3)*100)/element.Price4)}%</span> :''}
                <Link  to={"/descKala/"+element.GoodSn+"/"+homepartId} className="groupingItemLink">
                    <img className="groupingItemsImg" src={"https://starfoods.ir/resources/assets/images/kala/"+element.GoodSn+"_1.jpg"} alt="slider " />
                </Link>
                <Link  to={"/descKala/"+element.GoodSn+"/"+homepartId} className="groupingItemTitleLink">
                    <p className="groupingItemTitle"> {element.GoodName} </p>
                </Link>
                <div className="groupingItemBottomInfo">
                  <div className="groupingItemInfo"  onClick={(e) => props.changeHeartIconColor(element.GoodSn,e)}> <FontAwesomeIcon className={element.favorite==="YES" ? 'favHeartIcon' : 'defaultHeartIcon'} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
                    <div className="groupingItemInfo">
                      {element.Amount > 0 ?
                         <>
                            <div style={{ color: "#39ae00" }}>
                                {parseInt(element.Price3/10).toLocaleString()} تومان
                            </div>
                             {element.overLine===1 && element.Price4>0 &&
                            <div style={{ color: "#ff2c50" }}>
                                <del>{parseInt(element.Price4/10).toLocaleString()} تومان </del>
                            </div>}
                        </> :
                            (element.Amount>0 || element.activePishKharid>0 || element.freeExistance>0)?
                            '' :(
                                element.requested===0?
                                  <span className="prikalaGroupPricece fw-bold mt-1 float-start" id={"request"+element.GoodSn}>
                                    <button value="0" id={"preButton"+element.GoodSn} onClick={(event)=>requestProduct(3609,element.GoodSn,event)} className="btn btn-sm btn-danger selectAmount">خبرم کنید <FontAwesomeIcon icon={faBell}></FontAwesomeIcon></button>
                                  </span>
                                :
                                  <span className="prikalaGroupPricece fw-bold mt-1 float-start" id={"norequest"+element.GoodSn}>
                                    <button value="1" id={"afterButton"+element.GoodSn} onClick={(event)=>cancelRequestKala(3609,element.GoodSn,event)} className="btn btn-sm btn-danger selectAmount">اعلام شد <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></button>
                                  </span>
                               ) 
                          }
                      </div>
                    </div>
                    
                    <div className="groupingItemBottomBtn">
                     {element.activePishKharid<1  ?
                        (element.bought==="Yes" ?
                            <button className="btn btn-sm btn-info selectAmount" onClick={()=>showUpdateBuyModal(element.GoodSn,element.SnOrderBYS)} data-bs-toggle="modal" data-bs-target="#exampleModal"> {parseInt(element.PackAmount)+" "+element.secondUnit +" معادل "+parseInt(element.Amount)+" "+ element.UName} <FontAwesomeIcon icon={faShoppingCart} /></button>
                            :(element.callOnSale>0?
                                <button  className="btn-add-to-cart">برای خرید تماس بگیرید <i className="far fa-shopping-cart text-white ps-2"></i></button>
                                :(element.Amount>0 || element.freeExistance>0 
                                    ?
                                    <button className="btn btn-sm btn-danger selectAmount" id={element.GoodSn+'button'} onClick={()=>showBuyModal(element.GoodSn)}  data-bs-toggle="modal" data-bs-target="#exampleModal"> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} /></button>
                                    :
                                    <div className="c-product__add mt-0">
                                       <button className="btn btn-sm btn-dark selectAmount">ناموجود &nbsp; <i className="fas fa-ban"></i></button>
                                    </div>   
                                )
                            )
                        )
                     : '' }
                </div>
            </div>
            ))
        })
    }

    const showBuyModal=(goodSn,event)=>{
        fetch("https://starfoods.ir/api/getUnitsForUpdate/?Pcode="+goodSn)
        .then(response=>response.json())
        .then((data) => {
        console.log("show modal", data)
        let modalItems=[];
          for (let index = 1; index <= data.maxSale; index++) {
               modalItems.push(<button data-bs-dismiss="modal" className="btn btn-sm btn-danger buyButton" onClick={(e) =>buySomething(data.amountExist,data.freeExistance,data.zeroExistance,data.costLimit,data.costError,data.amountUnit*index,data.kalaId,data.defaultUnit,e,event)}>{index+' '+data.secondUnit+' معادل '+' '+index*data.amountUnit+' '+data.defaultUnit}</button>)
          }
            const items=modalItems.map((item)=>item)
            setBuyOption(items)
        })
    }

    const showUpdateBuyModal=(goodSn,snOrderBYS)=>{
        fetch("https://starfoods.ir/api/getUnitsForUpdate/?Pcode="+goodSn)
        .then(response=>response.json())
        .then((data) => {
         let modalItems=[];
            for (let index = 1; index <= data.maxSale; index++) {
                modalItems.push(<button data-bs-dismiss="modal" className="btn btn-sm btn-info buyButton" onClick={() =>updateBuy(snOrderBYS,data.amountUnit*index,data.kalaId)}>{index+' '+data.secondUnit+' معادل '+' '+index*data.amountUnit+' '+data.defaultUnit}</button>)
            }
            const items=modalItems.map((item)=>item)
            setBuyOption(items)
        })
    }

    const updateBuy=(orderId,amountUnit,goodSn)=>{
        axios.get('https://starfoods.ir/api/updateOrderBYS',
        {params:{
          kalaId: goodSn,
          amountUnit: amountUnit,
          orderBYSSn: orderId
        }
        }).then((response)=> {
            renewSubGroupCarts();
        })
    }
  
    const buySomething=(amountExist,freeExistance,zeroExistance,costLimit,costError,amountUnit,goodSn,defaultUnit,btnModalEvent,event)=>{
  
      if((amountUnit > amountExist) && (freeExistance===0)){
        alert("حد اکثر مقدار خرید شما " + amountExist + " " + defaultUnit + "می باشد");
      }else{
      
              if (costLimit > 0) {
                if (amountUnit >= costLimit) {
                  alert(costError);
                }
              }
              axios.get('https://starfoods.ir/api/buySomething',
              {params:{
                 kalaId: goodSn,
                 amountUnit: amountUnit,
                 psn:localStorage.getItem('psn')
                }
              }).then((response)=> {
               let countBought=parseInt(localStorage.getItem('buyAmount'));
                  localStorage.setItem('buyAmount', countBought+1);
                  renewSubGroupCarts();
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
                        {maingroupKala}
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