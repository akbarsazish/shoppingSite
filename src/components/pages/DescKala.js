import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import starfood from "../../assets/images/starfood.png";

export default function DescKala(props) {
    const { goodSn, groupId } = useParams();
    const [descKala, setDescKala] = useState("")
    const [kalaName, setKalaName] = useState("")
    const [groupName, setGroupName] = useState("")
    const [mainPrice, setMainPrice] = useState(0)
    const [pcode, setProductCode] = useState(0)
    const [asameKalas, setAsameKalas] = useState(0)
    const [isFavorite, setIsFavorite] = useState("NO")
    const [boughtInf, setBoughtInfo] = useState(0)
    const [buyOption, setBuyOption] = useState(0)
    // fetching data form backend

    const showBuyModal = (goodSn, event) => {
        fetch("https://starfoods.ir/api/getUnitsForUpdate/?Pcode=" + goodSn)
            .then(response => response.json())
            .then((data) => {
                let modalItems = [];
                for (let index = 1; index <= data.maxSale; index++) {
                    modalItems.push(<button data-bs-dismiss="modal" className="btn btn-sm btn-danger buyButton" onClick={(e) => buySomething(data.amountExist, data.freeExistance, data.zeroExistance, data.costLimit, data.costError, data.amountUnit * index, data.kalaId, data.defaultUnit, e, event)}>{index + ' ' + data.secondUnit + ' معادل ' + ' ' + index * data.amountUnit + ' ' + data.defaultUnit}</button>)
                }
                const items = modalItems.map((item) => item)
                setBuyOption(items)
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
    const requestProduct = (psn, goodSn, event) => {
        axios.get("https://starfoods.ir/api/addRequestedProduct", {
            params: {
                customerId: psn,
                productId: goodSn
            }
        }).then((data) => {
            renewDescKala();
        })
    }

    const cancelRequestKala = (psn, goodSn, event) => {
        axios.get("https://starfoods.ir/api/cancelRequestedProduct", {
            params: {
                psn: psn,
                gsn: goodSn
            }
        }).then((data) => {
            renewDescKala();
        })
    }

    useEffect(() => {
        renewDescKala();
    },[goodSn])

    const updateBuy=(orderId,amountUnit,goodSn)=>{
        axios.get('https://starfoods.ir/api/updateOrderBYS',{
            params: {
              kalaId: goodSn,
              amountUnit: amountUnit,
              orderBYSSn: orderId
            }
        }).then((response) => {
            renewDescKala();
        })
    }

    const buySomething = (amountExist, freeExistance, zeroExistance, costLimit, costError, amountUnit, goodSn, defaultUnit, btnModalEvent, event) => { 
        if ((amountUnit > amountExist) && (freeExistance === 0)) {
            alert("حد اکثر مقدار خرید شما " + amountExist + " " + defaultUnit + "می باشد");
        } else {
            if (costLimit > 0) {
                if (amountUnit >= costLimit) {
                    alert(costError);
                }
            }
            axios.get('https://starfoods.ir/api/buySomething', {
                params: {
                    kalaId: goodSn,
                    amountUnit: amountUnit,
                    psn:localStorage.getItem("psn")
                }
                }).then((response) => {
                    let countBought = parseInt(localStorage.getItem('buyAmount'));
                    localStorage.setItem('buyAmount', countBought + 1);
                    renewDescKala();
                })
        }
    }

    const renewDescKala = () => {
        axios.get("https://starfoods.ir/api/descKala", {
            params: {
                id: goodSn,
                groupId: groupId,
                psn:localStorage.getItem("psn")
            }
        }).then((data) => {
            console.log("checking the butmodal", data)
            setDescKala(data.data.descKala)
            setIsFavorite(data.data.favorite)
            setKalaName(data.data.GoodName)
            setMainPrice(data.data.Price3)
            setGroupName(data.data.groupName)
            setProductCode(data.data.GoodCde)
            setAsameKalas(data.data.assameKala.map((element) => <div className="similarKalaImg ">
                <Link to={"/descKala/" + element.GoodSn + "/" + groupId} className="similarImgLink">
                    <img onError={(e)=>{e.target.src=starfood}} className="similarKalaImage" src={"https://starfoods.ir/resources/assets/images/kala/" + element.GoodSn + "_1.jpg"} alt="descKala" />
                    <h6 className="similarKalaName"> {element.GoodName} </h6>
                </Link>
            </div>))
           
           
            setBoughtInfo(data.data.map((element, index) =>
                <div className="desckBuyBtn text-start" key={index}>
                    {element.activePishKharid < 1 ?
                        (element.bought === "Yes" ?
                            <button className="btn btn-sm btn-info selectAmount" onClick={() => showUpdateBuyModal(element.GoodSn, element.SnOrderBYS)} data-bs-toggle="modal" data-bs-target="#exampleModal"> {parseInt(element.PackAmount) + " " + element.secondUnit + " معادل " + parseInt(element.Amount) + " " + element.UNAME} <FontAwesomeIcon icon={faShoppingCart} /></button>
                            : (element.callOnSale > 0 ?
                                <button className="btn-add-to-cart">برای خرید تماس بگیرید <i className="far fa-shopping-cart text-white ps-2"></i></button>
                                : (element.AmountExist > 0 || element.freeExistance > 0
                                    ?
                                    <button className="btn btn-sm btn-danger selectAmount" id={"buyButton" + element.GoodSn} onClick={(event) => { showBuyModal(element.GoodSn, event) }} data-bs-toggle="modal" data-bs-target="#exampleModal"> انتخاب تعداد  <FontAwesomeIcon icon={faShoppingCart} /></button>
                                    :
                                    (element.requested === 0 ?
                                        <span className="prikalaGroupPricece fw-bold mt-1 float-start" id={"request" + element.GoodSn}>
                                            <button value="0" id={"preButton" + element.GoodSn} onClick={(event) => requestProduct(3609, element.GoodSn, event)} className="btn btn-sm btn-danger selectAmount">خبرم کنید <FontAwesomeIcon icon={faBell}></FontAwesomeIcon></button>
                                        </span>
                                        :
                                        <span className="prikalaGroupPricece fw-bold mt-1 float-start" id={"norequest" + element.GoodSn}>
                                            <button value="1" id={"afterButton" + element.GoodSn} onClick={(event) => cancelRequestKala(3609, element.GoodSn, event)} className="btn btn-sm btn-danger selectAmount">اعلام شد <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></button>
                                        </span>)
                                )
                            )
                        )
                        : ''}
                </div>))
        })
    }
    if(localStorage.getItem("isLogedIn")){
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop mb-5">
                <div className="kalaDescibe mt-2 p-2">
                    <div className="kalaImg">
                        <FontAwesomeIcon onClick={(e) => props.changeHeartIconColor(goodSn,e)} className={(isFavorite==='NO') ? 'favIcon-deskKala' :'favHeartIcon favIcon-deskKala'} icon={faHeart}></FontAwesomeIcon>
                        <img onError={(e)=>{e.target.src = starfood}} className="descKalaTakImg" src={"https://starfoods.ir/resources/assets/images/kala/"+goodSn+"_1.jpg"} alt="descKala" />
                    </div>
                    <div className="kalaDescibtion">
                        <div className="descHeader">
                            <div className="desckTitle">
                                <span className="title" > <b> {kalaName}:</b>  {parseInt(mainPrice/10).toLocaleString()} تومان </span>
                            </div>
                            {boughtInf}
                        </div>
                        <div className="desckalaBody">
                            <p className="title mt-2">  <b> گروه اصلی  :</b> {groupName} </p>
                            <p className="title">  <b> کد محصول :</b> {pcode} </p>
                            <p className="desciption">
                                {descKala}
                            </p>
                        </div> <hr></hr>
                        <h5 className="similarKalaTitle"> کالاهای مشابه </h5>
                        <div className="similarKala">
                            {asameKalas}
                        </div>
                    </div>
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
    }else{
        window.location.href="/login"
    }
}