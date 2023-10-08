import React, {memo, useEffect, useState} from "react";
import { Link, useParams} from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Pagination, FreeMode, Navigation} from "swiper";
import 'swiper/css/free-mode';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import starfood from "../../assets/images/starfood.png";
import axios from "axios";

const HomeSliders = ()=> {
    const {id}=useParams();
    const [kalaSliders, setAllKalaSlider] = useState([]);
    const [clickedItemId, setClickedItemId] = useState(null);
    const [boughtKalaBYS, setboughtKalaOrderBYS] = useState(localStorage.getItem("boughtKalaBYS") || 0);
    const [purchasedItems, setPurchasedItems] = useState({});
    
    useEffect(() => {
        const fetchSliderData = async () => {
          try {
            const response = await axios.get("https://starfoods.ir/api/getHomeParts", {
              params: {psn: localStorage.getItem('psn')}
            });

            const initialKala = response.data.parts.map((kala) => ({
                ...kala,
                isClicked: false,
                purchasedItem: localStorage.getItem(`boughtItem_${kala.GoodSn}`) || 0,
              }));

              setAllKalaSlider(initialKala);
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
        };
        fetchSliderData();
    }, []);

    useEffect(() => {
      localStorage.setItem("boughtKalaBYS", boughtKalaBYS);
    }, [boughtKalaBYS]);
      

    const purchaseKala = (goodSn, kala) => {
        const spanValue = document.getElementById(`showBoughtKala${kala.GoodSn}`).innerText;
        const updatedValue =  parseInt(spanValue);
        if(updatedValue > kala.PackAmount){
            alert("این محصول کمتر از حد خرید است!")
        }

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
                }))

                let countBought = parseInt(localStorage.getItem('buyAmount')) || 0;
                countBought += updatedValue + 1;
                localStorage.setItem('buyAmount', countBought.toString());
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
        const updatedPurchasedItems = { ...purchasedItems, [kala.GoodSn]: Math.max(0, updatedValue - 1)};
        setPurchasedItems(updatedPurchasedItems);
        
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
                
            setPurchasedItems((prevPurchasedItems) => ({
                ...prevPurchasedItems,
                [kala.GoodSn]: parseInt(Math.max(0,updatedValue)) - 1,
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
                       {kalaTypes.showAll ? <Link to={"/showAllKala/"+kalaTypes.partId}> <h6>  مشاهده همه  </h6> </Link> : "" }
                    </div>
                </div>

                 <div className="fourColSide border-top py-1">
                    <Swiper className="mySwiper text-center mx-2"
                        slidesPerView={1}
                        loop={true}
                        spaceBetween={10}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                        breakpoints={{
                           320: {slidesPerView: 2, spaceBetween: 20},
                           640: {slidesPerView: 2, spaceBetween: 20},
                           768: { slidesPerView: 3, spaceBetween: 40},
                           1024: { slidesPerView: 4, spaceBetween: 50},
                        }}
                        
                        modules={[Autoplay, Pagination]}>

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
                                    <div className="mb-2">  </div>
                                    {(kala.Price4 > 0 && kala.Price3 > 0) ?
                                    <span className="takhfif-round"> {Math.round(((kala.Price4 - kala.Price3) * 100) / kala.Price4)}%</span> :
                                    <span className="takhfif-round"> 0% </span>
                                    }
                                </span>
                                <span className="bottommPartItem">
                                    <div className="price" style={{color:"#ff2c50"}}> <del> {parseInt(kala.Price4) > 0 && (parseInt(kala.Price4) / 10 + " تومان")} </del></div>
                                    <div className="price" style={{color:"#39ae00"}}> {parseInt(kala.Price3)/10} تومان </div>
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
                <div className="forTitleItem text-start"> </div>
            </div>

              <div className="fourColSide border-top py-1" style={{ backgroundColor: `${kalaTypes.partColor}`}}>
                 <Swiper className="mySwiper text-center mx-2"
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={3}
                    autoplay={{
                        delay: 2800,
                        disableOnInteraction: false,
                      }}
                    breakpoints={{
                        320: {slidesPerView: 2, spaceBetween: 10},
                        640: {slidesPerView: 3, spaceBetween: 10},
                        768: {slidesPerView: 3, spaceBetween: 10},
                        1024: {slidesPerView: 5, spaceBetween: 15},
                    }}
                    modules={[Autoplay, Pagination]}>

                    <SwiperSlide className="text-center shegoft-angez-first">
                        <h3 className="text-wrap" style={{padding:"5px 44px"}}> {kalaTypes.textLogo} </h3>
                        <Link to={"/showAllKala/"+kalaTypes.partId} className="btn btn-md border text-decoration-none"> 
                           {kalaTypes.showAll ?  <h6> مشاهده همه </h6> : "" }
                        </Link>
                    </SwiperSlide>

                   {kalaTypes.allKalas && kalaTypes.allKalas.map((kala) => (
                    <SwiperSlide className="text-center bg-white rounded" key={kala.GoodSn}>
                         <FontAwesomeIcon onClick={() => setClickedItemId(kala.GoodSn)} icon={faPlusCircle} className={kala.bought === "No" ? "clickToBuy" : "clickToUpdateBuy"}> </FontAwesomeIcon>
                            {clickedItemId === kala.GoodSn && (
                                <div className='smallModalTobuy' id={`preBuyFromHome${kala.partId}_${kala.GoodSn}`}>
                                    <FontAwesomeIcon onClick={() => purchaseKala(kala.GoodSn, kala)} className="home-buyButton" icon={faPlusCircle}/>
                                      <span className="buy-amount" id={`showBoughtKala${kala.GoodSn}`}> {localStorage.getItem(`boughtItem_${kala.GoodSn}`) || 0} </span>
                                    <FontAwesomeIcon onClick={() => decreaseKala(kala.GoodSn, kala)} className="home-buyButton" icon={faMinusCircle}/>
                                </div>
                             )}
                        <Link to={"/descKala/"+kala.GoodSn+"/"+kala.firstGroupId} className="kala-img-name-link">
                            <img className="fourColSliderImg" alt="شگفت انگیز" src={`https://starfoods.ir/resources/assets/images/kala/${kala.GoodSn}_1.jpg`} onError={(e) => { e.target.src = starfood; }} />
                            <p className="kala-name"> {kala.GoodName} </p>
                        </Link>
                        <div className="bottomPart border-top">
                            <span className="bottommPartItem">
                                <div className="mb-2">  </div>
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
                   {kalaTypes.showAll ? <Link to={"/showAllKala/"+kalaTypes.partId}> <h6> مشاهده همه  </h6> </Link> : "" }
                </div>
            </div>

            <div className="fourColSide border-top">
                <Swiper className="mySwiper text-center mx-2"
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={10}
                    autoplay={{
                        delay: 2800,
                        disableOnInteraction: false,
                      }}
                    breakpoints={{
                        320: {slidesPerView: 2, spaceBetween: 20},
                        640: {slidesPerView: 2, spaceBetween: 20},
                        768: {slidesPerView: 3, spaceBetween: 40},
                        1024: {slidesPerView: 5, spaceBetween: 50},
                    }}
                    
                    modules={[Autoplay, Pagination]}>

                    {kalaTypes.allBrands && kalaTypes.allBrands.map((brand) => (
                    <SwiperSlide className="brandDiv text-center mt-1">
                        <Link to={"/showAllBrand/"+brand.brandId} className="brandImageAnchor">
                          <img className="brandImage" alt="برندها" src={`https://starfoods.ir/resources/assets/images/brands/${brand.brandId}.jpg`} onError={(e) => { e.target.src = starfood; }} />
                        </Link>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            </> : "" }

              {/* گروه های ویژه   */}
          {parseInt(kalaTypes.partType)===1 ?
            <>
            <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6> {kalaTypes.title} </h6>
                </div>
                <div className="forTitleItem text-start">
                   {kalaTypes.showAll ? <Link to={"/showAllKala/"+kalaTypes.partId}> <h6> مشاهده همه  </h6> </Link> : "" }
                </div>
            </div>

            <div className="fourColSide border-top">
                <Swiper className="mySwiper text-center mx-2"
                    slidesPerView={1}
                    spaceBetween={10}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                    breakpoints={{
                        320: {slidesPerView: 2, spaceBetween: 20},
                        640: {slidesPerView: 2, spaceBetween: 20},
                        768: {slidesPerView: 3, spaceBetween: 40},
                        1024: {slidesPerView: 5, spaceBetween: 50},
                    }}
                    loop={true}
                    modules={[Autoplay, Pagination]}>

                    {kalaTypes.allGroups && kalaTypes.allGroups.map((group) => (
                    <SwiperSlide className="groupsDiv text-center mt-1">
                        <Link to="/" className="groupsImageAnchor">
                          <img className="groupsImage" alt="گروهای ویژه" src={`https://starfoods.ir/resources/assets/images/mainGroups/${group.groupId}.jpg`} onError={(e) => { e.target.src = starfood; }} />
                        </Link>
                          <div className="special-group-title" > {group.title} </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            </> : "" }

          {/* دو عکسی   */}
          {parseInt(kalaTypes.partType)===7 ?
            <>
            <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6> {kalaTypes.title} </h6>
                </div>
                <div className="forTitleItem text-start">
                   {kalaTypes.showAll ? <Link to={"/showAllKala/"+kalaTypes.partId}> <h6> مشاهده همه  </h6> </Link> : "" }
                </div>
            </div>

            <div className="fourColSide border-top">
                <div className="twoPicDiv text-center mt-1">
                    {kalaTypes && kalaTypes.pictures.map((pictures, index) => (
                        <Link to={"/getAllKala/"+pictures.homepartId+"/"+pictures.id} className="twoPics">
                            <img className="twoPic rounded" alt="دو عکسی" src={`https://starfoods.ir/resources/assets/images/twoPics/${kalaTypes.homepartId}_${index+1}.jpg`} onError={(e) => { e.target.src = starfood; }} />
                        </Link>
                   ))}
                </div>
            </div>
            </> : "" }

          {/* سه عکسی   */}
          {parseInt(kalaTypes.partType)===8?
            <>
            <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6> {kalaTypes.title} </h6>
                </div>
                <div className="forTitleItem text-start">
                   {kalaTypes.showAll ? <Link to={"/showAllKala/"+kalaTypes.partId}> <h6> مشاهده همه  </h6> </Link> : "" }
                </div>
            </div>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                breakpoints={{
                    320: {slidesPerView: 2, spaceBetween: 5},
                    640: {slidesPerView: 2, spaceBetween: 5},
                    768: {slidesPerView: 3, spaceBetween: 5},
                    1024: {slidesPerView: 3, spaceBetween:5},
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper">

            <div className="fourColSide border-top">
                <div className="threePicDiv text-center mt-1">
                    {kalaTypes && kalaTypes.pictures.map((pictures, index) => (
                      <SwiperSlide>
                        <Link to={"/getAllKala/"+pictures.homepartId+"/"+pictures.id} className="threePics">
                            <img className="threePic rounded" alt="سه عکسی" src={`https://starfoods.ir/resources/assets/images/threePics/${kalaTypes.homepartId}_${index+1}.jpg`} onError={(e) => { e.target.src = starfood; }} />
                        </Link>
                      </SwiperSlide>
                   ))}
                </div>
            </div>
            </Swiper>
            </> : "" }

          {/*چهار عکسی  عکسی   */}
          {parseInt(kalaTypes.partType)===9?
            <>
            <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6> {kalaTypes.title} </h6>
                </div>
                <div className="forTitleItem text-start">
                   {kalaTypes.showAll ? <Link to={"/showAllKala/"+kalaTypes.partId}> <h6> مشاهده همه  </h6> </Link> : "" }
                </div>
            </div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                breakpoints={{
                    320: {slidesPerView: 2, spaceBetween: 5},
                    640: {slidesPerView: 2, spaceBetween: 5},
                    768: {slidesPerView: 3, spaceBetween: 5},
                    1024: {slidesPerView: 4, spaceBetween:5},
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper">
                        
                 <div className="fourColSide border-top">
                   <div className="fourPicDiv text-center mt-1">
                    {kalaTypes && kalaTypes.pictures.map((pictures, index) => (
                        <SwiperSlide>
                            <Link to={"/getAllKala/"+pictures.homepartId+"/"+pictures.id} className="fourPics">
                                <img className="fourPic rounded" alt="دو عکسی" src={`https://starfoods.ir/resources/assets/images/fourPics/${kalaTypes.homepartId}_${index+1}.jpg`} onError={(e) => { e.target.src = starfood; }} />
                            </Link>
                        </SwiperSlide>
                     ))}
                   </div>
               </div>
            </Swiper>
          </> : "" }

          {/*پنج عکسی  */}

            {parseInt(kalaTypes.partType)===10?
            <>
            <div className="forTitle mt-2 p-2">
                <div className="forTitleItem">
                    <h6> {kalaTypes.title} </h6>
                </div>
                <div className="forTitleItem text-start">
                   {kalaTypes.showAll ? <Link to={"/showAllKala/"+kalaTypes.partId}> <h6> مشاهده همه  </h6> </Link> : "" }
                </div>
            </div>
            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                breakpoints={{
                    320: {slidesPerView: 2, spaceBetween: 5},
                    640: {slidesPerView: 4, spaceBetween: 5},
                    768: {slidesPerView: 4, spaceBetween: 5},
                    1024: {slidesPerView: 5, spaceBetween: 5},
                }}
                freeMode={true}
                modules={[Autoplay, FreeMode]} className="mySwiper">

                 <div className="fourColSide border-top">
                  <div className="fourPicDiv text-center mt-1">
                    {kalaTypes && kalaTypes.pictures.map((pictures, index) => (
                        <SwiperSlide>
                            <Link to={"/getAllKala/"+pictures.homepartId+"/"+pictures.id} className="fivePics">
                                <img className="fivePic rounded" alt="دو عکسی" src={`https://starfoods.ir/resources/assets/images/fivePics/${kalaTypes.homepartId}_${index+1}.jpg`} onError={(e) => { e.target.src = starfood; }} />
                            </Link>
                        </SwiperSlide>
                     ))}
                   </div>
                </div>
            </Swiper>
          </> : "" }
          </div>
       </>))}
    </>  
)}

export default memo(HomeSliders)