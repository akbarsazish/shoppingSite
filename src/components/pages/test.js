import React, {memo, useEffect, useState} from "react";
import { Link, useParams} from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Navigation} from "swiper";
import 'swiper/css/free-mode';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import starfood from "../../assets/images/starfood.png";
import axios from "axios";

const HomeSliders = ()=> {
    const {id}=useParams();
    const [kalaSliders, setAllKalaSlider] = useState([]);
    const [clickedItemId, setClickedItemId] = useState(null);
    const [boughtKalaBYS, setboughtKalaOrderBYS] = useState(0);
    const [purchasedItems, setPurchasedItems] = useState({});
    
    useEffect(() => {
        const fetchSliderData = async () => {
          try {
            const response = await axios.get("https://starfoods.ir/api/getHomeParts", {
              params: { psn: localStorage.getItem('psn') }
            });

            const initialKala = response.data.parts.map((kala) => ({
                ...kala,
                isClicked: false,
                purchasedItem: parseInt(localStorage.getItem(`boughtItem_${kala.GoodSn}`)) || 0,
                
              }));

              setAllKalaSlider(initialKala);
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
        };
        fetchSliderData();
    }, []);

      

    const purchaseKala = (goodSn, kala) => {
        const spanValue = document.getElementById(`showBoughtKala${kala.GoodSn}`).innerText;
        const updatedValue =  parseInt(spanValue);

        if (updatedValue === 0) {
            axios.get('https://starfoods.ir/api/addToBasketFromHomePageApi', {
                params: {
                    kalaId: goodSn,
                    amountUnit: updatedValue + 1,
                    psn: localStorage.getItem("psn")
                }
            }).then((data) => {
                setboughtKalaOrderBYS(data.data.snLastBYS);
                let boughtItem = parseInt(data.data.amountBought);

                localStorage.setItem(`boughtItem_${kala.GoodSn}`, boughtItem);
                setPurchasedItems(prevPurchasedItems => ({
                    ...prevPurchasedItems,
                    [kala.GoodSn]: updatedValue + 1
                  }));
                
                let countBought = parseInt(localStorage.getItem('buyAmount')) || 0;
                localStorage.setItem('buyAmount', countBought + 1);

            });

        } else {
            let updateBoughtItem = localStorage.getItem(`boughtItem_${kala.GoodSn}`);
            axios.get('https://starfoods.ir/api/updateBasketItemFromHomePage', {
                params: {
                    orderBYSSn: boughtKalaBYS,
                    amountUnit: parseInt(updateBoughtItem) + 1,
                    kalaId: goodSn,
                }
                }).then((data) => {
                    const boughtKalaUpdate = parseInt(data.data.boughtAmount);
                    localStorage.setItem(`boughtItem_${kala.GoodSn}`, boughtKalaUpdate);
                    let countBought = parseInt(localStorage.getItem('buyAmount')) || 0;
                    localStorage.setItem('buyAmount', countBought + 1);
                    // localStorage.setItem(`boughtItem_${kala.GoodSn}`, countBought + 1);

                    setPurchasedItems(prevPurchasedItems => ({
                        ...prevPurchasedItems,
                        [kala.GoodSn]: parseInt(updateBoughtItem) + 1,
                      }));

                });
        }
    }

    const decreaseKala = (goodSn, kala) => {
        const spanValue = document.getElementById(`showBoughtKala${kala.GoodSn}`).innerText;
        const updatedValue =  parseInt(spanValue);
        
        axios.get('https://starfoods.ir/api/updateBasketItemFromHomePage', {
            params: {
              orderBYSSn: boughtKalaBYS,
              amountUnit: updatedValue - 1,
              kalaId: goodSn,
            },
          })
          .then((data) => {
            const boughtKalaUpdate = parseInt(data.data.boughtAmount);
                  localStorage.setItem(`boughtItem_${kala.GoodSn}`, boughtKalaUpdate);
                  
            let countBought = parseInt(localStorage.getItem('buyAmount')) || 0;
                countBought = Math.max(0, countBought - 1); 
                localStorage.setItem('buyAmount', countBought);

            
                setPurchasedItems(prevPurchasedItems => ({
                    ...prevPurchasedItems,
                    [kala.GoodSn]: Math.max(0, updatedValue - 1),
                }));

            localStorage.setItem(`boughtItem_${kala.GoodSn}`, Math.max(0,updatedValue - 1));
            
          })
          .catch((error) => {
            console.error('Error updating purchased item:', error);
          });
      };

return(
    <>
    {kalaSliders.map((kalaTypes) => (
     <>
      <div className="wrapper-sliders">
          {/* جدیدترین کالا ها */ }
          {parseInt(kalaTypes.partType) === 2 ?
             <>
                <div className="forTitle mt-2 p-2">
                    <div className="forTitleItem">
                        <h6> {kalaTypes.title} </h6>
                    </div>
                    <div className="forTitleItem text-start">
                       {kalaTypes.showAll ? <Link to={"/getAllKala/"+kalaTypes.partId}> <h6> مشاهده همه  </h6> </Link> : "" }
                    </div>
                </div>

                 <div className="fourColSide border-top py-1">
                    <Swiper className="mySwiper text-center mx-2"
                        slidesPerView={1}
                        spaceBetween={10}
                        breakpoints={{
                           320: {slidesPerView: 2, spaceBetween: 20},
                           640: {slidesPerView: 2, spaceBetween: 20},
                           768: { slidesPerView: 3, spaceBetween: 40},
                           1024: { slidesPerView: 4, spaceBetween: 50},
                        }} modules={[Pagination]}>

                         {kalaTypes.allKalas && kalaTypes.allKalas.map((kala) => (
                            <SwiperSlide className="text-center bg-white rounded" key={kala.GoodSn}>
                             <FontAwesomeIcon onClick={() => setClickedItemId(kala.GoodSn)} icon={faPlusCircle} className={kala.bought === "No" ? "clickToBuy" : "clickToUpdateBuy"} /> 
                             {clickedItemId === kala.GoodSn && (
                                <div className='smallModalTobuy' id={`preBuyFromHome${kala.partId}_${kala.GoodSn}`}>
                                    <FontAwesomeIcon onClick={() => purchaseKala(kala.GoodSn, kala)} className="home-buyButton" icon={faPlusCircle}/>
                                      <span className="buy-amount" id={`showBoughtKala${kala.GoodSn}`}> {localStorage.getItem(`boughtItem_${kala.GoodSn}`) || 0} </span>
                                    <FontAwesomeIcon onClick={() => decreaseKala(kala.GoodSn, kala)} className="home-buyButton" icon={faMinusCircle}/>
                                </div>
                             )}
                                 
                            <Link to={"/descKala/"+kala.GoodSn+"/"+kala.firstGroupId} className="kala-img-name-link">
                                <img className="fourColSliderImg" alt="picture" src={`https://starfoods.ir/resources/assets/images/kala/${kala.GoodSn}_1.jpg`} onError={(e) => { e.target.src = starfood; }} />
                                <p className="kala-name"> {kala.GoodName} </p>
                            </Link>

                            <div className="bottomPart border-top">
                                <span className="bottommPartItem">
                                    <p>  </p>
                                    {(kala.Price4 > 0 && kala.Price3 > 0) ?
                                    <span className="takhfif-round"> {Math.round(((kala.Price4 - kala.Price3) * 100) / kala.Price4)}%</span> :
                                    <span className="takhfif-round"> 0% </span>
                                    }
                                </span>
                                <span className="bottommPartItem">
                                    <div className="price" style={{ color: "#ff2c50" }}> <del> {parseInt(kala.Price4) > 0 && (parseInt(kala.Price4) / 10 + " تومان")} </del></div>
                                    <div className="price" style={{ color: "#39ae00" }}> {parseInt(kala.Price3)/10} تومان </div>
                                </span>
                            </div>
                            </SwiperSlide>
                            ))}
                     </Swiper>
                   </div> 
                 </>
                : "" }

          </div>
       </>))}
    </>
                
)}

export default memo(HomeSliders)