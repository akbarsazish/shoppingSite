import { useState, useEffect } from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import starfood from "../../assets/images/starfood.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faBell } from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';

const ShowAllKala = (props)=> {
    const {partId} = useParams();
    const [showAllKala, setShowAllKala] = useState([]);
    const [buyOption, setBuyOption]=useState(0);

    const reNewShowKala = ()=>{
        axios.get('https://starfoods.ir/api/getAllKalaOfPartApi',{
          params: {
            psn:localStorage.getItem('psn'),
            partId:partId
          }
          }).then((response)=>{
            setShowAllKala(response.data.kala)
            console.log("showall target", response.data)
        })
    }

    useEffect(() => {
        reNewShowKala();
    },[partId]);

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
                reNewShowKala();
            })
        }   
    }

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
        reNewShowKala();
      })
   }

    const requestProduct=(psn, goodSn, event)=>{
        axios.get("https://starfoods.ir/api/addRequestedProduct",{params:{
          customerId:psn,
          productId:goodSn
        }}).then((data)=>{
            reNewShowKala();
        })
      }

      const cancelRequestKala=(psn,goodSn,event)=>{
        axios.get("https://starfoods.ir/api/cancelRequestedProduct",{params:{
          psn:psn,
          gsn:goodSn
        }}).then((data)=>{
            reNewShowKala();
        });
      }

    return (
      <>
        <Header />
        <Sidebar />
        <div className="container marginTop">
          <div className="groupingItems">
            {showAllKala && showAllKala.map((element, index)=>(
              <div key={index} className="groupingItem rounded">
                <img className="topLeft" src={starfood} alt="kala-image" />
                {(element.price4 > 0 && element.Amount>0) ? <span className="groupingTakhfif">{parseInt(((element.Price4-element.Price3)*100)/element.Price4)}%</span>: ''}
                <Link to={"/descKala/"+element.GoodSn+"/"+partId} className="groupingItemLink">
                    <img className="groupingItemsImg" src={"https://starfoods.ir/resources/assets/images/kala/"+element.GoodSn+"_1.jpg"} alt="kala-image " />
                </Link>
                <Link to="" className="groupingItemTitleLink">
                    <p className="groupingItemTitle">  </p>
                </Link>
                <div className="groupingItemBottomInfo">
                    <div className="groupingItemInfo" onClick={(e) => props.changeHeartIconColor(element.GoodSn,e)}> <FontAwesomeIcon className={element.favorite==="YES" ? 'favHeartIcon' : 'defaultHeartIcon'} style={{ fontSize: "25px", marginRight: "11px" }} icon={faHeart} /> </div>
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
                            ''  :(
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
            ))}
            </div>
        </div>
    </>
  )
}


export default ShowAllKala;