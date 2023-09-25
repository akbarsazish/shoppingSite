import React, {memo, useEffect, useState} from "react";
import { Link, useParams} from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import starfood from "../../assets/images/starfood.png";
import axios from "axios";

const HomeSliders = ()=> {
    const {id}=useParams();
    const [kalaSliders, setAllKalaSlider] = useState([]);
    const [purchasedItems, setPurchasedItems] = useState({}); 
    const [clickedItemId, setClickedItemId] = useState(null);

    useEffect(() => {
        const fetchSliderData = async () => {
          try {
            const response = await axios.get("https://starfoods.ir/api/getHomeParts", {
              params: { psn: localStorage.getItem('psn') }
            });
            const initialKala = response.data.parts.map((kala) => ({
                ...kala,
                isClicked: false,
              }));
              console.log(initialKala)
              setAllKalaSlider(initialKala);
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
        };
        fetchSliderData();
      }, []);


       // Function to update purchasedItem for a specific kala
        const updatePurchasedItem = (goodSn, count) => {
            setPurchasedItems(prevPurchasedItems => ({
            ...prevPurchasedItems,
            [goodSn]: count
            }));
        };

      // buy kala use effect
    const purchaseKala = (goodSn) => {
        axios.get('https://starfoods.ir/api/addToBasketFromHomePageApi', {
        params: {
            kalaId: goodSn,
            amountUnit: purchasedItems[goodSn] || 0,
            psn: localStorage.getItem("psn")
        }
        })
        .then((response) => {
        console.log("bought kala response", response);
        let countBought = parseInt(localStorage.getItem('buyAmount'));
        localStorage.setItem('buyAmount', countBought + 1);
        });
    }

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
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                        }} modules={[Pagination]}>

                         {kalaTypes.allKalas && kalaTypes.allKalas.map((kala) => (
                            <SwiperSlide className="text-center bg-white rounded" key={kala.GoodSn}>
                                <FontAwesomeIcon onClick={() => setClickedItemId(kala.GoodSn)} icon={faPlusCircle} className="clickToBuy" />
                                
                                {clickedItemId === kala.GoodSn && (
                                    <div className='smallModalTobuy' id={`preBuyFromHome${kala.partId}_${kala.GoodSn}`}>
                                      <FontAwesomeIcon 
                                        onClick={() => {setClickedItemId(kala.GoodSn);
                                        setPurchasedItems(prevPurchasedItems => ({...prevPurchasedItems, [kala.GoodSn]: (prevPurchasedItems[kala.GoodSn] || 0) + 1 }));
                                        purchaseKala(kala.GoodSn);  }} className="buyButton" icon={faPlusCircle} />
                                        <span className="buy-amount"> {purchasedItems[kala.GoodSn] !== undefined ? purchasedItems[kala.GoodSn] : 0} </span>
                                      <FontAwesomeIcon
                                        onClick={() => { const updatedCount = Math.max(0, (purchasedItems[kala.GoodSn] || 0) - 1);
                                        setPurchasedItems(prevPurchasedItems => ({ ...prevPurchasedItems, [kala.GoodSn]: updatedCount  }));
                                        updatePurchasedItem(kala.GoodSn, updatedCount);}}  className="buyButton" icon={faMinusCircle}/>
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

         {/* شگفت انگیز */}
         {parseInt(kalaTypes.partType)===11 ?
            <>
            <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6> {kalaTypes.title} </h6>
                </div>
                <div className="forTitleItem text-start">
                </div>
            </div>

              <div className="fourColSide border-top py-1" style={{ backgroundColor: `${kalaTypes.partColor}`}}>
                 <Swiper className="mySwiper text-center mx-2"
                    slidesPerView={1}
                    spaceBetween={3}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 15,
                        },
                    }}
                    modules={[Pagination]} >
                    <SwiperSlide className="text-center shegoft-angez-first">
                        <h3 className="text-wrap" style={{padding:"5px 44px"}}> {kalaTypes.textLogo} </h3>
                        <Link to={"/getAllKala/"+kalaTypes.partId} className="btn btn-md border text-decoration-none"> {kalaTypes.showAll ?  <h6> مشاهده همه </h6> : "" } </Link>
                    </SwiperSlide>

                   {kalaTypes.allKalas && kalaTypes.allKalas.map((kala) => (
                    <SwiperSlide className="text-center bg-white rounded" key={kala.GoodSn}>
                        <FontAwesomeIcon onClick={() => setClickedItemId(kala.GoodSn)} icon={faPlusCircle} className="clickToBuy"> </FontAwesomeIcon>
                         {clickedItemId === kala.GoodSn && (
                            <div className='smallModalTobuy' id={`preBuyFromHome${kala.partId}_${kala.GoodSn}`}>
                                <FontAwesomeIcon  onClick={() => {setClickedItemId(kala.GoodSn); setPurchasedItems(prevPurchasedItems => ({...prevPurchasedItems, [kala.GoodSn]: (prevPurchasedItems[kala.GoodSn] || 0) + 1 }));  purchaseKala(kala.GoodSn);  }} className="buyButton" icon={faPlusCircle} />
                                <span className="buy-amount"> {purchasedItems[kala.GoodSn] !== undefined ? purchasedItems[kala.GoodSn] : 0} </span>
                                <FontAwesomeIcon onClick={() => { const updatedCount = Math.max(0, (purchasedItems[kala.GoodSn] || 0) - 1);setPurchasedItems(prevPurchasedItems => ({ ...prevPurchasedItems, [kala.GoodSn]: updatedCount  }));  updatePurchasedItem(kala.GoodSn, updatedCount);}}  className="buyButton" icon={faMinusCircle}/>
                            </div>
                         )}
                        <Link to={"/descKala/"+kala.GoodSn+"/"+kala.firstGroupId} className="kala-img-name-link">
                            <img className="fourColSliderImg" alt="شگفت انگیز" src={`https://starfoods.ir/resources/assets/images/kala/${kala.GoodSn}_1.jpg`} onError={(e) => { e.target.src = starfood; }} />
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
          </> : "" }

          {/* برندها  */}
          {parseInt(kalaTypes.partType)===12 ?
            <>
            <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6> {kalaTypes.title} </h6>
                </div>
                <div className="forTitleItem text-start">
                   {kalaTypes.showAll ? <Link to="/"> <h6> مشاهده همه  </h6> </Link> : "" }
                </div>
            </div>

            <div className="fourColSide border-top">
                <Swiper className="mySwiper text-center mx-2"
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}>
                    {kalaTypes.allBrands && kalaTypes.allBrands.map((brand) => (
                    <SwiperSlide className="brandDiv text-center mt-1">
                        <Link to="/" className="brandImageAnchor">
                          <img className="brandImage" alt="برندها" src={`https://starfoods.ir/resources/assets/images/brands/${brand.brandId}.jpg`} onError={(e) => { e.target.src = starfood; }} />
                        </Link>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            </> : "" }
         </div>
       </>))}
    </>
                
)}

export default memo(HomeSliders)